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
import { UI_PREFIX } from '../../constants'
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

	const prefixCls = `${UI_PREFIX}-radio`

	const checkedProps = isControlled ? { checked } : { defaultChecked: defaultValue }
	const isTab = type === 'tab'
	const radioCls = isTab
		? cls(className, `${prefixCls}-tab`, {
				[`${prefixCls}-tab-disabled`]: disabled,
				[`${prefixCls}-tab-checked`]: checked
		  })
		: cls(className, prefixCls, {
				[`${prefixCls}-disabled`]: disabled,
				[`${prefixCls}-checked`]: checked
		  })

	return (
		<label className={radioCls}>
			<input
				{...rest}
				{...checkedProps}
				hidden
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={radioRef}
				type="radio"
				onChange={handleChange}
			/>
			{!isTab && <div className={`${prefixCls}-icon`}></div>}
			{children}
		</label>
	)
})

const ExportRadio = Radio as typeof Radio & {
	Group: typeof RadioGroup
}
ExportRadio.Group = RadioGroup

export default ExportRadio
