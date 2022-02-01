import { cls, is } from 'gray-utils'
import React, { createContext, FC, HTMLAttributes } from 'react'
import { Space } from '../..'

interface RadioGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'defaultValue' | 'onChange'> {
	value?: any
	onChange?(value: any): void
	disabled?: boolean
	defaultValue?: any
	direction?: 'horizontal' | 'vertical'
}

export const RadioGroupCtx = createContext<{
	value?: any
	onChange?(value: any): void
}>({})

export const RadioGroup: FC<RadioGroupProps> = props => {
	const { children, className, value, onChange, defaultValue, direction = 'horizontal', ...rest } = props
	return (
		<RadioGroupCtx.Provider
			value={{
				value: is.undefined(value) ? defaultValue : value,
				onChange
			}}
		>
			<div className={cls(className, 'g-radio-group')} {...rest}>
				<Space direction={direction} size="medium" block={false}>
					{children}
				</Space>
			</div>
		</RadioGroupCtx.Provider>
	)
}
