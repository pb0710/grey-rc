import { FC, HTMLAttributes, ReactNode } from 'react'
import './card.scss'
interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
	bordered?: boolean
	shadow?: boolean
	hasCancel?: boolean
	okText?: string
	cancelText?: string
	okLoading?: boolean
	title?: ReactNode
	header?: ReactNode
	footer?: ReactNode
	action?: ReactNode
	onCancel?: () => void
	onOk?: () => void
}
declare const Card: FC<CardProps>
export default Card
