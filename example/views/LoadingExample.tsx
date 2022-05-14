import { mdiLoading } from '@mdi/js'
import React, { useState } from 'react'
import { Button, Card, Divider, Icon, Loading, Space } from '../../packages'

const LoadingExample = () => {
	const [spinning, setSpinning] = useState(false)
	return (
		<>
			<h1>Loading</h1>
			<Loading />
			<Divider />
			<Space size="large">
				<Loading size="small" />
				<Loading size="medium" />
				<Loading size="large" />
			</Space>
			<div style={{ fontSize: 32 }}>
				<Loading size="inherit" />
			</div>
			<Divider />
			<Space direction="vertical">
				<Button
					onClick={() => {
						setSpinning(pre => !pre)
					}}
				>
					Toggle spinning
				</Button>
				<Loading spinning={spinning}>
					<Card header="loading wrapper">Content</Card>
				</Loading>
			</Space>
			<Divider />
			<Loading icon={<Icon path={mdiLoading} spin={1} size="24px" />} style={{ fontSize: 20 }}>
				<Card header="custom spinning icon">Content</Card>
			</Loading>
			<Divider />
			<Loading description="text description">
				<Card header="text description">Content</Card>
			</Loading>
		</>
	)
}

export default LoadingExample
