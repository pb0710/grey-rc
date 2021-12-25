import { cls } from 'gray-utils'
import React, { Children, cloneElement, FC, HTMLAttributes, isValidElement } from 'react'
import './classes/space.scss'

interface SpaceProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	align?: 'start' | 'end' | 'center' | 'baseline'
}

export const Space: FC<SpaceProps> = props => {
	const { children, size = 'medium', align = 'center', style, ...rest } = props
	let alignItems: string = align
	if (['start', 'end'].includes(align)) {
		alignItems = `flex-${align}`
	}
	return (
		<div className="g-space-box" style={{ alignItems, ...style }} {...rest}>
			{Children.map(children, child => {
				if (isValidElement(child)) {
					const className = cls(child.props.className, 'g-space-item', `g-${size}`)
					return cloneElement(child, { className })
				}
				return child
			})}
		</div>
	)
}
