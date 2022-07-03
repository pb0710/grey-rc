import React, {
	Children,
	forwardRef,
	HTMLAttributes,
	isValidElement,
	ReactNode,
	useEffect,
	useRef,
	useState
} from 'react'
import { cls, is } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './select.scss'
import Popup from '../popup'
import { SelectCtx } from './SelectCtx'
import Option, { OptionProps } from './Option'
import Icon from '../basic/Icon'
import { mdiChevronDown } from '@mdi/js'
import { useBoolean } from 'grey-rh'

interface SelectProps extends Omit<HTMLAttributes<HTMLElement>, 'onChange'> {
	block?: boolean
	multiple?: boolean
	placeholder?: string
	value?: (number | string) | (number | string)[]
	onChange?: (value?: (number | string) | (number | string)[]) => void
}

const Select = forwardRef<HTMLDivElement, SelectProps>((props, outerRef) => {
	const { className, children, placeholder = '', value, onChange, block = false, multiple = false, ...rest } = props

	const [visible, { setFalse: hide, setBool: setVisible }] = useBoolean(false)
	const defaultSelection = is.array(value) ? value : value ? [value] : []
	const [selection, setSelection] = useState<(string | number)[]>(defaultSelection)

	const [wrapWidth, setWrapWidth] = useState<number>()
	const wrapRef = useRef<HTMLDivElement>(null)

	const [selectionLabel, setSelectionLabel] = useState<ReactNode>(null)

	const handleHideDrop = () => {
		hide()
	}

	const updateSelection = (val: string | number) => {
		if (multiple) {
			setSelection(pre => {
				const nextSelection = [...pre]
				const index = pre.indexOf(val)
				if (index > -1) {
					nextSelection.splice(index, 1)
				} else {
					nextSelection.push(val)
				}
				return nextSelection
			})
		} else {
			setSelection([val])
			onChange?.(val)
			handleHideDrop()
		}
	}

	const prefixCls = `${UI_PREFIX}-select`

	useEffect(() => {
		if (!is.undefined(value)) {
			if (multiple && is.array(value)) {
				if (!value.length) {
					setSelectionLabel(null)
				} else {
					setSelectionLabel(
						value.map(item => (
							<div key={item} style={{ display: 'inline-block' }}>
								{item}
							</div>
						))
					)
				}
			} else if (!is.array(value)) {
				Children.forEach(children, child => {
					if (isValidElement<OptionProps>(child)) {
						if (child.props.value === value) {
							setSelectionLabel(child.props.children)
						}
					}
				})
				setSelection([value])
			}
		}
	}, [children, multiple, value])

	useEffect(() => {
		console.log('selection: ', selection)
		if (multiple) {
			onChange?.(selection)
		}
	}, [multiple, onChange, selection])

	useEffect(() => {
		if (visible) {
			const rect = wrapRef.current?.getBoundingClientRect()
			if (rect) setWrapWidth(rect.width)
		}
	}, [visible])

	return (
		<SelectCtx.Provider value={{ selection, updateSelection }}>
			<Popup
				spacing={6}
				trigger="manual"
				visible={visible}
				onVisibleChange={setVisible}
				onClickOutside={handleHideDrop}
				content={
					<div
						className={cls(`${prefixCls}-drop`)}
						style={block ? { width: wrapWidth } : { minWidth: wrapWidth }}
					>
						{children}
					</div>
				}
			>
				<div
					ref={outerRef}
					className={cls(className, prefixCls, {
						[`${prefixCls}-block`]: block
					})}
					onClick={() => setVisible(pre => !pre)}
					{...rest}
				>
					<div ref={wrapRef} className={`${prefixCls}-wrap`}>
						<div className={`${prefixCls}-selection`}>
							{selectionLabel ?? <div className={`${prefixCls}-placeholder`}>{placeholder}</div>}
						</div>
						<Icon path={mdiChevronDown} />
					</div>
				</div>
			</Popup>
		</SelectCtx.Provider>
	)
})

const ExportSelect = Select as typeof Select & {
	Option: typeof Option
}
ExportSelect.Option = Option

export default ExportSelect
