import { cls } from 'grey-utils'
import React, { forwardRef, HTMLAttributes, ReactNode } from 'react'
import { UI_PREFIX } from '../../constants'
import './list-item.scss'

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode
	suffix?: ReactNode
	size?: 'small' | 'medium' | 'large'
	bordered?: boolean
}

const ListItem = forwardRef<HTMLDivElement, ListItemProps>((props, outerRef) => {
	const { className, children, size = 'medium', bordered = true, prefix, suffix, ...rest } = props

	const prefixCls = `${UI_PREFIX}-list-item`

	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-bordered`]: bordered
			})}
			{...rest}
		>
			{prefix && <div>{prefix}</div>}
			<div className={`${prefixCls}-content`}>{children}</div>
			{suffix && <div>{suffix}</div>}
		</div>
	)
})

export default ListItem
