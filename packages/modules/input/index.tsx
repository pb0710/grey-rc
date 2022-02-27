import { mdiCloseCircle } from '@mdi/js'
import { cls, is } from 'gray-utils'
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	HTMLAttributes,
	MutableRefObject,
	ReactNode,
	ReactText,
	useEffect,
	useRef,
	useState
} from 'react'
import Icon from '../basic/Icon'
import './input.scss'
import Textarea from './Textarea'

interface InputProps extends Omit<HTMLAttributes<HTMLInputElement>, 'maxLength' | 'onChange' | 'prefix'> {
	value?: ReactText
	block?: boolean
	round?: boolean
	disabled?: boolean
	prefix?: ReactNode
	suffix?: ReactNode
	allowClear?: boolean
	onChange?: ChangeEventHandler<HTMLInputElement> & ((value: ReactText) => void)
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardRef) => {
	const {
		className,
		defaultValue,
		value,
		onFocus,
		onBlur,
		onChange,
		prefix,
		suffix,
		block = false,
		round = false,
		disabled = false,
		allowClear = false,
		...rest
	} = props
	const ref = useRef<HTMLInputElement>(null)
	const inputRef = (forwardRef ?? ref) as MutableRefObject<HTMLInputElement>
	const [focus, setFocus] = useState(false)
	const isControlled = !is.undefined(value)
	const [clearVisible, setClearVisible] = useState(false)
	const handleFocus: FocusEventHandler<HTMLInputElement> = e => {
		onFocus?.(e)
		setFocus(true)
	}
	const handleBlur: FocusEventHandler<HTMLInputElement> = e => {
		onBlur?.(e)
		setFocus(false)
	}
	const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
		if (isControlled) onChange?.(e.target.value)
		else onChange?.(e)

		setClearVisible(!!e.target.value)
	}
	const handleClear = () => {
		inputRef.current.value = ''
		setClearVisible(false)
		// nextTick
		setTimeout(() => {
			inputRef.current.focus()
		})
	}

	useEffect(() => {
		if (defaultValue) {
			setClearVisible(true)
		}
	}, [defaultValue])

	const valueProps = isControlled && { value }
	return (
		<label
			className={cls('g-input', className, {
				'g-input-focus': focus,
				'g-input-block': block,
				'g-input-round': round,
				'g-input-disabled': disabled
			})}
		>
			{prefix}
			<input
				{...rest}
				{...valueProps}
				defaultValue={defaultValue}
				disabled={disabled}
				className="g-input-inner"
				ref={inputRef}
				type="text"
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
			{allowClear && focus && clearVisible && (
				<Icon path={mdiCloseCircle} color="#999" onMouseDown={handleClear} />
			)}
			{suffix}
		</label>
	)
})

const ExportInput = Input as typeof Input & {
	Textarea: typeof Textarea
}
ExportInput.Textarea = Textarea

export default ExportInput
