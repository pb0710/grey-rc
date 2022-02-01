import React, { FC } from 'react'
import { InputBase, InputBaseProps } from './InputBase'
import './classes/textarea.scss'

interface TextareaProps extends Omit<InputBaseProps, 'component' | 'canBeClear'> {
	autoSize?: boolean
}

export const Textarea: FC<TextareaProps> = props => {
	const { autoSize = true, ...rest } = props
	return <InputBase className="g-textarea" component="textarea" {...rest} />
}
