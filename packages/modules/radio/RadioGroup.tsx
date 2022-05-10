import { cls, is } from 'grey-utils'
import React, {
	ChangeEvent,
	Children,
	cloneElement,
	FC,
	HTMLAttributes,
	isValidElement,
	ReactNode
} from 'react'
import Radio, { RadioProps } from '.'
import { UI_PREFIX } from '../../constants'
import Space from '../basic/Space'
import './radio-group.scss'

interface RadioGroup extends Omit<HTMLAttributes<HTMLElement>, 'onChange' | 'defaultValue'> {
	defaultValue?: string | number
	value?: string | number
	options?: {
		label: string | number
		child: ReactNode
		disabled?: boolean
	}[]
	direction?: 'horizontal' | 'vertical'
	disabled?: boolean
	type?: 'default' | 'tab'
	onChange?: (value: string | number) => void
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
		value = defaultValue,
		onChange,
		...rest
	} = props

	const getHandleSubChange =
		(label?: string | number) => (subParam: boolean | ChangeEvent<HTMLInputElement>) => {
			if (is.undefined(label)) return

			const subChecked = is.boolean(subParam) ? subParam : subParam.target.checked
			if (subChecked) {
				onChange?.(label)
			}
		}

	const prefixCls = `${UI_PREFIX}-radio-group`

	const isTab = type === 'tab'
	const getValueProps = (label?: string | number) => {
		if (is.undefined(label)) return

		return {
			value: value === label,
			defaultValue: defaultValue === label
		}
	}

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-tab`]: isTab
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
							onChange={getHandleSubChange(option.label)}
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
								onChange: getHandleSubChange(child.props.label),
								...getValueProps(child.props.label)
						  })
						: child
				)}
			</Space>
		</div>
	)
}

export default RadioGroup
