import React, { HTMLAttributes, ReactNode } from 'react'
import ProgressCircle from './ProgressCircle'
import './progress.scss'
import { RenderCounterProps } from 'react-countup/build/types'
interface ProgressProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	defaultPercent?: number
	percent?: number
	direction?: 'horizontal' | 'vertical'
	suffix?: ReactNode
	format?: ((ref: RenderCounterProps) => ReactNode) | null
}
declare const ExportProgress: React.FC<ProgressProps> & {
	Circle: typeof ProgressCircle
}
export default ExportProgress
