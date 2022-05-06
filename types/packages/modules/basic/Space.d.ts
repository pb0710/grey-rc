import { FC, HTMLAttributes } from 'react'
import './space.scss'
interface SpaceProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	align?: 'start' | 'end' | 'center' | 'baseline'
	direction?: 'horizontal' | 'vertical'
	block?: boolean
}
declare const Space: FC<SpaceProps>
export default Space
