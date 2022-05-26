import { cls, is, omit } from 'grey-utils'
import React, { forwardRef, ReactNode, useEffect, useRef } from 'react'
import CountUp from 'react-countup'
import { RenderCounterProps } from 'react-countup/build/types'
import { UI_PREFIX } from '../../constants'
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

const Progress = forwardRef<HTMLDivElement, ProgressProps>((props, outerRef) => {
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
	const prefixCls = `${UI_PREFIX}-progress-circle`

	return (
		<Circle
			ref={outerRef}
			className={cls(className, prefixCls, `${prefixCls}-${size}`)}
			defaultMolecule={defaultMolecule}
			molecule={molecule}
			denominator={denominator}
			size={size}
			{...rest}
		>
			{detailVisible || (
				<div className={`${prefixCls}-detail`}>
					<CountUp
						className={`${prefixCls}-detail-num`}
						start={preMoleculeRef.current}
						end={molecule}
						duration={0.4}
					>
						{format}
					</CountUp>
					{suffix && <span className={`${prefixCls}-detail-suffix`}>{suffix}</span>}
				</div>
			)}
		</Circle>
	)
})

export default Progress
