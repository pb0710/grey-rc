import React, { cloneElement, FC, isValidElement, LabelHTMLAttributes, useContext } from 'react'
import { useUpdate, Form } from 'grey-rh'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import { FormContext, FormCtx } from './formCtx'

interface FieldProps extends Omit<LabelHTMLAttributes<HTMLLabelElement>, 'form'>, Partial<FormContext> {
	label: string
	labelText?: string
	form?: Form
}

export const Field: FC<FieldProps> = props => {
	const {
		className,
		children,
		form,
		label,
		labelText,
		labelWidth,
		labelAlign,
		labelSuffix,
		style,
		...rest
	} = props

	const formCtx = useContext(FormCtx)
	const update = useUpdate()

	const _form = form ?? formCtx.form
	const controller = _form?.subscribe(label, {})

	const labelAttr = {
		width: labelWidth ?? formCtx.labelWidth ?? 240,
		align: labelAlign ?? formCtx.labelAlign ?? 'right',
		suffix: labelSuffix ?? formCtx.labelSuffix ?? ':'
	}

	const onFieldValueChange = (...args: any[]) => {
		controller?.onChange(...args)
		update()
	}

	const prefixCls = `${UI_PREFIX}-field`
	const wrapCls = cls(className, prefixCls, `${prefixCls}-algin-${labelAttr.align}`)

	return (
		<label
			className={wrapCls}
			style={{
				...style,
				width: labelAttr.width
			}}
			{...rest}
		>
			<div className={`${prefixCls}-label`}>
				{labelText}
				{labelAttr.suffix}
			</div>
			<div className={`${prefixCls}-controller`}>
				<div className={`${prefixCls}-controller-inner`}>
					{isValidElement(children) &&
						cloneElement(children, {
							...controller,
							onChange: onFieldValueChange
						})}
				</div>
				<div className={`${prefixCls}-message`}></div>
			</div>
		</label>
	)
}
