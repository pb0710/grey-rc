import { FC, HTMLAttributes, ReactNode, ReactText } from 'react'
import './checkbox-group.scss'
interface CheckboxGroupProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	defaultValue?: ReactText[]
	value?: ReactText[]
	options?: {
		label: ReactText
		child: ReactNode
		disabled?: boolean
	}[]
	direction?: 'horizontal' | 'vertical'
	disabled?: boolean
	onChange?: (value: ReactText[]) => void
}
declare const CheckboxGroup: FC<CheckboxGroupProps>
export default CheckboxGroup
