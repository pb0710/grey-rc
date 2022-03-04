import React, { ButtonHTMLAttributes, forwardRef, ReactElement } from 'react'
import { cls } from 'gray-utils'
import './button.scss'
import Loading from '../loading'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	block?: boolean
	primary?: boolean
	round?: boolean
	circle?: boolean
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
		loading = false,
		disabled = false,
		icon = null,
		...rest
	} = props

	const loadEle = <Loading size="inherit" style={{ color: 'inherit' }} />
	return (
		<button
			className={cls('g-button', className, {
				'g-button-primary': primary,
				'g-button-block': block,
				'g-button-round': round,
				'g-button-circle': circle,
				'g-button-disabled': disabled || loading
			})}
			ref={ref}
			type={type}
			{...rest}
		>
			{loading ? (
				circle ? (
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
