import React from 'react'
import { Divider, Image, Space } from '../../packages'

const ImageExample = () => {
	const picSrc = 'https://iph.href.lu/879x400'
	return (
		<>
			<h1>Image</h1>
			<Image src={picSrc} width="300px" />
			<Divider />
			<Image src={picSrc} width="300px" scaleRange={[0.5, 1, 2]} />
			<Divider />
			<Image toolbarVisible={false} src={picSrc} width="300px" />
			<Divider />
			<Image detailDisabled src={picSrc} width="300px" />
		</>
	)
}

export default ImageExample
