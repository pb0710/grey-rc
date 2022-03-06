import React, { FC, HTMLAttributes } from 'react'
import _Icon from '@mdi/react'
import { IconProps } from '@mdi/react/dist/IconProps'
import { cls } from 'gray-utils'
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
		bgColor = 'inherit',
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
		style,
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
		<span
			className={cls('g-icon', className, {
				'g-icon-can-hover': canHover,
				'g-icon-round': round
			})}
			style={{ ...style, backgroundColor: bgColor }}
			{...rest}
		>
			<_Icon {...iconProps} />
		</span>
	)
}
export default Icon
