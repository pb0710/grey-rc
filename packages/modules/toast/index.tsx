import React, { FC, ReactElement, ReactNode, useCallback, useState } from 'react'
import { cls, is, uuid } from 'grey-utils'
import { UI_PREFIX } from '../../constants'
import './toast.scss'
import ToastItem, { ToastItemProps } from './ToastItem'
import { createRoot, Root } from 'react-dom/client'
import { TransitionGroup } from 'react-transition-group'
import { Slide } from '@mui/material'

const prefixCls = `${UI_PREFIX}-toast`

type Position = 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right'
interface ShowProps extends ToastItemProps {
	id: string
	duration?: number
	position?: Position
	icon?: ReactNode
}
type Show = (props: ShowProps) => string
type Hide = (id?: string) => void

export const Toast: FC & {
	show?: Show
	hide?: Hide
} = () => {
	const [toastList, setToastList] = useState<ShowProps[]>([])

	Toast.show = useCallback<Show>(props => {
		const { id, position = 'top', duration = 3000, ...rest } = props

		setToastList(pre => [
			...pre,
			{
				id,
				position,
				...rest
			}
		])

		setTimeout(() => {
			Toast.hide?.(id)
		}, duration)

		return id
	}, [])

	Toast.hide = useCallback<Hide>(id => {
		if (is.undefined(id)) {
			setToastList([])
		} else {
			setToastList(pre => pre.filter(toast => toast.id !== id))
		}
	}, [])

	const renderToastList = (position: Position) => {
		const directionMap: Record<string, 'left' | 'right' | 'down' | 'up'> = {
			top: 'down',
			'top-left': 'down',
			'top-right': 'down',
			bottom: 'up',
			'bottom-left': 'up',
			'bottom-right': 'up'
		}
		const direction = directionMap[position]

		return (
			<div key={position} className={cls(prefixCls, `${prefixCls}-${position}`)}>
				<TransitionGroup component={null}>
					{toastList
						.filter(toast => toast.position === position)
						.map(({ id, title, ...rest }) => (
							<Slide
								key={id}
								direction={direction}
								container={document.querySelector(`.${prefixCls}-${position}`)}
								mountOnEnter
								unmountOnExit
							>
								<ToastItem
									title={title}
									onClose={() => {
										Toast.hide?.(id)
									}}
									{...rest}
								/>
							</Slide>
						))}
				</TransitionGroup>
			</div>
		)
	}

	const positionList: Position[] = ['top-left', 'top', 'top-right', 'bottom-left', 'bottom', 'bottom-right']
	return <>{positionList.map(renderToastList)}</>
}

let toastInst: ReactElement<typeof Toast> | null = null
let boxRoot: Root | null = null
const boxId = `${prefixCls}-box`

const ExportToast: {
	show: (props: Omit<ShowProps, 'id'>) => string
	hide: Hide
} = {
	show(props) {
		const id = uuid()

		if (!toastInst) {
			toastInst = <Toast key={id} />

			let box = document.getElementById(boxId)
			if (!box) {
				box = document.createElement('div')
				box.id = boxId
				document.body.appendChild(box)
			}
			boxRoot = boxRoot ?? createRoot(box)
			boxRoot.render(toastInst)

			// render 之后立马执行 show
			Promise.resolve().then(() => {
				Toast.show?.({ ...props, id })
			})
		} else {
			Toast.show?.({ ...props, id })
		}

		return id
	},
	hide(id) {
		Toast.hide?.(id)
	}
}
export default ExportToast
