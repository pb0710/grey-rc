import { Fade } from '@mui/material'
import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import './modal.scss'

let mousePosition: { x: number; y: number } | null = null
if (document) {
	document.addEventListener('click', event => {
		mousePosition = {
			x: event.pageX,
			y: event.pageY
		}
		// 超过 100ms 则居中弹出
		setTimeout(() => {
			mousePosition = null
		}, 100)
	})
}

export interface ModalProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	maskClassName?: string
	maskClosable?: boolean
	onCancel?: () => void
}

const Modal: FC<ModalProps> = props => {
	const { children, className, maskClassName, maskClosable = true, visible = false, onCancel, ...rest } = props

	const prefixCls = `${UI_PREFIX}-modal`

	return createPortal(
		<Fade in={visible}>
			<div className={cls(className, prefixCls)} {...rest}>
				<div className={cls(maskClassName, `${prefixCls}-mask`)}></div>
				<div
					className={`${prefixCls}-wrap`}
					onClick={
						maskClosable
							? event => {
									if (event.target === event.currentTarget) {
										onCancel?.()
									}
							  }
							: undefined
					}
				>
					{children}
				</div>
			</div>
		</Fade>,
		document.body
	)
}

export default Modal
