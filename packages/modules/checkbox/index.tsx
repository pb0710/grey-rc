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
import Icon from '../basic/Icon'
import CheckboxGroup from './CheckboxGroup'
import { UI_PREFIX } from '../../constants'

export interface CheckboxProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value'
	> {
	label?: string | number
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, forwardRef) => {
	const { className, children, value, onChange, disabled = false, defaultValue = false, ...rest } = props
	const ref = useRef<HTMLInputElement>(null)
	const checkboxRef = (forwardRef ?? ref) as MutableRefObject<HTMLInputElement>
	const [checked, setChecked] = useState(defaultValue)
	const isControlled = !is.undefined(value)

	useEffect(() => {
		if (isControlled) setChecked(value)
	}, [isControlled, value])

	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		setChecked(e.target.checked)
		if (isControlled) {
			onChange?.(e.target.checked)
		} else {
			onChange?.(e)
		}
	}

	const prefixCls = `${UI_PREFIX}-checkbox`
	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }

	return (
		<label
			className={cls(className, prefixCls, {
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
				<Icon className={`${prefixCls}-icon-inner`} path={mdiCheckBold} size="13px" />
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
