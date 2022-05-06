import React, { ImgHTMLAttributes } from 'react'
import './image.scss'
interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {
	toolbarVisible?: boolean
	detailDisabled?: boolean
}
declare const Image: React.ForwardRefExoticComponent<ImageProps & React.RefAttributes<HTMLImageElement>>
export default Image
