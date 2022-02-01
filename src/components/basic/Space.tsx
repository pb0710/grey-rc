import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes } from 'react'
import './classes/space.scss'

interface SpaceProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	align?: 'start' | 'end' | 'center' | 'baseline'
	direction?: 'horizontal' | 'vertical'
	block?: boolean
}

export const Space: FC<SpaceProps> = props => {
	const {
		children,
		className,
		size = 'medium',
		align = 'start',
		direction = 'horizontal',
		block = true,
		style,
		...rest
	} = props

	function toDisplay(block: boolean) {
		return block ? 'flex' : 'inline-flex'
	}
	function toAlignItems(align: string) {
		if (['start', 'end'].includes(align)) {
			return `flex-${align}`
		}
		return align
	}
	function toFlexDirection(direction: string) {
		if (direction === 'horizontal') return 'row'
		if (direction === 'vertical') return 'column'
		return 'row'
	}
	return (
		<div
			className={cls(className, 'g-space-box', `g-${size}`)}
			style={{
				display: toDisplay(block),
				alignItems: toAlignItems(align),
				flexDirection: toFlexDirection(direction),
				...style
			}}
			{...rest}
		>
			{children}
		</div>
	)
}
