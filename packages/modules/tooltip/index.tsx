import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes } from 'react'
import './tooltip.scss'

interface TooltipProps extends HTMLAttributes<HTMLElement> {
	block?: boolean
	disabled?: boolean
	content?: string
	direction?:
		| 'top'
		| 'left'
		| 'right'
		| 'bottom'
		| 'top-left'
		| 'top-right'
		| 'left-top'
		| 'left-bottom'
		| 'bottom-left'
		| 'bottom-right'
		| 'right-bottom'
		| 'right-top'
}

const Tooltip: FC<TooltipProps> = props => {
	const {
		children,
		className,
		content,
		direction = 'bottom',
		block = false,
		disabled = false,
		...rest
	} = props
	return (
		<div
			className={cls(className, 'g-tooltip', `g-tooltip-${direction}`, {
				'g-tooltip-block': block,
				'g-tooltip-disabled': disabled
			})}
			aria-controls={content}
			{...rest}
		>
			{children}
		</div>
	)
}

export default Tooltip
