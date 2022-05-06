import { FC, HTMLAttributes } from 'react'
import './circle.scss'
export interface CircleProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	defaultMolecule?: number
	molecule?: number
	denominator?: number
	round?: boolean
	strokeWidth?: number
	duration?: number
}
declare const Circle: FC<CircleProps>
export default Circle
