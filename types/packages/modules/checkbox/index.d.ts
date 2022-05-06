import React, { ChangeEventHandler, InputHTMLAttributes, ReactText } from 'react'
import './checkbox.scss'
import CheckboxGroup from './CheckboxGroup'
export interface CheckboxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value'
	> {
	label?: ReactText
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}
declare const ExportCheckbox: React.ForwardRefExoticComponent<
	CheckboxProps & React.RefAttributes<HTMLInputElement>
> & {
	Group: typeof CheckboxGroup
}
export default ExportCheckbox
