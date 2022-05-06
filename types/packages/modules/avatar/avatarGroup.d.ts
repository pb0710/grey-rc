import { FC, HTMLAttributes } from 'react'
import './avatar-group.scss'
interface AvatarGroupProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	overlapFrom?: 'left' | 'right'
}
declare const AvatarGroup: FC<AvatarGroupProps>
export default AvatarGroup
