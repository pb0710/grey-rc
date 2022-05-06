import { FC, HTMLAttributes } from 'react'
import { IconProps } from '@mdi/react/dist/IconProps'
import './icon.scss'
declare const Icon: FC<
	IconProps &
		HTMLAttributes<HTMLSpanElement> & {
			canHover?: boolean
			round?: boolean
			bgColor?: string
		}
>
export default Icon
