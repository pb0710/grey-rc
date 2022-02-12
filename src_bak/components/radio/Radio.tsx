import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes, useContext, useEffect, useState } from 'react'
import { useUuId } from '../../hooks'
import './classes/radio.scss'
import { RadioGroupCtx } from './RadioGroup'

interface RadioProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	value?: boolean
	onChange?(value: boolean): void
	disabled?: boolean
	defaultValue?: boolean
	option?: any
}

export const Radio: FC<RadioProps> = props => {
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
	const ctx = useContext(RadioGroupCtx)
	const [_val, _setVal] = useState(defaultValue)

	useEffect(() => {
		if (ctx.value === option) {
			_setVal(true)
		} else {
			_setVal(value)
		}
	}, [ctx.value, option, value])

	return (
		<>
			<input
				className={cls('g-radio-input', className)}
				type="radio"
				id={uuid}
				hidden
				disabled={disabled}
				checked={_val}
				onChange={e => {
					onChange?.(e.target.checked)
					ctx?.onChange?.(option)
				}}
			/>
			<label className={cls('g-radio', className)} htmlFor={uuid} {...rest}>
				{children}
			</label>
		</>
	)
}
