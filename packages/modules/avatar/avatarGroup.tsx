import { cls } from 'gray-utils'
import React, { Children, cloneElement, FC, HTMLAttributes, isValidElement } from 'react'
import { AvatarProps } from '.'
import './avatar-group.scss'

interface AvatarGroupProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	overlapFrom?: 'left' | 'right'
}

const AvatarGroup: FC<AvatarGroupProps> = props => {
	const { children, className, size = 'medium', round = true, overlapFrom = 'left', ...rest } = props
	let sign = 0
	if (overlapFrom === 'left') {
		sign = 1
	} else if (overlapFrom === 'right') {
		sign = -1
	}
	return (
		<div className={cls(className, 'g-avatar-group', `g-avatar-group-overlap-${overlapFrom}`)} {...rest}>
			{Children.map(children, (child, index) =>
				isValidElement<AvatarProps>(child)
					? cloneElement(child, {
							size,
							round,
							style: {
								zIndex: 99 - sign * index
							}
					  })
					: child
			)}
		</div>
	)
}

export default AvatarGroup
