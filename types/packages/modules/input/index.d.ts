import React, { ChangeEventHandler, HTMLAttributes, ReactNode, ReactText } from 'react'
import './input.scss'
import Textarea from './Textarea'
interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'maxLength' | 'onChange' | 'prefix'> {
	value?: ReactText
	block?: boolean
	round?: boolean
	disabled?: boolean
	prefix?: ReactNode
	suffix?: ReactNode
	allowClear?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: ReactText) => void)
}
declare const ExportInput: React.ForwardRefExoticComponent<
	InputProps & React.RefAttributes<HTMLInputElement>
> & {
	Textarea: typeof Textarea
}
export default ExportInput
