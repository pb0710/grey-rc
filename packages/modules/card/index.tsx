import { mdiClose } from '@mdi/js'
import { cls } from 'gray-utils'
import React, { FC, HTMLAttributes } from 'react'
import Icon from '../basic/Icon'
import Space from '../basic/Space'
import Button from '../button'
import './card.scss'

interface CardProps extends HTMLAttributes<HTMLElement> {
	bordered?: boolean
	hasCancel?: boolean
	okText?: string
	cancelText?: string
	okLoading?: boolean
	onCancel?: () => void
	onOk?: () => void
}

const Card: FC<CardProps> = props => {
	const {
		children,
		className,
		bordered = true,
		hasCancel = true,
		okText = '确认',
		cancelText = '取消',
		okLoading = false,
		onCancel,
		onOk,
		...rest
	} = props

	return (
		<div
			className={cls(className, 'g-card', {
				'g-card-bordered': bordered
			})}
			{...rest}
		>
			<div className="g-card-header">
				<strong className="g-card-header-title">title</strong>
				<Icon path={mdiClose} size="18px" canHover onClick={onCancel} />
			</div>
			<div className="g-card-content">{children}</div>
			<div className="g-card-footer">
				<Space>
					{hasCancel && <Button onClick={onCancel}>{cancelText}</Button>}
					<Button primary loading={okLoading} onClick={onOk}>
						{okText}
					</Button>
				</Space>
			</div>
		</div>
	)
}

export default Card
