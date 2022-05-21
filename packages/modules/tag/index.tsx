import React, { FC, HTMLAttributes, useState } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './tag.scss'
import Icon from '../basic/Icon'
import { mdiClose, mdiLoading } from '@mdi/js'

interface TagProps extends HTMLAttributes<HTMLElement> {
	round?: boolean
	bordered?: boolean
	bgColor?: string
	color?: string
	borderColor?: string
	closable?: boolean
	onClose?: () => void | Promise<void>
}

const Tag: FC<TagProps> = props => {
	const {
		children,
		className,
		round = false,
		bgColor,
		color,
		bordered = false,
		borderColor,
		closable = false,
		onClose,
		style,
		...rest
	} = props

	const [loading, setLoading] = useState(false)

	const prefixCls = `${UI_PREFIX}-tag`

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-round`]: round,
				[`${prefixCls}-bordered`]: bordered
			})}
			style={{
				...style,
				color,
				borderColor,
				backgroundColor: bgColor
			}}
			{...rest}
		>
			<div>{children}</div>
			{closable && (
				<div className={`${prefixCls}-close`}>
					{loading ? (
						<Icon path={mdiLoading} spin={1} />
					) : (
						<Icon
							path={mdiClose}
							onClick={() => {
								const res = onClose?.()
								if (res instanceof Promise) {
									setLoading(true)
									res.then(() => {
										setLoading(false)
									})
								}
							}}
						/>
					)}
				</div>
			)}
		</div>
	)
}

export default Tag
