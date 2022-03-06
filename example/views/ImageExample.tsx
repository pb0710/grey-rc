import React, { FC } from 'react'
import { Divider, Image, Space } from '../../packages'

const ImageExample: FC = () => {
	const picSrc1 = 'https://img.acgbox.org/2020/12/20/025e7528d9eee.jpg'
	const picSrc2 = 'https://img.acgbox.org/2020/12/20/0992e9220aa3c.jpg'
	const picSrc3 = 'https://img.acgbox.org/2020/12/20/01ca140c8a0a1.jpg'
	const picSrc4 = 'https://img.acgbox.org/2020/12/20/c1a22ba2d4817.jpg'
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
