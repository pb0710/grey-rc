import React, { FC, HTMLAttributes } from 'react'
import _Icon from '@mdi/react'
import { IconProps } from '@mdi/react/dist/IconProps'
import { cls } from 'gray-utils'
import './icon.scss'

const Icon: FC<
	IconProps &
		HTMLAttributes<HTMLSpanElement> & {
			canHover?: boolean
		}
> = props => {
	const {
		className,
		canHover = false,
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
		<span
			className={cls('g-icon', className, {
				'g-icon-can-hover': canHover
			})}
			{...rest}
		>
			<_Icon {...iconProps} />
		</span>
	)
}
export default Icon
