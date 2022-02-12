import React, { FC } from 'react'
import { InputBase, InputBaseProps } from './InputBase'

type InputProps = Omit<InputBaseProps, 'component'>

export const Input: FC<InputProps> = props => {
	return <InputBase component="input" {...props} />
}
