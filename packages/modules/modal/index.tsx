import { cls } from 'gray-utils'
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
	onCancel?: () => void
}

const Modal: FC<ModalProps> = props => {
	const { children, className, maskClassName, visible = false, onCancel, ...rest } = props

	console.log('mousePosition', mousePosition)

	return visible
		? createPortal(
				<div className={cls(className, 'g-modal')} {...rest}>
					<div className={cls(maskClassName, 'g-modal-mask')}></div>
					<div className="g-modal-wrap" onClick={onCancel}>
						<div onClick={e => e.stopPropagation()}>{children}</div>
					</div>
				</div>,
				document.body
		  )
		: null
}

export default Modal
