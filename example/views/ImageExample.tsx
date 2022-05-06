import React, { FC } from 'react'
import { Divider, Image, Space } from '../../packages'

const ImageExample: FC = () => {
	const picSrc1 = 'https://iph.href.lu/879x400'
	const picSrc2 = 'https://iph.href.lu/879x400'
	const picSrc3 = 'https://iph.href.lu/879x400'
	const picSrc4 = 'https://iph.href.lu/879x400'
	return (
		<>
			<h1>Image</h1>
			<Space>
				<Image src={picSrc1} width="200px" />
				<Image src={picSrc2} width="300px" />
				<Image src={picSrc3} width="200px" />
				<Image src={picSrc4} width="200px" />
			</Space>
			<Divider />
			<Image toolbarVisible={false} src={picSrc2} width="300px" />
			<Divider />
			<Image detailDisabled src={picSrc4} width="200px" />
		</>
	)
}

export default ImageExample
