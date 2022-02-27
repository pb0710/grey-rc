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
import Radio, { RadioProps } from '.'
import Space from '../basic/Space'
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

const RadioGroup: FC<RadioGroup> = props => {
	const {
		children,
		className,
		direction = 'horizontal',
		type = 'default',
		options = [],
		disabled = false,
		defaultValue,
		value,
		onChange,
		...rest
	} = props

	const getHandleSubChange = (label?: ReactText) => (subValue: boolean) => {
		if (is.undefined(label)) return
		if (subValue) {
			onChange?.(label)
		}
	}

	const isControlled = !is.undefined(value)
	const isTab = type === 'tab'
	const getValueProps = (label?: ReactText) => {
		if (is.undefined(label)) return

		return isControlled
			? { value: value === label, defaultValue: defaultValue === label }
			: { defaultValue: defaultValue === label }
	}

	return (
		<div
			className={cls('g-radio-group', className, {
				'g-radio-group-disabled': disabled,
				'g-radio-group-tab': isTab
			})}
			{...rest}
		>
			<Space direction={direction} style={{ gap: isTab ? 2 : 12, background: 'inherit' }}>
				{options.map(option => {
					return (
						<Radio
							key={option.label}
							label={option.label}
							type={type}
							disabled={disabled || option.disabled}
							onChange={getHandleSubChange(option.label) as any}
							{...getValueProps(option.label)}
						>
							{option.child}
						</Radio>
					)
				})}
				{Children.map(children, child =>
					isValidElement<RadioProps>(child)
						? cloneElement(child, {
								type,
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

export default RadioGroup
