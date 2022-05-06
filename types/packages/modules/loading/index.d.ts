import { FC, HTMLAttributes, ReactNode } from 'react'
import './loading.scss'
interface LoadingProps extends HTMLAttributes<HTMLElement> {
	spinning?: boolean
	size?: 'inherit' | 'small' | 'medium' | 'large'
	icon?: ReactNode
	description?: ReactNode
}
declare const Loading: FC<LoadingProps>
export default Loading
