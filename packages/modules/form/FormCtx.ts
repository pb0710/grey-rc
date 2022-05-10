import { Form } from 'grey-rh'
import { createContext } from 'react'

export interface FormContext {
	form: Form
	labelWidth: string
	labelAlign: 'top' | 'left' | 'right'
	labelSuffix: string
}
export const FormCtx = createContext<Partial<FormContext>>({})
