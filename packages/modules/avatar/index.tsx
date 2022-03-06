import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes, ReactEventHandler, ReactNode, SyntheticEvent, useState } from 'react'
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

const Avatar: FC<AvatarProps> = props => {
	const {
		children,
		className,
		size = 'medium',
		src,
		round = true,
		color = '#ccc',
		fallback,
		badge,
		style,
		onError,
		...rest
	} = props

	const [error, setError] = useState<SyntheticEvent<HTMLImageElement, Event>>()
	const imgEle = error ? (
		fallback
	) : (
		<img
			className="g-avatar-img"
			src={src}
			onError={err => {
				onError?.(err)
				setError(err)
			}}
		/>
	)

	return (
		<div
			className={cls(className, 'g-avatar', `g-avatar-${size}`, {
				'g-avatar-round': round
			})}
			style={{ ...style, backgroundColor: color }}
			{...rest}
		>
			{children || imgEle}
			{badge && <div className="g-avatar-badge">{badge}</div>}
		</div>
	)
}

const ExportAvatar = Avatar as typeof Avatar & {
	Group: typeof AvatarGroup
}
ExportAvatar.Group = AvatarGroup

export default ExportAvatar
