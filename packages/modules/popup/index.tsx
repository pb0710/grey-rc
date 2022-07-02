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

	const wrapRef = useRef<HTMLElement>(null)
	const popupRef = useRef<HTMLDivElement>(null)

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const [_visible, _setVisible] = useState(false)
	useEffect(() => {
		if (isManual) _setVisible(visible)
	}, [isManual, visible])

	const visibleHandlerRef = useRef((event: globalThis.MouseEvent) => {
		const isInPopup = popupRef.current?.contains(event.target as Node)
		const isInWrap = wrapRef.current?.contains(event.target as Node)

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
	const [bottom, setBottom] = useState<number | null>(null)
	const [right, setRight] = useState<number | null>(null)
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
		if (wrapRef.current && popupRef.current) {
			let left: number | undefined
			let top: number | undefined
			let right: number | undefined
			let bottom: number | undefined

			const wRect = wrapRef.current.getBoundingClientRect()
			const { width: ww, height: wh, left: wl, top: wt } = wRect
			const wb = window.innerHeight - wRect.bottom
			const wr = window.innerWidth - wRect.right

			const { width: pw, height: ph } = popupRef.current.getBoundingClientRect()

			switch (placement) {
				case 'top-start':
					left = wl
					bottom = wb + wh
					break
				case 'top':
					left = wl - (pw - ww) / 2
					bottom = wb + wh
					break
				case 'top-end':
					left = wl + ww - pw
					bottom = wb + wh
					break
				case 'left-start':
					right = wr + ww
					top = wt
					break
				case 'right-start':
					left = wl + ww
					top = wt
					break
				case 'left':
					right = wr + ww
					top = wt - (ph - wh) / 2
					break
				case 'right':
					left = wl + ww
					top = wt - (ph - wh) / 2
					break
				case 'left-end':
					right = wr + ww
					top = wt + wh - ph
					break
				case 'right-end':
					left = wl + ww
					top = wt + wh - ph
					break
				case 'bottom-start':
					left = wl
					top = wt + wh
					break
				case 'bottom':
					left = wl - (pw - ww) / 2
					top = wt + wh
					break
				case 'bottom-end':
					left = wl + ww - pw
					top = wt + wh
					break

				default:
					break
			}

			if (!is.undefined(left)) setLeft(left)
			if (!is.undefined(top)) setTop(top)
			if (!is.undefined(right)) setRight(right)
			if (!is.undefined(bottom)) setBottom(bottom)
		}
	}, [placement])

	const popupStyle = {
		...style,
		...(is.number(left) ? { left } : {}),
		...(is.number(right) ? { right } : {}),
		...(is.number(top) ? { top } : {}),
		...(is.number(bottom) ? { bottom } : {})
	}

	const prefixCls = `${UI_PREFIX}-popup`

	const getWrapProps = (onEnter?: MouseEventHandler, onLeave?: MouseEventHandler) => {
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
						setBottom(null)
						setLeft(null)
						setRight(null)
					}}
				>
					<div
						ref={popupRef}
						className={cls(className, prefixCls)}
						style={popupStyle}
						{...getWrapProps(onMouseEnter, onMouseLeave)}
						{...rest}
					>
						<div
							className={`${prefixCls}-content`}
							style={{
								[spacingName]: spacing
							}}
						>
							{isValidElement(content) ? content : <div className={`${prefixCls}-inner`}>{content}</div>}
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
					ref: wrapRef,
					...getWrapProps(child.props.onMouseEnter, child.props.onMouseLeave)
				})}
			{portal}
		</>
	)
}

export default Popup
