import React, { FC, HTMLAttributes } from 'react'
import _Icon from '@mdi/react'
import { IconProps } from '@mdi/react/dist/IconProps'
import { cls } from 'gray-utils'
import './classes/icon.scss'

export const Icon: FC<IconProps & HTMLAttributes<HTMLSpanElement>> = props => {
	const { className } = props
	return (
		<span className={cls('g-icon', className)}>
			<_Icon {...props} />
		</span>
	)
}
