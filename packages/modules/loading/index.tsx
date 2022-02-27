import { cls } from 'gray-utils'
import React, { HTMLAttributes, ReactNode } from 'react'
import SpinSvg from './SpinSvg'
import './loading.scss'

interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	icon?: ReactNode
	description?: ReactNode
}

const Loading: React.FC<LoadingProps> = props => {
	const { className, children, spinning = true, icon = <SpinSvg />, description, ...rest } = props
	const isWrapper = !!children
	return (
		<div
			className={cls(className, 'g-loading', {
				'g-loading-spinning': spinning,
				'g-loading-is-wrapper': isWrapper
			})}
			{...rest}
		>
			{spinning && (
				<div className="g-loading-tip-box">
					{icon}
					{description && <span className="g-loading-tip-description">{description}</span>}
				</div>
			)}
			<div className="g-loading-content">{children}</div>
		</div>
	)
}

export default Loading
