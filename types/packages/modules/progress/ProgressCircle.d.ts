import { FC, ReactNode } from 'react'
import { RenderCounterProps } from 'react-countup/build/types'
import { CircleProps } from './Circle'
import './progress-circle.scss'
interface ProgressProps extends CircleProps {
	size?: 'small' | 'medium' | 'large'
	defaultMolecule?: number
	molecule?: number
	denominator?: number
	suffix?: ReactNode
	format?: ((props: RenderCounterProps) => ReactNode) | null
}
declare const Progress: FC<ProgressProps>
export default Progress
