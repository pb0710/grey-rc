import { cls } from 'gray-utils'
import React, { FC } from 'react'
import './classes/divider.scss'

interface DividerProps {
	className?: string
	size?: 'small' | 'medium' | 'large'
}

export const Divider: FC<DividerProps> = props => {
	const { children, className, size = 'medium' } = props
	return <div className={cls(className, 'g-divider', `g-${size}`)}>{children}</div>
}
