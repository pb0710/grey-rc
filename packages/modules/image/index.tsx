import {
	mdiClose,
	mdiMagnifyMinusOutline,
	mdiMagnifyPlusOutline,
	mdiReload,
	mdiRestore,
	mdiBackupRestore
} from '@mdi/js'
import { cls } from 'grey-utils'
import React, {
	forwardRef,
	ImgHTMLAttributes,
	MouseEventHandler,
	useEffect,
	useRef,
	useState,
	WheelEventHandler
} from 'react'
import { UI_PREFIX } from '../../constants'
import Icon from '../basic/Icon'
import Space from '../basic/Space'
import Modal from '../modal'
import Tooltip from '../tooltip'
import './image.scss'

type Coordinate = {
	x: number
	y: number
} | null
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	toolbarVisible?: boolean
	detailDisabled?: boolean
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, outerRef) => {
	const { className, src, toolbarVisible = true, detailDisabled = false, onClick, ...rest } = props

	const innerRef = useRef<HTMLImageElement>(null)
	const imgRef = outerRef || innerRef
	const imgDetailRef = useRef<HTMLImageElement>(null)

	const [detailVisible, setDetailVisible] = useState(false)
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)
	const [offset, setOffset] = useState<Coordinate>(null)
	const [ratioVisible, setRatioVisible] = useState(false)
	const delayTimerRef = useRef(0)

	const handleDragDetailStart: MouseEventHandler<HTMLImageElement> = event => {
		let dragging = true
		let pos: Coordinate = null
		if (imgDetailRef.current)
			pos = {
				x: event.pageX - imgDetailRef.current.offsetLeft,
				y: event.pageY - imgDetailRef.current.offsetTop
			}
		const handleMove = (event: MouseEvent) => {
			if (dragging && pos)
				setOffset({
					x: event.pageX - pos.x,
					y: event.pageY - pos.y
				})
		}
		const handleUp = () => {
			dragging = false
			document.removeEventListener('mousedown', handleMove)
			document.removeEventListener('mouseup', handleUp)
		}
		document.addEventListener('mousemove', handleMove)
		document.addEventListener('mouseup', handleUp)
	}

	const handleReset = () => {
		setScale(1)
		setRotate(0)
		setOffset(null)
	}

	useEffect(() => {
		if (!detailVisible) {
			handleReset()
		}
	}, [detailVisible])

	const handleShowRatio = () => {
		setRatioVisible(true)
		clearTimeout(delayTimerRef.current)
		delayTimerRef.current = window.setTimeout(() => {
			setRatioVisible(false)
		}, 1000)
	}

	const handleZoom = () => {
		setScale(pre => Math.min(4, pre + 0.5))
		handleShowRatio()
	}
	const handleShrink = () => {
		setScale(pre => Math.max(0.5, pre - 0.5))
		handleShowRatio()
	}

	const handleWheel: WheelEventHandler<HTMLElement> = event => {
		if (event.deltaY < 0) {
			handleShrink()
		} else {
			handleZoom()
		}
	}

	const prefixCls = `${UI_PREFIX}-image`
	const scalePercent = `${scale * 100}%`

	const toolbarProps = {
		className: `${prefixCls}-detail-icon`,
		size: '20px',
		canHover: true
	}
	const toolbarEle = toolbarVisible && (
		<div className={`${prefixCls}-detail-toolbar`}>
			<Space>
				<Tooltip content="向左旋转90°">
					<Icon {...toolbarProps} path={mdiRestore} onClick={() => setRotate(pre => pre - 90)} />
				</Tooltip>
				<Tooltip content="向右旋转90°">
					<Icon {...toolbarProps} path={mdiReload} onClick={() => setRotate(pre => pre + 90)} />
				</Tooltip>
				<Tooltip content="缩小">
					<Icon {...toolbarProps} path={mdiMagnifyMinusOutline} onClick={handleShrink} />
				</Tooltip>
				<Tooltip content="放大">
					<Icon {...toolbarProps} path={mdiMagnifyPlusOutline} onClick={handleZoom} />
				</Tooltip>
				<Tooltip content="重置">
					<Icon {...toolbarProps} path={mdiBackupRestore} onClick={handleReset} />
				</Tooltip>
				<Tooltip content="关闭">
					<Icon {...toolbarProps} path={mdiClose} onClick={() => setDetailVisible(false)} />
				</Tooltip>
			</Space>
		</div>
	)

	const detailEle = detailDisabled || (
		<Modal visible={detailVisible} onCancel={() => setDetailVisible(false)} onWheel={handleWheel}>
			<div className={`${prefixCls}-detail`} onClick={() => setDetailVisible(false)}>
				<img
					ref={imgDetailRef}
					className={`${prefixCls}-detail-pic`}
					src={src}
					draggable={false}
					style={{
						transform: `scale(${scale}) rotate(${rotate}deg)`,
						...(offset
							? {
									position: 'fixed',
									left: offset.x,
									top: offset.y
							  }
							: {})
					}}
					onMouseDown={handleDragDetailStart}
					onClick={event => event.stopPropagation()}
				/>
				{ratioVisible && <div className={`${prefixCls}-detail-ratio`}>{scalePercent}</div>}
				{toolbarEle}
			</div>
		</Modal>
	)

	return (
		<>
			<img
				className={cls(className, prefixCls, {
					[`${prefixCls}-bordered`]: src,
					[`${prefixCls}-shadow`]: src
				})}
				ref={imgRef}
				src={src}
				onClick={event => {
					onClick?.(event)
					setDetailVisible(pre => !pre)
				}}
				{...rest}
			/>
			{detailEle}
		</>
	)
})

export default Image
