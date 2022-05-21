import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './toast-item.scss'
import Icon from '../basic/Icon'
import { mdiClose } from '@mdi/js'
// import Button from '../button'

export interface ToastItemProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
	title?: ReactNode
	icon?: ReactNode
	closable?: boolean
	onClose?: () => void
}

const ToastItem: FC<ToastItemProps> = props => {
	const { className, title, icon, closable = false, onClose, ...rest } = props

	const prefixCls = `${UI_PREFIX}-toast-item`

	return (
		<div className={cls(className, prefixCls)} {...rest}>
			<div className={`${prefixCls}-icon`}>{icon}</div>
			<div className={`${prefixCls}-title-wrap`}>{title}</div>
			<div className={`${prefixCls}-close-icon`}>
				{closable && (
					<Icon path={mdiClose} onClick={() => onClose?.()} />
					// <Button square>
					// </Button>
				)}
			</div>
		</div>
	)
}

export default ToastItem
