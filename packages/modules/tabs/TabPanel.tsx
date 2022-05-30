import React, { forwardRef, HTMLAttributes, useContext, useEffect } from 'react'
import { cls } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './tab-panel.scss'
import { TabsCtx } from './TabsCtx'
import { Slide } from '../motion'

interface TabPanelProps extends HTMLAttributes<HTMLElement> {
	name: string | number
	tab?: string
}

const TabPanel = forwardRef<HTMLDivElement, TabPanelProps>((props, outerRef) => {
	const { children, className, name, tab, ...rest } = props

	const { subscribe, lazyLoad = false, selection, container } = useContext(TabsCtx)
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
	// TODO:
	return (
		<Slide in={isActive} container={container} direction="left" mountOnEnter unmountOnExit exit={false}>
			<div
				ref={outerRef}
				className={cls(className, prefixCls, {
					[`${prefixCls}-active`]: true
				})}
				{...rest}
			>
				{children}
			</div>
		</Slide>
	)
})

export default TabPanel
