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
import { Fade } from '../motion'

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
		...rest
	} = props

	const wrapRef = useRef<HTMLElement>(null)
	const popupRef = useRef<HTMLDivElement>(null)

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const [_visible, _setVisible] = useState(visible)
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

	const [popupPos, setPopupPos] = useState<null | Record<'x' | 'y', number>>(null)

	let spacingName = ''
	if (placement.includes('top')) {
		spacingName = 'marginBottom'
	} else if (placement.includes('left')) {
		spacingName = 'marginRight'
	} else if (placement.includes('bottom')) {
		spacingName = 'marginTop'
	} else if (placement.includes('right')) {
		spacingName = 'marginLeft'
	}

	const updatePopupPos = useCallback(() => {
		if (wrapRef.current && popupRef.current) {
			let x: number | undefined
			let y: number | undefined

			const { width: ww, height: wh, left: wl, top: wt } = wrapRef.current.getBoundingClientRect()
			const { width: pw, height: ph } = popupRef.current.getBoundingClientRect()

			switch (placement) {
				case 'top-start':
					x = wl
					y = wt - ph
					break
				case 'top':
					x = wl - (pw - ww) / 2
					y = wt - ph
					break
				case 'top-end':
					x = wl + ww - pw
					y = wt - ph
					break
				case 'left-start':
					x = wl - pw
					y = wt
					break
				case 'right-start':
					x = wl + ww
					y = wt
					break
				case 'left':
					x = wl - pw
					y = wt - (ph - wh) / 2
					break
				case 'right':
					x = wl + ww
					y = wt - (ph - wh) / 2
					break
				case 'left-end':
					x = wl - pw
					y = wt + wh - ph
					break
				case 'right-end':
					x = wl + ww
					y = wt + wh - ph
					break
				case 'bottom-start':
					x = wl
					y = wt + wh
					break
				case 'bottom':
					x = wl - (pw - ww) / 2
					y = wt + wh
					break
				case 'bottom-end':
					x = wl + ww - pw
					y = wt + wh
					break

				default:
					break
			}

			if (!is.undefined(x) && !is.undefined(y)) {
				setPopupPos({ x, y })
			}
		}
	}, [placement])

	let popupStyle
	if (popupPos) {
		popupStyle = {
			...style,
			left: popupPos.x,
			top: popupPos.y
		}
	}

	const prefixCls = `${UI_PREFIX}-popup`

	const getWrapProps = (onMouseEnter?: MouseEventHandler, onMouseLeave?: MouseEventHandler) => {
		if (isHover)
			return {
				onMouseEnter(event: MouseEvent) {
					onMouseEnter?.(event)
					onVisibleChange?.(true)
					_setVisible(true)
				},
				onMouseLeave(event: MouseEvent) {
					onMouseLeave?.(event)
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
				<Fade
					in={_visible}
					mountOnEnter
					unmountOnExit
					onEnter={updatePopupPos}
					onExited={() => {
						setPopupPos(null)
					}}
				>
					<div ref={popupRef} className={cls(className, prefixCls)} style={popupStyle} {...rest}>
						<div
							className={`${prefixCls}-content`}
							style={{
								[spacingName]: spacing
							}}
						>
							{isValidElement(content) ? content : <div className={`${prefixCls}-inner`}>{content}</div>}
						</div>
					</div>
				</Fade>,
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
