import React, { ChangeEventHandler, ReactText, TextareaHTMLAttributes } from 'react'
import './textarea.scss'
interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
	autosize?: boolean
	block?: boolean
	disabled?: boolean
	value?: ReactText
	onChange?: ChangeEventHandler<HTMLTextAreaElement> & ((value?: ReactText) => void)
}
declare const Textarea: React.ForwardRefExoticComponent<
	TextareaProps & React.RefAttributes<HTMLTextAreaElement>
>
export default Textarea
