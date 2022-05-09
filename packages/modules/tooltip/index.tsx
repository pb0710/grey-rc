import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes } from 'react'
import { UI_PREFIX } from '../../constants'
import './tooltip.scss'

interface TooltipProps extends HTMLAttributes<HTMLElement> {
	block?: boolean
	disabled?: boolean
	content?: string
	direction?: 'top' | 'left' | 'right' | 'bottom'
}

const Tooltip: FC<TooltipProps> = props => {
	const {
		children,
		className,
		content,
		direction = 'top',
		block = false,
		disabled = false,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-tooltip`

	return (
		<div
			className={cls(className, prefixCls, `${prefixCls}-${direction}`, {
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-disabled`]: disabled
			})}
			aria-controls={content}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Tooltip
