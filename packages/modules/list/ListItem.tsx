import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import './list-item.scss'

export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode
	suffix?: ReactNode
	bordered?: boolean
}

const ListItem: FC<ListItemProps> = props => {
	const { className, children, bordered = true, prefix, suffix, ...rest } = props
	return (
		<div
			className={cls(className, 'g-list-item', {
				'g-list-item-bordered': bordered
			})}
			{...rest}
		>
			{prefix && <div>{prefix}</div>}
			<div className="g-list-item-content">{children}</div>
			{suffix && <div>{suffix}</div>}
		</div>
	)
}

export default ListItem
