import { cls, is, omit } from 'gray-utils'
import React, { FC, ReactNode } from 'react'
import Countup from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'
import Circle, { CircleProps } from './Circle'
import './countdown.scss'

interface CountdownProps extends CircleProps {
	size?: 'small' | 'medium' | 'large'
	duration?: number
	suffix?: ReactNode
	format?: ((props: RenderCounterProps) => ReactNode) | null
}

const Countdown: FC<CountdownProps> = props => {
	const {
		className,
		size = 'medium',
		suffix = 's',
		format,
		duration = 60,
		...rest
	} = omit(props, 'defaultMolecule', 'molecule', 'denominator')

	const detailVisible = size === 'small' || is.null(format)

	return (
		<Circle
			className={cls(className, 'g-countdown', `g-countdown-${size}`)}
			defaultMolecule={duration}
			molecule={0}
			denominator={duration}
			size={size}
			duration={duration}
			{...rest}
		>
			{detailVisible || (
				<div className="g-countdown-detail">
					<Countup
						className="g-countdown-detail-num"
						delay={0}
						start={duration}
						end={0}
						duration={duration}
					>
						{format}
					</Countup>
					{suffix && <span className="g-countdown-detail-suffix">{suffix}</span>}
				</div>
			)}
		</Circle>
	)
}

export default Countdown
