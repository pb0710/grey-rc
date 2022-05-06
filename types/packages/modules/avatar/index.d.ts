import React, { HTMLAttributes, ReactEventHandler, ReactNode } from 'react'
import './avatar.scss'
import AvatarGroup from './avatarGroup'
export interface AvatarProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	round?: boolean
	color?: string
	src?: string
	fallback?: ReactNode
	badge?: ReactNode
	onError?: ReactEventHandler<HTMLImageElement>
}
declare const ExportAvatar: React.FC<AvatarProps> & {
	Group: typeof AvatarGroup
}
export default ExportAvatar
