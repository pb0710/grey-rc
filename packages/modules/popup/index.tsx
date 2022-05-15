import React, { FC, HTMLAttributes, isValidElement, ReactNode, useCallback, useEffect, useRef, useState } from 'react'
import { cls, is } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './popup.scss'
import { createPortal } from 'react-dom'

let visibleHandlers: ((event: MouseEvent) => void)[] = []

document.addEventListener('click', event => {
	visibleHandlers.forEach(handler => handler(event))
})

interface PopupProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	content?: ReactNode
	trigger?: 'hover' | 'click' | 'manual'
	position?:
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
	onClickOutside?: (event: MouseEvent) => void
	onVisibleChange?: (visible: boolean) => void
}

const Popup: FC<PopupProps> = props => {
	const {
		className,
		children,
		content,
		visible = false,
		trigger,
		position = 'bottom-start',
		spacing = 8,
		onClickOutside,
		onVisibleChange,
		style,
		...rest
	} = props

	const wrapRef = useRef<HTMLDivElement>(null)
	const popupRef = useRef<HTMLDivElement>(null)

	const isHover = trigger === 'hover'
	const isClick = trigger === 'click'
	const isManual = trigger === 'manual'

	const [_visible, _setVisible] = useState(visible)
	useEffect(() => {
		if (isManual) _setVisible(visible)
	}, [isManual, visible])

	const visibleHandlerRef = useRef((event: MouseEvent) => {
		if (popupRef.current?.contains(event.target as Node)) return
		if (wrapRef.current?.contains(event.target as Node)) {
			_setVisible(pre => {
				onVisibleChange?.(pre)
				return !pre
			})
		} else {
			onClickOutside?.(event)
			onVisibleChange?.(false)
			_setVisible(false)
		}
	})

	const [popupPos, setPopupPos] = useState<null | Record<'x' | 'y', number>>(null)

	let spacingName = ''
	if (position.includes('top')) {
		spacingName = 'marginBottom'
	} else if (position.includes('left')) {
		spacingName = 'marginRight'
	} else if (position.includes('bottom')) {
		spacingName = 'marginTop'
	} else if (position.includes('right')) {
		spacingName = 'marginLeft'
	}

	const updatePopupPos = useCallback(() => {
		if (wrapRef.current && popupRef.current) {
			let x: number | undefined
			let y: number | undefined

			const { width: ww, height: wh, left: wl, top: wt } = wrapRef.current.getBoundingClientRect()
			const { width: pw, height: ph } = popupRef.current.getBoundingClientRect()

			switch (position) {
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
	}, [position])

	useEffect(() => {
		if (!_visible) {
			setPopupPos(null)
		} else {
			updatePopupPos()
		}
	}, [position, _visible, updatePopupPos])

	let popupStyle
	if (popupPos) {
		popupStyle = {
			...style,
			left: popupPos.x,
			top: popupPos.y
		}
	}

	const prefixCls = `${UI_PREFIX}-popup`

	let wrapProps
	if (isHover) {
		wrapProps = {
			onMouseEnter() {
				onVisibleChange?.(true)
				_setVisible(true)
			},
			onMouseLeave() {
				onVisibleChange?.(false)
				_setVisible(false)
			}
		}
	}

	useEffect(() => {
		const removeHandler = () => {
			visibleHandlers = visibleHandlers.filter(handler => handler !== visibleHandlerRef.current)
		}
		if (isClick) visibleHandlers.push(visibleHandlerRef.current)
		else removeHandler()

		return () => {
			removeHandler()
		}
	}, [isClick])

	const portal = _visible
		? createPortal(
				<div ref={popupRef} className={cls(className, prefixCls)} style={popupStyle} {...rest}>
					<div
						className={`${prefixCls}-content`}
						style={{
							[spacingName]: spacing
						}}
					>
						{isValidElement(content) ? content : <div className={`${prefixCls}-inner`}>{content}</div>}
					</div>
				</div>,
				document.body
		  )
		: null

	return (
		<div ref={wrapRef} className={`${prefixCls}-wrap`} {...wrapProps}>
			{children}
			{portal}
		</div>
	)
}

export default Popup
