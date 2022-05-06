import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import SpinSvg from './SpinSvg'
import './loading.scss'

interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	size?: 'inherit' | 'small' | 'medium' | 'large'
	icon?: ReactNode
	description?: ReactNode
}

const Loading: FC<LoadingProps> = props => {
	const {
		className,
		children,
		spinning = true,
		size = 'medium',
		icon = <SpinSvg />,
		description,
		...rest
	} = props
	const isWrapper = !!children
	return (
		<div
			className={cls(className, 'g-loading', {
				'g-loading-spinning': spinning,
				'g-loading-is-wrapper': isWrapper,
				[`g-loading-${size}`]: size
			})}
			{...rest}
		>
			{spinning && (
				<div className="g-loading-tip">
					{icon}
					{description && <span className="g-loading-tip-description">{description}</span>}
				</div>
			)}
			<div className="g-loading-content">{children}</div>
		</div>
	)
}

export default Loading
