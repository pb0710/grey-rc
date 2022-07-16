import React, { CSSProperties, FC, HTMLAttributes, useRef } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './drawer.scss'
import { createPortal } from 'react-dom'
import Icon from '../icon'
import { mdiClose } from '@mdi/js'
import Motion from '../motion'

interface DrawerProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	placement?: 'left' | 'top' | 'right' | 'bottom'
	width?: number | string
	height?: number | string
	maskStyle?: CSSProperties
	maskClassName?: string
	maskClosable?: boolean
	closable?: boolean
	destroy?: boolean
	onCancel?: () => void
}

const Drawer: FC<DrawerProps> = props => {
	const {
		children,
		className,
		visible = false,
		placement = 'right',
		width,
		height,
		maskClassName,
		maskClosable = true,
		maskStyle,
		closable = false,
		destroy = false,
		onCancel,
		style,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-drawer`

	const directionMap: Record<string, 'left' | 'right' | 'down' | 'up'> = {
		top: 'down',
		bottom: 'up',
		left: 'right',
		right: 'left'
	}
	const direction = directionMap[placement]
	const preBodyOverflowRef = useRef('')

	const setBodyOverflowHidden = () => {
		preBodyOverflowRef.current = document.body.style.getPropertyValue('overflow')
		document.body.style.setProperty('overflow', 'hidden')
	}

	const resetBodyOverflowHidden = () => {
		document.body.style.setProperty('overflow', preBodyOverflowRef.current)
	}

	return createPortal(
		<Motion.Fade
			in={visible}
			mountOnEnter
			unmountOnExit={destroy}
			onEnter={setBodyOverflowHidden}
			onExited={resetBodyOverflowHidden}
		>
			<div className={prefixCls}>
				<div
					className={cls(maskClassName, `${prefixCls}-mask`)}
					onClick={() => {
						if (maskClosable) onCancel?.()
					}}
					style={maskStyle}
				></div>
				<Motion.Slide in={visible} direction={direction}>
					<div
						className={cls(className, `${prefixCls}-wrap`, `${prefixCls}-wrap-${placement}`)}
						style={{ ...style, width, height }}
						{...rest}
					>
						{closable && (
							<Icon
								className={`${prefixCls}-wrap-close`}
								path={mdiClose}
								canHover
								onClick={() => onCancel?.()}
							/>
						)}
						{children}
					</div>
				</Motion.Slide>
			</div>
		</Motion.Fade>,
		document.body
	)
}

export default Drawer
