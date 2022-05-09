import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
	MutableRefObject,
	ReactText,
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
	block?: boolean
	disabled?: boolean
	value?: ReactText
	onChange?: ChangeEventHandler<HTMLTextAreaElement> & ((value?: ReactText) => void)
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, outerRef) => {
	const {
		className,
		autosize = false,
		block = false,
		disabled = false,
		rows = 2,
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

	const valueProps = isControlled ? { value } : {}
	const TextareaComp = autosize ? TextareaAutosize : 'textarea'

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
				{...rest}
				className={`${prefixCls}-inner`}
				ref={textareaRef}
				disabled={disabled}
				defaultValue={defaultValue}
				onChange={handleChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
				rows={rows}
			></TextareaComp>
		</label>
	)
})

export default Textarea
