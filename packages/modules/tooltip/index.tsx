import { cls } from 'grey-utils'
import React, { FC } from 'react'
import { UI_PREFIX } from '../../constants'
import Popup, { PopupProps } from '../popup'
import './tooltip.scss'

interface TooltipProps extends PopupProps {
	light?: boolean
}

const Tooltip: FC<TooltipProps> = props => {
	const { children, className, content, light = false, placement = 'top', ...rest } = props

	const prefixCls = `${UI_PREFIX}-tooltip`

	const contentEle = (
		<div className={cls(`${prefixCls}-content`, `${prefixCls}-content-${light ? 'light' : 'dark'}`)}>{content}</div>
	)

	return (
		<Popup className={cls(className, prefixCls)} content={contentEle} placement={placement} {...rest}>
			{children}
		</Popup>
	)
}

export default Tooltip
