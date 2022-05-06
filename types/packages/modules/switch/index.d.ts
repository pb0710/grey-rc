import React, { ChangeEventHandler, InputHTMLAttributes } from 'react'
import './switch.scss'
interface SwitchProps
	extends Omit<
		InputHTMLAttributes<HTMLElement>,
		'defaultValue' | 'value' | 'onChange' | 'checked' | 'defaultChecked'
	> {
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value?: boolean) => void)
}
declare const Switch: React.ForwardRefExoticComponent<SwitchProps & React.RefAttributes<HTMLInputElement>>
export default Switch
