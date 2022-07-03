import React, {
	Children,
	cloneElement,
	FC,
	HTMLAttributes,
	isValidElement,
	MouseEventHandler,
	MouseEvent,
	ReactNode,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'
import { cls, is } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './popup.scss'
import { createPortal } from 'react-dom'
import Motion from '../motion'

let visibleHandlers: ((event: globalThis.MouseEvent) => void)[] = []

document.addEventListener('click', event => {
	visibleHandlers.forEach(handler => handler(event))
})

export interface PopupProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	content?: ReactNode
	trigger?: 'hover' | 'click' | 'manual'
	placement?:
		| 'top-start'
		| 'top'
		| 'top-end'
		| 'left-start'
		| 'right-start'
		| 'left'
		| 'right'
		| 'left-end'
		| 'right-end'
		| 'bottom-start'
		| 'bottom'
		| 'bottom-end'
	spacing?: number
	disabled?: boolean
	onClickOutside?: (event: globalThis.MouseEvent) => void
	onVisibleChange?: (visible: boolean) => void
}

const Popup: FC<PopupProps> = props => {
	const {
		className,
		children,
		content,
		visible = false,
		trigger = 'hover',
		placement = 'bottom-start',
		spacing = 8,
		disabled = false,
		onClickOutside,
		onVisibleChange,
		style,
		onMouseEnter,
		onMouseLeave,
		...rest
	} = props

	const triggerRef = useRef<HTMLElement>(null)
	const contentRef = useRef<HTMLDivElement>(null)

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const [_visible, _setVisible] = useState(false)
	useEffect(() => {
		if (isManual) _setVisible(visible)
	}, [isManual, visible])

	const visibleHandlerRef = useRef((event: globalThis.MouseEvent) => {
		const isInPopup = contentRef.current?.contains(event.target as Node)
		const isInWrap = triggerRef.current?.contains(event.target as Node)

		if (isInPopup) return
		if (isInWrap) {
			if (isClick) {
				_setVisible(pre => {
					onVisibleChange?.(!pre)
					return !pre
				})
			}
		} else {
			if (isClick) {
				onVisibleChange?.(false)
				_setVisible(false)
			}
			onClickOutside?.(event)
		}
	})

	const [top, setTop] = useState<number | null>(null)
	const [left, setLeft] = useState<number | null>(null)

	let stretchDirection: 'left' | 'top' | 'right' | 'bottom' = 'bottom'
	let spacingName = ''
	if (placement.includes('top')) {
		stretchDirection = 'top'
		spacingName = 'marginBottom'
	} else if (placement.includes('left')) {
		stretchDirection = 'left'
		spacingName = 'marginRight'
	} else if (placement.includes('bottom')) {
		stretchDirection = 'bottom'
		spacingName = 'marginTop'
	} else if (placement.includes('right')) {
		stretchDirection = 'right'
		spacingName = 'marginLeft'
	}

	const updatePopupPos = useCallback(() => {
		if (triggerRef.current && contentRef.current) {
			let left: number | undefined
			let top: number | undefined

			// TODO: content 触及边界自动调整其位置
			// clientHeight 考虑横向滚动条对高度的影响
			// const windowHeight = document.documentElement?.clientHeight || window.innerHeight
			// const windowWidth = document.documentElement?.clientWidth || window.innerWidth

			const { width: tw, height: th } = triggerRef.current.getBoundingClientRect()
			let { left: tl, top: tt } = triggerRef.current.getBoundingClientRect()
			tl += window.scrollX
			tt += window.scrollY

			const cw = contentRef.current.clientWidth
			const ch = contentRef.current.clientHeight

			switch (placement) {
				case 'top-start':
					top = tt - ch
					left = tl
					break
				case 'top':
					top = tt - ch
					left = tl + tw / 2 - cw / 2
					break
				case 'top-end':
					top = tt - ch
					left = tl + tw - cw
					break
				case 'left-start':
					top = tt
					left = tl - cw
					break
				case 'right-start':
					top = tt
					left = tw + tl
					break
				case 'left':
					top = tt + th / 2 - ch / 2
					left = tl - cw
					break
				case 'right':
					top = tt + th / 2 - ch / 2
					left = tw + tl
					break
				case 'left-end':
					top = tt + th - ch
					left = tl - cw
					break
				case 'right-end':
					top = tt + th - ch
					left = tw + tl
					break
				case 'bottom-start':
					top = th + tt
					left = tl
					break
				case 'bottom':
					top = th + tt
					left = tl + tw / 2 - cw / 2
					break
				case 'bottom-end':
					top = th + tt
					left = tl + tw - cw
					break
				default:
					break
			}

			if (!is.undefined(left)) setLeft(left)
			if (!is.undefined(top)) setTop(top)
		}
	}, [placement])

	const popupStyle = {
		...style,
		...(is.number(left) ? { left } : {}),
		...(is.number(top) ? { top } : {})
	}

	const prefixCls = `${UI_PREFIX}-popup`

	const getTriggerProps = (onEnter?: MouseEventHandler, onLeave?: MouseEventHandler) => {
		if (isHover)
			return {
				onMouseEnter(event: MouseEvent) {
					onEnter?.(event)
					onVisibleChange?.(true)
					_setVisible(true)
				},
				onMouseLeave(event: MouseEvent) {
					onLeave?.(event)
					onVisibleChange?.(false)
					_setVisible(false)
				}
			}
	}

	useEffect(() => {
		const removeHandler = () => {
			visibleHandlers = visibleHandlers.filter(handler => handler !== visibleHandlerRef.current)
		}
		visibleHandlers.push(visibleHandlerRef.current)

		return () => {
			removeHandler()
		}
	}, [])

	const portal = disabled
		? null
		: createPortal(
				<Motion.Stretch
					direction={stretchDirection}
					in={_visible}
					mountOnEnter
					unmountOnExit
					onEnter={updatePopupPos}
					onExited={() => {
						setTop(null)
						setLeft(null)
					}}
				>
					<div
						ref={contentRef}
						className={cls(className, `${prefixCls}-content`)}
						style={popupStyle}
						{...getTriggerProps(onMouseEnter, onMouseLeave)}
						{...rest}
					>
						<div
							className={`${prefixCls}-content-inner`}
							style={{
								[spacingName]: spacing
							}}
						>
							{isValidElement(content) ? (
								content
							) : (
								<div className={`${prefixCls}-default`}>{content}</div>
							)}
						</div>
					</div>
				</Motion.Stretch>,
				document.body
		  )

	const child = Children.only(children)

	return (
		<>
			{isValidElement(child) &&
				cloneElement(child, {
					ref: triggerRef,
					...getTriggerProps(child.props.onMouseEnter, child.props.onMouseLeave)
				})}
			{portal}
		</>
	)
}

export default Popup
