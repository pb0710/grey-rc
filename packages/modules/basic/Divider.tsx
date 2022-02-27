import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes } from 'react'
import './divider.scss'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
}

const Divider: FC<DividerProps> = props => {
	const { children, className, size = 'medium', direction = 'horizontal' } = props
	return (
		<div className={cls(className, 'g-divider', `g-divider-${size}`, `g-divider-${direction}`)}>
			{children}
		</div>
	)
}
export default Divider
