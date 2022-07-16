import { cls, is } from 'grey-utils'
import React, {
	ChangeEventHandler,
	forwardRef,
	InputHTMLAttributes,
	MutableRefObject,
	useEffect,
	useRef,
	useState
} from 'react'
import './checkbox.scss'
import { mdiCheckBold } from '@mdi/js'
import Icon from '../icon'
import CheckboxGroup from './CheckboxGroup'
import { UI_PREFIX } from '../../constants'

export interface CheckboxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value' | 'size'
	> {
	size?: 'small' | 'medium' | 'large'
	label?: string | number
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, outerRef) => {
	const {
		className,
		children,
		size = 'medium',
		value,
		onChange,
		disabled = false,
		defaultValue = false,
		...rest
	} = props

	const isControlled = !is.undefined(value)

	const ref = useRef<HTMLInputElement>(null)
	const checkboxRef = (outerRef ?? ref) as MutableRefObject<HTMLInputElement>
	const [checked, setChecked] = useState(isControlled ? value : defaultValue)

	useEffect(() => {
		if (isControlled) setChecked(value)
	}, [isControlled, value])

	const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
		setChecked(event.target.checked)
		if (isControlled) {
			onChange?.(event.target.checked)
		} else {
			onChange?.(event)
		}
	}

	const prefixCls = `${UI_PREFIX}-checkbox`
	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }

	let iconSize = 13
	if (size === 'small') iconSize = 10
	else if (size === 'medium') iconSize = 13
	else if (size === 'large') iconSize = 16

	return (
		<label
			className={cls(className, prefixCls, `${prefixCls}-${size}`, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
			})}
		>
			<input
				{...rest}
				{...checkedProps}
				hidden
				disabled={disabled}
				className={`${prefixCls}-input`}
				ref={checkboxRef}
				type="checkbox"
				onChange={handleChange}
			/>
			<div className={`${prefixCls}-icon`}>
				<Icon className={`${prefixCls}-icon-inner`} path={mdiCheckBold} size={`${iconSize}px`} />
			</div>
			{children}
		</label>
	)
})

const ExportCheckbox = Checkbox as typeof Checkbox & {
	Group: typeof CheckboxGroup
}
ExportCheckbox.Group = CheckboxGroup

export default ExportCheckbox
