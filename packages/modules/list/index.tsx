import { cls } from 'grey-utils'
import React, { Children, cloneElement, FC, HTMLAttributes, isValidElement } from 'react'
import { UI_PREFIX } from '../../constants'
import './list.scss'
import ListItem, { ListItemProps } from './ListItem'

interface ListProps extends HTMLAttributes<HTMLDivElement> {
	bordered?: boolean
}

const List: FC<ListProps> = props => {
	const { className, children, bordered = true, ...rest } = props

	const prefixCls = `${UI_PREFIX}-list`

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-bordered`]: bordered
			})}
			{...rest}
		>
			{Children.map(children, child => {
				if (!isValidElement<ListItemProps>(child)) return child

				return cloneElement(child, { bordered })
			})}
		</div>
	)
}

const ExportList = List as typeof List & {
	Item: typeof ListItem
}
ExportList.Item = ListItem

export default ExportList
