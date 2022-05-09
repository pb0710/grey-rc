import { mdiCloseCircle } from '@mdi/js'
import { cls, is } from 'grey-utils'
import React, {
	ChangeEvent,
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	HTMLAttributes,
	MouseEventHandler,
	MutableRefObject,
	ReactNode,
	ReactText,
	useEffect,
	useRef,
	useState
} from 'react'
import { UI_PREFIX } from '../../constants'
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
		const { value } = e.target

		if (isControlled) onChange?.(value)
		else onChange?.(e)

		setClearVisible(!!value)
	}
	const handleClear = () => {
		if (isControlled) onChange?.('')
		else {
			inputRef.current.value = ''
			onChange?.({ target: inputRef.current } as ChangeEvent<HTMLInputElement>)
		}
		setClearVisible(false)
	}

	const handleMouseDown: MouseEventHandler<HTMLElement> = e => {
		if (e.target instanceof Element) {
			if (e.target.tagName !== 'INPUT') e.preventDefault()
		}
	}

	useEffect(() => {
		if (defaultValue) setClearVisible(true)
	}, [defaultValue])

	const prefixCls = `${UI_PREFIX}-input`

	const valueProps = isControlled && { value }

	return (
		<label
			className={cls(className, prefixCls, {
				[`${prefixCls}-focus`]: focus,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-disabled`]: disabled
			})}
		>
			{prefix}
			<input
				{...rest}
				{...valueProps}
				defaultValue={defaultValue}
				disabled={disabled}
				className={`${prefixCls}-inner`}
				ref={inputRef}
				type="text"
				onFocus={handleFocus}
				onBlur={handleBlur}
				onChange={handleChange}
			/>
			{allowClear && focus && clearVisible && (
				<Icon
					path={mdiCloseCircle}
					color="#999"
					onClick={handleClear}
					onMouseDown={handleMouseDown}
				/>
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
