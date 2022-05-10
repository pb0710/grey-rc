import React, { FC, FormHTMLAttributes } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './form.scss'
import { FormContext, FormCtx } from './formCtx'
import { useForm, Form } from 'grey-rh'
import { Field } from './Field'

interface FormProps extends FormHTMLAttributes<HTMLFormElement>, Partial<FormContext> {
	form: Form
	layout?: 'horizontal' | 'vertical' | 'inline'
}

const Form: FC<FormProps> = props => {
	const {
		className,
		children,
		layout = 'horizontal',
		form,
		labelWidth,
		labelAlign,
		labelSuffix,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-form`

	return (
		<FormCtx.Provider
			value={{
				form,
				labelWidth,
				labelAlign,
				labelSuffix
			}}
		>
			<form className={cls(className, prefixCls, `${prefixCls}-${layout}`)} {...rest}>
				{children}
			</form>
		</FormCtx.Provider>
	)
}

const ExportForm = Form as typeof Form & {
	Field: typeof Field
	useForm: typeof useForm
}
export default ExportForm
