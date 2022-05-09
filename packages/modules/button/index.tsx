import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react'
import { cls } from 'grey-utils'
import './button.scss'
import Loading from '../loading'
import { UI_PREFIX } from '../../constants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	block?: boolean
	primary?: boolean
	round?: boolean
	circle?: boolean
	square?: boolean
	loading?: boolean
	disabled?: boolean
	icon?: ReactElement
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
	const {
		children,
		className,
		type = 'button',
		block = false,
		primary = false,
		round = false,
		circle = false,
		square = false,
		loading = false,
		disabled = false,
		icon = null,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-button`
	const loadEle = <Loading size="inherit" style={{ color: 'inherit' }} />

	return (
		<button
			className={cls(className, prefixCls, {
				[`${prefixCls}-primary`]: primary,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-circle`]: circle,
				[`${prefixCls}-square`]: square,
				[`${prefixCls}-disabled`]: disabled || loading
			})}
			ref={ref}
			type={type}
			{...rest}
		>
			{loading ? (
				circle || square ? (
					loadEle
				) : (
					<>
						{loadEle}
						{children}
					</>
				)
			) : icon ? (
				<>
					{icon}
					{children}
				</>
			) : (
				children
			)}
		</button>
	)
})

export default Button
