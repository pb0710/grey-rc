import { cls } from 'grey-utils'
import React, { forwardRef, HTMLAttributes } from 'react'
import { UI_PREFIX } from '../../constants'
import './divider.scss'

interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
}

const Divider = forwardRef<HTMLDivElement, DividerProps>((props, outerRef) => {
	const { children, className, size = 'medium', direction = 'horizontal' } = props
	const prefixCls = `${UI_PREFIX}-divider`
	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, `${prefixCls}-${direction}`, `${prefixCls}-${direction}-${size}`)}
		>
			{children}
		</div>
	)
})
export default Divider
