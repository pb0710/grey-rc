import { cls } from 'gray-utils'
import React, { Children, cloneElement, FC, isValidElement } from 'react'
import './classes/space.scss'

interface SpaceProps {
	size?: 'small' | 'medium' | 'large'
	align?: 'start' | 'end' | 'center' | 'baseline'
}

export const Space: FC<SpaceProps> = props => {
	const { children, size = 'medium', align = 'center' } = props
	let alignItems: string = align
	if (['start', 'end'].includes(align)) {
		alignItems = `flex-${align}`
	}
	return (
		<div className="g-space-box" style={{ alignItems }}>
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
