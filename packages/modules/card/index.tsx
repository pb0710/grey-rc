import { mdiClose } from '@mdi/js'
import { cls, is } from 'grey-utils'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import { UI_PREFIX } from '../../constants'
import Icon from '../basic/Icon'
import Space from '../basic/Space'
import Button from '../button'
import './card.scss'

interface CardProps extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
	bordered?: boolean
	shadow?: boolean
	hasCancel?: boolean
	okText?: string
	cancelText?: string
	okLoading?: boolean
	title?: ReactNode
	header?: ReactNode
	footer?: ReactNode
	action?: ReactNode
	onCancel?: () => void
	onOk?: () => void
}

const Card: FC<CardProps> = props => {
	const {
		children,
		className,
		bordered = true,
		shadow = false,
		hasCancel = true,
		okText = '确认',
		cancelText = '取消',
		okLoading = false,
		title,
		header,
		footer,
		action,
		onCancel,
		onOk,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-card`

	let actionEle = action
	if (is.undefined(action))
		actionEle = (
			<Icon
				className={`${prefixCls}-header-close-icon`}
				path={mdiClose}
				size="18px"
				canHover
				onClick={onCancel}
			/>
		)

	let headerEle = header
	if (is.undefined(header))
		headerEle = (
			<div className={`${prefixCls}-header`}>
				<strong className="${prefixCls}-header-title">{title}</strong>
				{actionEle}
			</div>
		)

	let footerEle = footer
	if (is.undefined(footer))
		footerEle = (
			<div className={`${prefixCls}-footer`}>
				<Space>
					{hasCancel && <Button onClick={onCancel}>{cancelText}</Button>}
					<Button primary loading={okLoading} onClick={onOk}>
						{okText}
					</Button>
				</Space>
			</div>
		)

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-bordered`]: bordered,
				[`${prefixCls}-shadow`]: shadow
			})}
			{...rest}
		>
			{headerEle}
			<div className={`${prefixCls}-content`}>{children}</div>
			{footerEle}
		</div>
	)
}

export default Card
