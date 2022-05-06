import {
	mdiClose,
	mdiTrayArrowDown,
	mdiMagnifyMinusOutline,
	mdiMagnifyPlusOutline,
	mdiReload,
	mdiRestore
} from '@mdi/js'
import { cls } from 'grey-utils'
import React, { forwardRef, ImgHTMLAttributes, useEffect, useRef, useState } from 'react'
import Icon from '../basic/Icon'
import Space from '../basic/Space'
import Modal from '../modal'
import Tooltip from '../tooltip'
import './image.scss'

interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	toolbarVisible?: boolean
	detailDisabled?: boolean
}

const Image = forwardRef<HTMLImageElement, ImageProps>((props, outerRef) => {
	const { className, src, toolbarVisible = true, detailDisabled = false, onClick, ...rest } = props

	const innerRef = useRef<HTMLImageElement>(null)
	const imgRef = outerRef || innerRef

	const [detailVisible, setDetailVisible] = useState(false)
	const [scale, setScale] = useState(1)
	const [rotate, setRotate] = useState(0)

	const reset = () => {
		setScale(1)
	}

	useEffect(() => {
		if (!detailVisible) {
			reset()
		}
	}, [detailVisible])

	const toolbarEle = toolbarVisible && (
		<div className="g-image-detail-toolbar">
			<Space>
				<Tooltip content="向左旋转90°">
					<Icon
						className="g-image-detail-icon"
						path={mdiRestore}
						size="20px"
						canHover
						onClick={() => setRotate(pre => pre - 90)}
					/>
				</Tooltip>
				<Tooltip content="向右旋转90°">
					<Icon
						className="g-image-detail-icon"
						path={mdiReload}
						size="20px"
						canHover
						onClick={() => setRotate(pre => pre + 90)}
					/>
				</Tooltip>
				<Tooltip content="缩小">
					<Icon
						className="g-image-detail-icon"
						path={mdiMagnifyMinusOutline}
						size="20px"
						canHover
						onClick={() => setScale(pre => Math.max(0.4, pre - 0.4))}
					/>
				</Tooltip>
				<Tooltip content="放大">
					<Icon
						className="g-image-detail-icon"
						path={mdiMagnifyPlusOutline}
						size="20px"
						canHover
						onClick={() => setScale(pre => Math.min(4, pre + 0.4))}
					/>
				</Tooltip>
				<Tooltip content="下载">
					<Icon
						className="g-image-detail-icon"
						path={mdiTrayArrowDown}
						size="20px"
						canHover
						onClick={() => {
							alert('download')
						}}
					/>
				</Tooltip>
				<Tooltip content="关闭">
					<Icon
						className="g-image-detail-icon"
						path={mdiClose}
						size="20px"
						canHover
						onClick={() => setDetailVisible(false)}
					/>
				</Tooltip>
			</Space>
		</div>
	)

	const detailEle = detailDisabled || (
		<Modal visible={detailVisible} onCancel={() => setDetailVisible(false)}>
			<div className="g-image-detail">
				<img
					className="g-image-detail-pic"
					src={src}
					draggable={false}
					style={{
						transform: `scale(${scale}) rotate(${rotate}deg)`
					}}
				/>
				{toolbarEle}
			</div>
		</Modal>
	)

	return (
		<>
			<img
				className={cls(className, 'g-image', {
					'g-image-bordered': src,
					'g-image-shadow': src
				})}
				ref={imgRef}
				src={src}
				onClick={e => {
					onClick?.(e)
					setDetailVisible(pre => !pre)
				}}
				{...rest}
			/>
			{detailEle}
		</>
	)
})

export default Image
