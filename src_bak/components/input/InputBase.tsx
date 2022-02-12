import { cls } from 'gray-utils'
import React, { createElement, FC, HTMLAttributes, ReactElement, useState } from 'react'
import './classes/input-base.scss'
import { mdiCloseCircle } from '@mdi/js'
import { Icon } from '../..'

export interface InputBaseProps
	extends Omit<HTMLAttributes<HTMLInputElement | HTMLTextAreaElement>, 'prefix' | 'onChange'> {
	component?: 'input' | 'textarea'
	value?: string
	onChange?(value: string): void
	type?: string
	defaultValue?: string
	block?: boolean
	round?: boolean
	disabled?: boolean
	canBeClear?: boolean
	onClear?(): void
	onEnter?(): void
	prefix?: ReactElement
	suffix?: ReactElement
}

export const InputBase: FC<InputBaseProps> = props => {
	const {
		component = 'input',
		className,
		block = false,
		round = false,
		disabled = false,
		canBeClear = false,
		type = 'text',
		defaultValue = '',
		value = defaultValue,
		prefix,
		suffix,
		onChange,
		onFocus,
		onBlur,
		onClear,
		onEnter,
		onKeyDown,
		...rest
	} = props
	const [focus, setFocus] = useState(false)
	const onClearContent = () => {
		onChange?.('')
		onClear?.()
	}
	// ts 签名错误推断 'textarea' => HTMLElement
	// 应该是 'textarea' => HTMLTextareaElement
	// 所以 转换为 'input' => HTMLInputElement 绕过此类型检查
	const inputBaseEle = createElement(component as 'input', {
		className: 'g-input-inner',
		type,
		disabled,
		value,
		onChange: e => onChange?.(e.target.value),
		onFocus: e => {
			setFocus(true)
			onFocus?.(e)
		},
		onBlur: e => {
			setFocus(false)
			onBlur?.(e)
		},
		onKeyDown: e => {
			if (e.key === 'Enter') onEnter?.()
			onKeyDown?.(e)
		},
		...rest
	})
	const clearIconEle = (
		<Icon
			path={mdiCloseCircle}
			size="14px"
			color="#999"
			onClick={onClearContent}
			onMouseDown={e => {
				e.preventDefault()
			}}
		/>
	)
	return (
		<div
			className={cls('g-input-base', className, {
				'g-block': block,
				'g-focus': focus,
				'g-round': round,
				'g-disabled': disabled
			})}
		>
			{prefix}
			{inputBaseEle}
			{component === 'input' && canBeClear && value && clearIconEle}
			{suffix}
		</div>
	)
}
