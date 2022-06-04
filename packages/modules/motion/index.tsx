import React, { FC } from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'
import './stretch.scss'
import './slip.scss'

export { Fade, Grow, Slide, Zoom, Collapse } from '@mui/material'

type StretchProps = Omit<CSSTransitionProps, 'addEventListener'> & {
	direction?: 'top' | 'bottom' | 'left' | 'right'
}

export const Stretch: FC<StretchProps> = props => {
	const { children, direction = 'top', ...rest } = props

	return (
		<CSSTransition timeout={225} classNames={`stretch-${direction}`} {...rest}>
			{children}
		</CSSTransition>
	)
}

type SlipProps = Omit<CSSTransitionProps, 'addEventListener'> & {
	direction?: 'top' | 'bottom' | 'left' | 'right'
}

export const Slip: FC<SlipProps> = props => {
	const { children, direction = 'top', ...rest } = props

	return (
		<CSSTransition timeout={225} classNames={`slip-${direction}`} {...rest}>
			{children}
		</CSSTransition>
	)
}
