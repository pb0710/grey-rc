import React, { FC } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './dialog.scss'
import Modal, { ModalProps } from '../modal'
import Icon from '../basic/Icon'
import { mdiClose } from '@mdi/js'
import Space from '../basic/Space'
import Button from '../button'
import Card from '../card'
import { Zoom } from '../motion'

interface DialogProps extends ModalProps {
	hasCancel?: boolean
	title?: string
	okText?: string
	cancelText?: string
	okLoading?: boolean
	onCancel?: () => void
	onOk?: () => void
}

const Dialog: FC<DialogProps> = props => {
	const {
		children,
		className,
		visible,
		maskClassName,
		maskClosable,
		hasCancel = true,
		title,
		okText = 'Ok',
		cancelText = 'Cancel',
		okLoading = false,
		onCancel,
		onOk,
		...rest
	} = props

	const prefixCls = `${UI_PREFIX}-dialog`

	return (
		<Modal
			visible={visible}
			maskClassName={maskClassName}
			maskClosable={maskClosable}
			onCancel={onCancel}
			{...rest}
		>
			<Zoom in={visible}>
				<Card
					className={cls(className, prefixCls)}
					shadow
					bordered={false}
					header={
						<div className={`${prefixCls}-header`}>
							<strong className={`${prefixCls}-header-title`}>{title}</strong>
							<Icon
								className={`${prefixCls}-header-close-icon`}
								path={mdiClose}
								size="16px"
								canHover
								onClick={onCancel}
							/>
						</div>
					}
					footer={
						<div className={`${prefixCls}-footer`}>
							<Space>
								{hasCancel && <Button onClick={onCancel}>{cancelText}</Button>}
								<Button primary loading={okLoading} onClick={onOk}>
									{okText}
								</Button>
							</Space>
						</div>
					}
				>
					<div className={`${prefixCls}-content`}>{children}</div>
				</Card>
			</Zoom>
		</Modal>
	)
}

export default Dialog
