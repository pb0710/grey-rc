import {
	mdiClose,
	mdiMagnifyMinusOutline,
	mdiMagnifyPlusOutline,
	mdiReload,
	mdiRestore,
	mdiBackupRestore
} from '@mdi/js'
import { useLatestRef } from 'grey-rh'
import { cls } from 'grey-utils'
import React, {
	forwardRef,
	ImgHTMLAttributes,
	MouseEventHandler,
	useCallback,
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
	scaleRange?: number[]
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, outerRef) => {
	const {
		className,
		src,
		toolbarVisible = true,
		detailDisabled = false,
		scaleRange = [0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 8],
		onClick,
		...rest
	} = props

	const innerRef = useRef<HTMLImageElement>(null)
	const imgRef = outerRef || innerRef
	const imgDetailRef = useRef<HTMLImageElement>(null)

	const [detailVisible, setDetailVisible] = useState(false)

	const scaleRangeRef = useLatestRef(scaleRange)
	const originalScaleIndex = scaleRangeRef.current.indexOf(1)
	const [scaleIndex, setScaleIndex] = useState(originalScaleIndex)
	const scale = scaleRangeRef.current[scaleIndex]

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

	const updateScale = useCallback(
		(mapState: (state: number) => number) => {
			setScaleIndex(preScaleIndex => {
				const nextScaleIndex = mapState(preScaleIndex)
				if (nextScaleIndex >= 0 && nextScaleIndex < scaleRangeRef.current.length) {
					return nextScaleIndex
				}
				return preScaleIndex
			})
		},
		[scaleRangeRef]
	)

	const handleReset = useCallback(() => {
		updateScale(() => originalScaleIndex)
		setRotate(0)
		setOffset(null)
	}, [originalScaleIndex, updateScale])

	useEffect(() => {
		if (!detailVisible) {
			handleReset()
		}
	}, [detailVisible, handleReset])

	const handleShowRatio = () => {
		setRatioVisible(true)

		const ONE_SECOND = 1000
		clearTimeout(delayTimerRef.current)
		delayTimerRef.current = window.setTimeout(() => {
			setRatioVisible(false)
		}, ONE_SECOND)
	}

	const handleZoom = () => {
		updateScale(pre => pre + 1)
		handleShowRatio()
	}
	const handleShrink = () => {
		updateScale(pre => pre - 1)
		handleShowRatio()
	}

	const handleWheel: WheelEventHandler<HTMLElement> = event => {
		if (event.deltaY < 0) {
			handleShrink()
		} else {
			handleZoom()
		}
	}

	const hideDetail = () => {
		setDetailVisible(false)
	}

	const prefixCls = `${UI_PREFIX}-image`
	const scalePercent = `${scale * 100}%`

	const toolbarProps = {
		className: `${prefixCls}-detail-icon`,
		size: '20px',
		canHover: true
	}
	const toolbarEle = toolbarVisible && (
		<div className={`${prefixCls}-detail-toolbar`} onClick={event => event.stopPropagation()}>
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
					<Icon {...toolbarProps} path={mdiClose} onClick={hideDetail} />
				</Tooltip>
			</Space>
		</div>
	)

	const detailEle = detailDisabled || (
		<Modal visible={detailVisible} onCancel={hideDetail} onWheel={handleWheel}>
			<div
				className={`${prefixCls}-detail`}
				onClick={event => {
					// scale < 1 时，外层 detail 的宽高不变，点击 detail 也需要关闭弹窗。
					if (event.target === event.currentTarget) {
						hideDetail()
					}
				}}
			>
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
				/>
			</div>
			{ratioVisible && <div className={`${prefixCls}-detail-ratio`}>{scalePercent}</div>}
			{toolbarEle}
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
