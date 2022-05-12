import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	MutableRefObject,
	TextareaHTMLAttributes,
	useRef,
	useState
} from 'react'
import { cls, is } from 'grey-utils'
import './textarea.scss'
import TextareaAutosize from 'react-textarea-autosize'
import { UI_PREFIX } from '../../constants'

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'style'> {
	autosize?: boolean
	minRows?: number
	maxRows?: number
	block?: boolean
	disabled?: boolean
	value?: string | number
	onChange?: ChangeEventHandler<HTMLTextAreaElement> & ((value?: string | number) => void)
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, outerRef) => {
	const {
		className,
		autosize = false,
		block = false,
		disabled = false,
		minRows = 1,
		maxRows = Infinity,
		defaultValue,
		value,
		onChange,
		onFocus,
		onBlur,
		...rest
	} = props

	const innerRef = useRef<HTMLTextAreaElement>(null)
	const textareaRef = (outerRef || innerRef) as MutableRefObject<null>
	const [focus, setFocus] = useState(false)
	const isControlled = !is.undefined(value)

	const handleChange: ChangeEventHandler<HTMLTextAreaElement> = e => {
		if (isControlled) onChange?.(e.target.value)
		else onChange?.(e)
	}

	const handleFocus: FocusEventHandler<HTMLTextAreaElement> = e => {
		onFocus?.(e)
		setFocus(true)
	}

	const handleBlur: FocusEventHandler<HTMLTextAreaElement> = e => {
		onBlur?.(e)
		setFocus(false)
	}

	const TextareaComp = autosize ? TextareaAutosize : 'textarea'
	const valueProps = isControlled ? { value } : { defaultValue }
	const autosizeProps = autosize ? { minRows, maxRows } : {}

	const prefixCls = `${UI_PREFIX}-textarea`

	return (
		<label
			className={cls(className, prefixCls, {
				[`${prefixCls}-focus`]: focus,
				[`${prefixCls}-block`]: block,
				[`${prefixCls}-disabled`]: disabled
			})}
		>
			<TextareaComp
				{...valueProps}
				{...autosizeProps}
				{...rest}
				className={`${prefixCls}-inner`}
				ref={textareaRef}
				disabled={disabled}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			></TextareaComp>
		</label>
	)
})

export default Textarea
