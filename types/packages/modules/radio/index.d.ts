import React, { ChangeEventHandler, InputHTMLAttributes, ReactText } from 'react'
import './radio.scss'
import RadioGroup from './RadioGroup'
export interface RadioProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value'
	> {
	value?: boolean
	disabled?: boolean
	type?: 'default' | 'tab'
	label?: ReactText
	defaultValue?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}
declare const ExportRadio: React.ForwardRefExoticComponent<
	RadioProps & React.RefAttributes<HTMLInputElement>
> & {
	Group: typeof RadioGroup
}
export default ExportRadio
