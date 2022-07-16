import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './toast-item.scss'
import Icon from '../icon'
import { mdiClose } from '@mdi/js'

export interface ToastItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	title?: ReactNode
	icon?: ReactNode
	closable?: boolean
	onClose?: () => void
}

const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>((props, outerRef) => {
	const { className, title, icon, closable = false, onClose, ...rest } = props

	const prefixCls = `${UI_PREFIX}-toast-item`

	return (
		<div ref={outerRef} className={cls(className, prefixCls)} {...rest}>
			{icon && <div className={`${prefixCls}-icon`}>{icon}</div>}
			<div className={`${prefixCls}-title-wrap`}>{title}</div>
			{closable && (
				<div className={`${prefixCls}-close-icon`}>
					<Icon path={mdiClose} onClick={() => onClose?.()} />
				</div>
			)}
		</div>
	)
})

export default ToastItem
