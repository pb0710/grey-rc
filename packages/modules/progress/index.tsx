import React, { CSSProperties, FC, HTMLAttributes, ReactNode, useEffect, useRef } from 'react'
import ProgressCircle from './ProgressCircle'
import { cls, is } from 'grey-utils'
import './progress.scss'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'
import { UI_PREFIX } from '../../constants'

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

	const prefixCls = `${UI_PREFIX}-progress`

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
			className={cls(className, prefixCls, `${prefixCls}-${size}`, `${prefixCls}-${direction}`)}
			{...rest}
		>
			<div className={`${prefixCls}-track`}>
				<div className={`${prefixCls}-inset`} style={rectStyle}></div>
			</div>
			{is.null(format) || (
				<span className={`${prefixCls}-text`}>
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
}
ExportProgress.Circle = ProgressCircle
export default ExportProgress
