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
import './switch.scss'

interface SwitchProps
	extends Omit<
		InputHTMLAttributes<HTMLElement>,
		'defaultValue' | 'value' | 'onChange' | 'checked' | 'defaultChecked'
	> {
	disabled?: boolean
	defaultValue?: boolean
	value?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value?: boolean) => void)
}

const Switch = forwardRef<HTMLInputElement, SwitchProps>((props, outerRef) => {
	const {
		className,
		disabled = false,
		defaultValue = false,
		value = defaultValue,
		onChange,
		...rest
	} = props
	const innerRef = useRef<HTMLInputElement>(null)
	const switchRef = (outerRef ?? innerRef) as MutableRefObject<HTMLInputElement>
	const [checked, setChecked] = useState(defaultValue)
	const isControlled = !is.undefined(value)

	useEffect(() => {
		if (isControlled) setChecked(value)
	}, [isControlled, value])

	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		setChecked(e.target.checked)
		if (isControlled) onChange?.(e.target.checked)
		else onChange?.(e)
	}

	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }
	return (
		<label
			className={cls('g-switch', className, {
				'g-switch-disabled': disabled,
				'g-switch-checked': checked
			})}
		>
			<input
				className="g-inner"
				ref={switchRef}
				type="checkbox"
				hidden
				disabled={disabled}
				onChange={handleChange}
				{...checkedProps}
				{...rest}
			/>
		</label>
	)
})

export default Switch
