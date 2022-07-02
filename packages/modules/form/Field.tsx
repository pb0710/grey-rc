import React, { cloneElement, forwardRef, HTMLAttributes, isValidElement, LabelHTMLAttributes, useContext } from 'react'
import { useUpdate, Form, FieldController } from 'grey-rh'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import { FormContext, FormCtx } from './FormCtx'
import './field.scss'

interface FieldProps
	extends Omit<LabelHTMLAttributes<HTMLLabelElement> & HTMLAttributes<HTMLDivElement>, 'form'>,
		Partial<FormContext> {
	label?: string
	labelText?: string
	form?: Form
}

const Field = forwardRef<HTMLLabelElement & HTMLDivElement, FieldProps>((props, outerRef) => {
	const { className, children, form, label, labelText, labelWidth, labelAlign, labelSuffix, ...rest } = props

	const formCtx = useContext(FormCtx)
	const update = useUpdate()

	const _form = form ?? formCtx.form
	let controller: FieldController | null = null
	if (label && _form) {
		controller = _form.subscribe(label)
	}

	const labelAttrs = {
		width: labelWidth ?? formCtx.labelWidth ?? 200,
		align: labelAlign ?? formCtx.labelAlign ?? 'left',
		suffix: labelSuffix ?? formCtx.labelSuffix ?? ''
	}

	const onFieldValueChange = (arg: unknown) => {
		controller?.onChange(arg)
		update()
	}

	const prefixCls = `${UI_PREFIX}-field`
	const wrapCls = cls(className, prefixCls, `${prefixCls}-align-${labelAttrs.align}`)

	return (
		<div ref={outerRef} className={wrapCls} {...rest}>
			<label
				className={`${prefixCls}-label`}
				style={{
					width: labelAttrs.width
				}}
			>
				{labelText}
				{labelAttrs.suffix}
			</label>
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
		</div>
	)
})

export default Field
