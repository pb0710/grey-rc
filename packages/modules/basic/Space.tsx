import { cls } from 'grey-utils'
import React, { forwardRef, HTMLAttributes } from 'react'
import { UI_PREFIX } from '../../constants'
import './space.scss'

interface SpaceProps extends HTMLAttributes<HTMLElement> {
	size?: 'small' | 'medium' | 'large'
	align?: 'start' | 'end' | 'center' | 'baseline'
	direction?: 'horizontal' | 'vertical'
	block?: boolean
}

const Space = forwardRef<HTMLDivElement, SpaceProps>((props, outerRef) => {
	const {
		children,
		className,
		size = 'medium',
		align = 'start',
		direction = 'horizontal',
		block = true,
		style,
		...rest
	} = props

	function toDisplay(block: boolean) {
		return block ? 'flex' : 'inline-flex'
	}
	function toAlignItems(align: string) {
		if (['start', 'end'].includes(align)) {
			return `flex-${align}`
		}
		return align
	}
	function toFlexDirection(direction: string) {
		if (direction === 'horizontal') return 'row'
		if (direction === 'vertical') return 'column'
		return 'row'
	}

	const prefixCls = `${UI_PREFIX}-space`
	const wrapCls = cls(className, prefixCls, `${prefixCls}-${direction}-${size}`)

	return (
		<div
			ref={outerRef}
			className={wrapCls}
			style={{
				display: toDisplay(block),
				alignItems: toAlignItems(align),
				flexDirection: toFlexDirection(direction),
				...style
			}}
			{...rest}
		>
			{children}
		</div>
	)
})

export default Space
