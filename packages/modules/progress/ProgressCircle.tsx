import { cls, is, omit } from 'grey-utils'
import React, { FC, ReactNode, useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'
import Circle, { CircleProps } from './Circle'
import './progress-circle.scss'

interface ProgressProps extends CircleProps {
	size?: 'small' | 'medium' | 'large'
	defaultMolecule?: number
	molecule?: number
	denominator?: number
	suffix?: ReactNode
	format?: ((props: RenderCounterProps) => ReactNode) | null
}

const Progress: FC<ProgressProps> = props => {
	const {
		className,
		size = 'medium',
		suffix = '%',
		format,
		defaultMolecule = 0,
		molecule = 0,
		denominator = 100,
		...rest
	} = omit(props, 'duration')

	const preMoleculeRef = useRef(defaultMolecule)
	useEffect(() => {
		preMoleculeRef.current = molecule
	}, [molecule])

	const detailVisible = size === 'small' || is.null(format)

	return (
		<Circle
			className={cls(className, 'g-progress-circle', `g-progress-circle-${size}`)}
			defaultMolecule={defaultMolecule}
			molecule={molecule}
			denominator={denominator}
			size={size}
			{...rest}
		>
			{detailVisible || (
				<div className="g-progress-circle-detail">
					<CountUp
						className="g-progress-circle-detail-num"
						start={preMoleculeRef.current}
						end={molecule}
						duration={0.4}
					>
						{format}
					</CountUp>
					{suffix && <span className="g-progress-circle-detail-suffix">{suffix}</span>}
				</div>
			)}
		</Circle>
	)
}

export default Progress
