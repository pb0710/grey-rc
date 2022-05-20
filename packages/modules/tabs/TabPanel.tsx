import React, { FC, HTMLAttributes, useContext, useEffect } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './tab-panel.scss'
import { TabsCtx } from './TabsCtx'

interface TabPanelProps extends HTMLAttributes<HTMLElement> {
	name: string | number
	tab?: string
}

const TabPanel: FC<TabPanelProps> = props => {
	const { children, className, name, tab, ...rest } = props

	const { subscribe, lazyLoad = false, selection } = useContext(TabsCtx)
	const isActive = selection === name

	useEffect(() => {
		const unsubscribe = subscribe?.({ name, tab })
		return () => {
			unsubscribe?.()
		}
	}, [name, subscribe, tab])

	const prefixCls = `${UI_PREFIX}-tab-panel`

	if (lazyLoad && !isActive) {
		return null
	}

	return (
		<div
			className={cls(className, prefixCls, {
				[`${prefixCls}-active`]: isActive
			})}
			{...rest}
		>
			{children}
		</div>
	)
}

export default TabPanel
