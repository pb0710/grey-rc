import { FC, HTMLAttributes } from 'react'
import './tooltip.scss'
interface TooltipProps extends HTMLAttributes<HTMLElement> {
	block?: boolean
	disabled?: boolean
	content?: string
	direction?: 'top' | 'left' | 'right' | 'bottom'
}
declare const Tooltip: FC<TooltipProps>
export default Tooltip
