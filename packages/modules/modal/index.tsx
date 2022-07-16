import Motion from '../motion'
import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes, useRef } from 'react'
import { createPortal } from 'react-dom'
import { UI_PREFIX } from '../../constants'
import './modal.scss'

// TODO: 弹出位置动画
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
	destroy?: boolean
	onCancel?: () => void
}

const Modal: FC<ModalProps> = props => {
	const {
		children,
		className,
		maskClassName,
		maskClosable = true,
		destroy = false,
		visible = false,
		onCancel,
		...rest
	} = props

	const preBodyOverflowRef = useRef('')

	const setBodyOverflowHidden = () => {
		preBodyOverflowRef.current = document.body.style.getPropertyValue('overflow')
		document.body.style.setProperty('overflow', 'hidden')
	}

	const resetBodyOverflowHidden = () => {
		document.body.style.setProperty('overflow', preBodyOverflowRef.current)
	}

	const prefixCls = `${UI_PREFIX}-modal`

	return createPortal(
		<Motion.Fade
			in={visible}
			mountOnEnter
			unmountOnExit={destroy}
			onEnter={setBodyOverflowHidden}
			onExited={resetBodyOverflowHidden}
		>
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
		</Motion.Fade>,
		document.body
	)
}

export default Modal
