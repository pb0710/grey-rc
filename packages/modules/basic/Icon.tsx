import React, { FC, HTMLAttributes } from 'react'
import _Icon from '@mdi/react'
import { IconProps } from '@mdi/react/dist/IconProps'
import { cls } from 'grey-utils'
import './icon.scss'

const Icon: FC<
	IconProps &
		HTMLAttributes<HTMLSpanElement> & {
			canHover?: boolean
			round?: boolean
			bgColor?: string
		}
> = props => {
	const {
		className,
		canHover = false,
		round = false,
		size = '14px',
		color = 'currentColor',
		path,
		rotate,
		spin,
		title,
		horizontal,
		vertical,
		description,
		ref,
		...rest
	} = props

	const iconProps = {
		size,
		color,
		path,
		rotate,
		spin,
		title,
		horizontal,
		vertical,
		description,
		ref
	}
	return (
		<div
			className={cls('g-icon', className, {
				'g-icon-can-hover': canHover,
				'g-icon-round': round
			})}
			{...rest}
		>
			<_Icon {...iconProps} />
		</div>
	)
}
export default Icon
