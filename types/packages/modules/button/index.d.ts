import React, { ButtonHTMLAttributes, ReactElement } from 'react'
import './button.scss'
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	block?: boolean
	primary?: boolean
	round?: boolean
	circle?: boolean
	loading?: boolean
	disabled?: boolean
	icon?: ReactElement
}
declare const Button: React.ForwardRefExoticComponent<ButtonProps & React.RefAttributes<HTMLButtonElement>>
export default Button
