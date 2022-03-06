import React, { CSSProperties, FC, HTMLAttributes, ReactNode, RefObject, useEffect, useRef } from 'react'
import ProgressCircle from './ProgressCircle'
import Countdown from './Countdown'
import { cls, is } from 'gray-utils'
import './progress.scss'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'

interface ProgressProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	defaultPercent?: number
	percent?: number
	direction?: 'horizontal' | 'vertical'
	suffix?: ReactNode
	format?: ((ref: RenderCounterProps) => ReactNode) | null
}

const Progress: FC<ProgressProps> = props => {
	const {
		className,
		size = 'medium',
		defaultPercent = 0,
		percent = 0,
		direction = 'horizontal',
		suffix = '%',
		format,
		...rest
	} = props

	const prePercentRef = useRef(defaultPercent)
	useEffect(() => {
		prePercentRef.current = percent
	}, [percent])

	let rectStyle: CSSProperties
	switch (direction) {
		case 'horizontal':
			rectStyle = {
				width: `${percent}%`
			}
			break
		case 'vertical':
			rectStyle = {
				height: `${percent}%`
			}
			break
	}

	return (
		<div
			className={cls(className, 'g-progress', `g-progress-${size}`, `g-progress-${direction}`)}
			{...rest}
		>
			<div className="g-progress-track">
				<div className="g-progress-inset" style={rectStyle}></div>
			</div>
			{is.null(format) || (
				<span className="g-progress-text">
					<CountUp start={prePercentRef.current} end={percent} duration={0.2}>
						{format}
					</CountUp>
					{suffix}
				</span>
			)}
		</div>
	)
}

const ExportProgress = Progress as typeof Progress & {
	Circle: typeof ProgressCircle
	Countdown: typeof Countdown
}
ExportProgress.Circle = ProgressCircle
ExportProgress.Countdown = Countdown
export default ExportProgress
