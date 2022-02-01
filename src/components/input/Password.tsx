import { mdiEyeOffOutline, mdiEyeOutline } from '@mdi/js'
import React, { FC, useState } from 'react'
import { Icon } from '../..'
import { InputBase, InputBaseProps } from './InputBase'

interface PasswordProps extends Omit<InputBaseProps, 'type' | 'suffix'> {
	visibilityToggle?: boolean
}

export const Password: FC<PasswordProps> = props => {
	const { visibilityToggle = true, ...rest } = props
	const [visible, setVisible] = useState(false)
	return (
		<InputBase
			type={visible ? 'text' : 'password'}
			suffix={
				visibilityToggle ? (
					<Icon
						path={visible ? mdiEyeOutline : mdiEyeOffOutline}
						onClick={() => setVisible(pre => !pre)}
						size="16px"
						color="#333"
					/>
				) : (
					<></>
				)
			}
			{...rest}
		/>
	)
}
