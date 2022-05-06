import { cls, is } from 'grey-utils'
import React, {
	ChangeEventHandler,
	forwardRef,
	InputHTMLAttributes,
	MutableRefObject,
	ReactText,
	useEffect,
	useRef,
	useState
} from 'react'
import './radio.scss'
import RadioGroup from './RadioGroup'

export interface RadioProps
	extends Omit<
		InputHTMLAttributes<HTMLInputElement>,
		'onChange' | 'defaultValue' | 'defaultChecked' | 'checked' | 'value'
	> {
	value?: boolean
	disabled?: boolean
	type?: 'default' | 'tab'
	label?: ReactText
	defaultValue?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: boolean) => void)
}

const Radio = forwardRef<HTMLInputElement, RadioProps>((props, outerRef) => {
	const {
		className,
		children,
		value,
		onChange,
		disabled = false,
		defaultValue = false,
		type = 'default',
		...rest
	} = props

	const innerRef = useRef<HTMLInputElement>(null)
	const radioRef = (outerRef ?? innerRef) as MutableRefObject<HTMLInputElement>
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

	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }
	const isTab = type === 'tab'
	const radioCls = isTab
		? cls('g-radio-tab', className, {
				'g-radio-tab-disabled': disabled,
				'g-radio-tab-checked': checked
		  })
		: cls('g-radio', className, {
				'g-radio-disabled': disabled,
				'g-radio-checked': checked
		  })

	return (
		<label className={radioCls}>
			<input
				{...rest}
				{...checkedProps}
				hidden
				disabled={disabled}
				className="g-radio-inner"
				ref={radioRef}
				type="radio"
				onChange={handleChange}
			/>
			{!isTab && <div className="g-radio-icon"></div>}
			{children}
		</label>
	)
})

const ExportRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup
}
ExportRadio.Group = RadioGroup

export default ExportRadio
