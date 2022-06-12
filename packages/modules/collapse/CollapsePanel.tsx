import { mdiChevronDown } from '@mdi/js'
import { cls, is, omit } from 'grey-utils'
import React, { FC, HTMLAttributes, ReactNode } from 'react'
import Icon from '../basic/Icon'
import './collapse-panel.scss'
import { UI_PREFIX } from '../../constants'
import { CollapseMotion as MuiCollapse } from '../motion'

export interface CollapsePanelProps extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onChange'> {
	itemKey?: string | number
	title?: ReactNode
	expend?: boolean
	onChange?: (expend: boolean) => void
}

const CollapsePanel: FC<CollapsePanelProps> = props => {
	const { className, children, expend, title, onChange, ...rest } = omit(props, 'itemKey')

	const prefixCls = `${UI_PREFIX}-collapse-panel`

	const isCustomHeader = !is.string(title)

	return (
		<div
			className={cls(prefixCls, {
				[`${prefixCls}-is-custom-header`]: isCustomHeader
			})}
		>
			{isCustomHeader ? (
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
			)}
			<MuiCollapse in={expend}>{children}</MuiCollapse>
		</div>
	)
}

export default CollapsePanel
