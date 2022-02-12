import React, { ButtonHTMLAttributes, FC, ReactElement } from 'react'
import { cls } from 'gray-utils'
import './classes/button.scss'
import { mdiLoading } from '@mdi/js'
import { Icon } from '../..'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	block?: boolean
	primary?: boolean
	round?: boolean
	circle?: boolean
	loading?: boolean
	disable?: boolean
	icon?: ReactElement
}

export const Button: FC<ButtonProps> = props => {
	const {
		children,
		className,
		type = 'button',
		block = false,
		primary = false,
		round = false,
		circle = false,
		loading = false,
		disable = false,
		icon = null,
		...rest
	} = props

	const loadEle = <Icon path={mdiLoading} spin={1} size="16px"></Icon>
	return (
		<button
			className={cls('g-button', className, {
				'g-primary': primary,
				'g-block': block,
				'g-round': round,
				'g-circle': circle,
				'g-disable': disable || loading
			})}
			type={type}
			{...rest}
		>
			{loading ? (
				circle ? (
					loadEle
				) : (
					<>
						{loadEle}
						<span className="g-text">{children}</span>
					</>
				)
			) : icon ? (
				<>
					{icon}
					<span className="g-text">{children}</span>
				</>
			) : (
				children
			)}
		</button>
	)
}
