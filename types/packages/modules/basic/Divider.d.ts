import { FC, HTMLAttributes } from 'react'
import './divider.scss'
interface DividerProps extends HTMLAttributes<HTMLDivElement> {
	size?: 'small' | 'medium' | 'large'
	direction?: 'horizontal' | 'vertical'
}
declare const Divider: FC<DividerProps>
export default Divider
