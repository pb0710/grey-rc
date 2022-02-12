import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes, useContext, useEffect, useState } from 'react'
import { useUuId } from '../../hooks'
import './classes/checkbox.scss'
import { CheckboxGroupCtx } from './CheckboxGroup'

interface CheckboxProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	value?: boolean
	onChange?(value: boolean): void
	disabled?: boolean
	defaultValue?: boolean
	option?: any
}

export const Checkbox: FC<CheckboxProps> = props => {
	const {
		children,
		className,
		disabled = false,
		defaultValue = false,
		option = '',
		value = defaultValue,
		onChange,
		...rest
	} = props
	const uuid = useUuId()
	const ctx = useContext(CheckboxGroupCtx)
	const [_val, _setVal] = useState(defaultValue)

	useEffect(() => {
		if (ctx.value?.includes(option)) {
			_setVal(true)
		} else {
			_setVal(value)
		}
	}, [ctx.value, option, value])

	return (
		<>
			<input
				className={cls('g-checkbox-input', className)}
				type="checkbox"
				id={uuid}
				hidden
				disabled={disabled}
				checked={_val}
				onChange={e => {
					const { checked } = e.target
					onChange?.(checked)
					let nextValue = ctx.value || []
					if (checked) {
						nextValue = [...nextValue, option]
					} else {
						nextValue = nextValue.filter(item => item !== option)
					}
					ctx?.onChange?.(nextValue)
				}}
			/>
			<label className={cls('g-checkbox', className)} htmlFor={uuid} {...rest}>
				{children}
			</label>
		</>
	)
}
