import React, { FC, HTMLAttributes, useContext, useEffect } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './tab-panel.scss'
import { TabsCtx } from './TabsCtx'

interface TabPanelProps extends HTMLAttributes<HTMLElement> {
	name: string | number
	tab?: string
	active?: boolean
}

const TabPanel: FC<TabPanelProps> = props => {
	const { children, className, name, tab, active, ...rest } = props

	const { subscribe, lazyLoad = false } = useContext(TabsCtx)

	useEffect(() => {
		const unsubscribe = subscribe?.({ name, tab })
		return () => {
			unsubscribe?.()
		}
	}, [name, subscribe, tab])

	const prefixCls = `${UI_PREFIX}-tab-panel`

	if (lazyLoad && !active) {
		return null
	}

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-active`]: active
			})}
			{...rest}
		>
			{children}
		</div>
	)
}

export default TabPanel
