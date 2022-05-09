import { mdiChevronDown } from '@mdi/js'
import { cls, is, omit } from 'grey-utils'
import React, { CSSProperties, FC, HTMLAttributes, ReactNode, ReactText, useRef, useState } from 'react'
import Icon from '../basic/Icon'
import './collapse-panel.scss'
import { Transition, TransitionStatus } from 'react-transition-group'
import { UI_PREFIX } from '../../constants'

export interface CollapsePanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onChange'> {
	itemKey?: ReactText
	title?: ReactNode
	expend?: boolean
	onChange?: (expend: boolean) => void
}

const CollapsePanel: FC<CollapsePanelProps> = props => {
	const { className, children, expend, title, onChange, ...rest } = omit(props, 'itemKey')

	const transitionRef = useRef<HTMLElement>(null)
	const boxRef = useRef<HTMLDivElement>(null)
	const [maxHeight, setMaxHeight] = useState<CSSProperties['height']>(0)

	const currHeight = boxRef.current?.scrollHeight
	const transitionHandlers = {
		onEnter() {
			setMaxHeight(0)
		},
		onEntering() {
			if (currHeight) {
				setMaxHeight(currHeight)
			}
		},
		onExited() {
			setMaxHeight(0)
		},
		onExiting() {
			if (currHeight) {
				setMaxHeight(currHeight)
			}
		}
	}

	const prefixCls = `${UI_PREFIX}-collapse-panel`

	const isCustomHeader = !is.string(title)
	const headerEle = isCustomHeader ? (
		title
	) : (
		<div className={cls(className, `${prefixCls}-header`)} {...rest}>
			<div>{title}</div>
			<Icon
				className={`${prefixCls}-header-icon`}
				path={mdiChevronDown}
				canHover
				size="16px"
				rotate={expend ? 0 : -90}
				onClick={() => {
					onChange?.(!expend)
				}}
			/>
		</div>
	)
	return (
		<div
			className={cls(prefixCls, {
				[`${prefixCls}-is-custom-header`]: isCustomHeader
			})}
		>
			{headerEle}
			<Transition in={expend} nodeRef={transitionRef} timeout={200} {...transitionHandlers}>
				{(state: TransitionStatus) => (
					<div
						ref={boxRef}
						className={cls(`${prefixCls}-box`, {
							[`${prefixCls}-box-entered`]: state === 'entered',
							[`${prefixCls}-box-exited`]: state === 'exited'
						})}
						style={{ maxHeight }}
					>
						{children}
					</div>
				)}
			</Transition>
		</div>
	)
}

export default CollapsePanel
