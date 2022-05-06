import React, { HTMLAttributes } from 'react'
import './list.scss'
import ListItem from './ListItem'
interface ListProps extends HTMLAttributes<HTMLDivElement> {
	bordered?: boolean
}
declare const ExportList: React.FC<ListProps> & {
	Item: typeof ListItem
}
export default ExportList
