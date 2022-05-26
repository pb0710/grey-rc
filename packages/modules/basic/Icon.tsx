import React, { forwardRef, HTMLAttributes } from 'react'
import MdiIcon from '@mdi/react'
import { IconProps as MdiIconProps } from '@mdi/react/dist/IconProps'
import { cls } from 'grey-utils'
import './icon.scss'
import { UI_PREFIX } from '../../constants'

interface IconProps extends MdiIconProps, Omit<HTMLAttributes<HTMLDivElement>, 'color' | 'title'> {
	canHover?: boolean
	round?: boolean
	bgColor?: string
}

const Icon = forwardRef<HTMLDivElement, IconProps>((props, outerRef) => {
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

	const midIconProps = {
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
	const prefixCls = `${UI_PREFIX}-icon`

	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-can-hover`]: canHover,
				[`${prefixCls}-round`]: round
			})}
			{...rest}
		>
			<MdiIcon {...midIconProps} />
		</div>
	)
})

export default Icon
