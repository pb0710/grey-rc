import { cls } from 'grey-utils'
import React, { FC, forwardRef, HTMLAttributes, isValidElement, ReactNode } from 'react'
import { UI_PREFIX } from '../../constants'
import './card.scss'

interface CardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	bordered?: boolean
	shadow?: boolean
	header?: ReactNode
	footer?: ReactNode
	cover?: ReactNode
}

const Card = forwardRef<HTMLDivElement, CardProps>((props, outerRef) => {
	const { children, className, bordered = true, shadow = false, header, footer, cover, ...rest } = props

	const prefixCls = `${UI_PREFIX}-card`

	const checkNeedWrap = (ele: ReactNode) => {
		if (ele == null) {
			return false
		}
		return !isValidElement(ele)
	}

	return (
		<div
			ref={outerRef}
			className={cls(className, prefixCls, {
				[`${prefixCls}-bordered`]: bordered,
				[`${prefixCls}-shadow`]: shadow
			})}
			{...rest}
		>
			{cover && <div className={`${prefixCls}-cover`}>{cover}</div>}
			{checkNeedWrap(header) ? <div className={`${prefixCls}-header`}>{header}</div> : header}
			{checkNeedWrap(children) ? <div className={`${prefixCls}-content`}>{children}</div> : children}
			{checkNeedWrap(footer) ? <div className={`${prefixCls}-footer`}>{footer}</div> : footer}
		</div>
	)
})

export default Card
