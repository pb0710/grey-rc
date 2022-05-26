import React, { CSSProperties, FC, HTMLAttributes } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './drawer.scss'
import { createPortal } from 'react-dom'
import Icon from '../basic/Icon'
import { mdiClose } from '@mdi/js'

interface DrawerProps extends HTMLAttributes<HTMLElement> {
	visible?: boolean
	placement?: 'left' | 'top' | 'right' | 'bottom'
	width?: number | string
	height?: number | string
	maskStyle?: CSSProperties
	maskClassName?: string
	maskClosable?: boolean
	closable?: boolean
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
		onCancel,
		style,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-drawer`

	return visible
		? createPortal(
				<div className={prefixCls}>
					<div
						className={cls(maskClassName, `${prefixCls}-mask`)}
						onClick={() => {
							if (maskClosable) onCancel?.()
						}}
						style={maskStyle}
					></div>
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
				</div>,
				document.body
		  )
		: null
}

export default Drawer