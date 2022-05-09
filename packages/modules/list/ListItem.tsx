import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { UI_PREFIX } from '../../constants'
import './list-item.scss'

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode
	suffix?: ReactNode
	bordered?: boolean
}

const ListItem: FC<ListItemProps> = props => {
	const { className, children, bordered = true, prefix, suffix, ...rest } = props

	const prefixCls = `${UI_PREFIX}-list-item`

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-bordered`]: bordered
			})}
			{...rest}
		>
			{prefix && <div>{prefix}</div>}
			<div className={`${prefixCls}-content`}>{children}</div>
			{suffix && <div>{suffix}</div>}
		</div>
	)
}

export default ListItem
