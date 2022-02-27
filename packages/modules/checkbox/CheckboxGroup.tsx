import { cls, is } from 'gray-utils'
import React, {
	Children,
	cloneElement,
	FC,
	HTMLAttributes,
	isValidElement,
	ReactNode,
	ReactText
} from 'react'
import Checkbox, { CheckboxProps } from '.'
import Space from '../basic/Space'
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

const CheckboxGroup: FC<CheckboxGroupProps> = props => {
	const {
		children,
		className,
		direction = 'horizontal',
		options = [],
		disabled = false,
		defaultValue = [],
		value = [],
		onChange,
		...rest
	} = props

	const getHandleSubChange = (label?: ReactText) => (subValue: boolean) => {
		if (is.undefined(label)) return

		let nextValue = value
		const hasChecked = value.includes(label)
		if (subValue) {
			if (!hasChecked) {
				nextValue.push(label)
			}
		} else {
			if (hasChecked) {
				nextValue = nextValue.filter(item => item !== label)
			}
		}
		onChange?.(nextValue)
	}

	const isControlled = value.length > 0
	const getValueProps = (label?: ReactText) => {
		if (is.undefined(label)) return

		return isControlled
			? { value: value.includes(label), defaultValue: defaultValue.includes(label) }
			: { defaultValue: defaultValue.includes(label) }
	}

	return (
		<div
			className={cls('g-checkbox-group', className, {
				'g-checkbox-group-disabled': disabled
			})}
			{...rest}
		>
			<Space direction={direction}>
				{options.map(option => {
					return (
						<Checkbox
							key={option.label}
							label={option.label}
							disabled={disabled || option.disabled}
							onChange={getHandleSubChange(option.label) as any}
							{...getValueProps(option.label)}
						>
							{option.child}
						</Checkbox>
					)
				})}
				{Children.map(children, child =>
					isValidElement<CheckboxProps>(child)
						? cloneElement(child, {
								disabled: disabled || child.props.disabled,
								onChange: getHandleSubChange(child.props.label) as any,
								...getValueProps(child.props.label)
						  })
						: child
				)}
			</Space>
		</div>
	)
}

export default CheckboxGroup
