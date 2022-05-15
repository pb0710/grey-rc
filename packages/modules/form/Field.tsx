import React, { cloneElement, FC, isValidElement, LabelHTMLAttributes, useContext } from 'react'
import { useUpdate, Form } from 'grey-rh'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import { FormContext, FormCtx } from './FormCtx'
import './field.scss'

interface FieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'form'>, Partial<FormContext> {
	label?: string
	labelText?: string
	form?: Form
}

export const Field: FC<FieldProps> = props => {
	const { className, children, form, label, labelText, labelWidth, labelAlign, labelSuffix, ...rest } = props

	const formCtx = useContext(FormCtx)
	const update = useUpdate()

	const _form = form ?? formCtx.form
	let controller: any
	if (label && _form) {
		controller = _form.subscribe(label)
	}

	const labelAttrs = {
		width: labelWidth ?? formCtx.labelWidth ?? 200,
		align: labelAlign ?? formCtx.labelAlign ?? 'left',
		suffix: labelSuffix ?? formCtx.labelSuffix ?? ''
	}

	const onFieldValueChange = (...args: any[]) => {
		controller?.onChange(...args)
		update()
	}

	const prefixCls = `${UI_PREFIX}-field`
	const wrapCls = cls(className, prefixCls, `${prefixCls}-align-${labelAttrs.align}`)

	return (
		<label className={wrapCls} {...rest}>
			<div
				className={`${prefixCls}-label`}
				style={{
					width: labelAttrs.width
				}}
			>
				{labelText}
				{labelAttrs.suffix}
			</div>
			<div className={`${prefixCls}-control`}>
				<div className={`${prefixCls}-control-inner`}>
					{isValidElement(children) &&
						cloneElement(children, {
							...controller,
							onChange: onFieldValueChange
						})}
				</div>
				{/* <div className={`${prefixCls}-message`}>is required</div> */}
			</div>
		</label>
	)
}
