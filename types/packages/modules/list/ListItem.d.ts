import { FC, HTMLAttributes, ReactNode } from 'react'
import './list-item.scss'
export interface ListItemProps extends Omit<HTMLAttributes<HTMLDivElement>, 'prefix'> {
	prefix?: ReactNode
	suffix?: ReactNode
	bordered?: boolean
}
declare const ListItem: FC<ListItemProps>
export default ListItem
