import React, { forwardRef, HTMLAttributes, MouseEvent, useContext } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './option.scss'
import { SelectCtx } from './SelectCtx'

export interface OptionProps extends HTMLAttributes<HTMLElement> {
	value: string | number
}

const Option = forwardRef<HTMLDivElement, OptionProps>((props, outerRef) => {
	const { className, children, value, onClick, ...rest } = props

	const { selection = [], updateSelection } = useContext(SelectCtx)

	const handleSelect = (event: MouseEvent<HTMLElement>) => {
		onClick?.(event)
		if (value) updateSelection?.(value)
	}

	const prefixCls = `${UI_PREFIX}-option`

	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-active`]: selection.includes(value)
			})}
			onClick={handleSelect}
			{...rest}
		>
			{children}
		</div>
	)
})

export default Option
