import { cls } from 'grey-utils'
import React, { FC, HTMLAttributes } from 'react'
import { UI_PREFIX } from '../../constants'
import './divider.scss'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
}

const Divider: FC<DividerProps> = props => {
	const { children, className, size = 'medium', direction = 'horizontal' } = props
	const prefixCls = `${UI_PREFIX}-divider`
	return (
		<div
			className={cls(
				className,
				prefixCls,
				`${prefixCls}-${direction}`,
				`${prefixCls}-${direction}-${size}`
			)}
		>
			{children}
		</div>
	)
}
export default Divider
