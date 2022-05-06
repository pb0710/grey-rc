import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes, MouseEvent } from 'react'
import { createPortal } from 'react-dom'
import './modal.scss'

let mousePosition: { x: number; y: number } | null = null
if (document) {
	document.addEventListener('click', e => {
		mousePosition = {
			x: e.pageX,
			y: e.pageY
		}
		// 超过 100ms 则居中弹出
		setTimeout(() => {
			mousePosition = null
		}, 100)
	})
}

interface ModalProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	maskClassName?: string
	maskClosable?: boolean
	onCancel?: () => void
}

const Modal: FC<ModalProps> = props => {
	const {
		children,
		className,
		maskClassName,
		maskClosable = true,
		visible = false,
		onCancel,
		...rest
	} = props

	console.log('mousePosition', mousePosition)

	return visible
		? createPortal(
				<div className={cls(className, 'g-modal')} {...rest}>
					<div className={cls(maskClassName, 'g-modal-mask')}></div>
					<div className="g-modal-wrap" onClick={maskClosable ? onCancel : undefined}>
						<div onClick={e => e.stopPropagation()}>{children}</div>
					</div>
				</div>,
				document.body
		  )
		: null
}

export default Modal
