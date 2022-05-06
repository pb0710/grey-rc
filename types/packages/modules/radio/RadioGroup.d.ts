import { FC, HTMLAttributes, ReactNode, ReactText } from 'react'
import './radio-group.scss'
interface RadioGroup extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	defaultValue?: ReactText
	value?: ReactText
	options?: {
		label: ReactText
		child: ReactNode
		disabled?: boolean
	}[]
	direction?: 'horizontal' | 'vertical'
	disabled?: boolean
	type?: 'default' | 'tab'
	onChange?: (value: ReactText) => void
}
declare const RadioGroup: FC<RadioGroup>
export default RadioGroup
