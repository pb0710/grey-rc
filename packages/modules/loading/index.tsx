import { cls } from 'grey-utils'
import React, { FC, forwardRef, HTMLAttributes, ReactNode } from 'react'
import SpinSvg from './SpinSvg'
import './loading.scss'
import { UI_PREFIX } from '../../constants'

interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	size?: 'inherit' | 'small' | 'medium' | 'large'
	icon?: ReactNode
	description?: ReactNode
}

const Loading = forwardRef<HTMLDivElement, LoadingProps>((props, outerRef) => {
	const { className, children, spinning = true, size = 'medium', icon = <SpinSvg />, description, ...rest } = props

	const isWrapper = Boolean(children)

	const prefixCls = `${UI_PREFIX}-loading`

	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-spinning`]: spinning,
				[`${prefixCls}-is-wrapper`]: isWrapper,
				[`${prefixCls}-${size}`]: size
			})}
			{...rest}
		>
			{spinning && (
				<div className={`${prefixCls}-tip`}>
					{icon}
					{description && <span className={`${prefixCls}-tip-description`}>{description}</span>}
				</div>
			)}
			<div className={`${prefixCls}-content`}>{children}</div>
		</div>
	)
})

export default Loading
