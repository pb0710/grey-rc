import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes, useEffect, useState } from 'react'
import { useUuId } from '../../hooks'
import './classes/switch.scss'

interface SwitchProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	value?: boolean
	onChange?(value: boolean): void
	disabled?: boolean
	defaultValue?: boolean
}

export const Switch: FC<SwitchProps> = props => {
	const {
		className,
		disabled = false,
		defaultValue = false,
		value = defaultValue,
		onChange,
		...rest
	} = props
	const uuid = useUuId()
	const [_val, _setVal] = useState(defaultValue)
	useEffect(() => {
		_setVal(value)
	}, [value])
	return (
		<>
			<input
				className="g-switch-input"
				type="checkbox"
				id={uuid}
				hidden
				disabled={disabled}
				checked={_val}
				onChange={e => onChange?.(e.target.checked)}
			/>
			<label
				className={cls('g-switch', className, {
					'g-disabled': disabled
				})}
				htmlFor={uuid}
				{...rest}
			></label>
		</>
	)
}
