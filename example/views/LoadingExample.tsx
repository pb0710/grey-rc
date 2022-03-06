import { mdiLoading } from '@mdi/js'
import React, { FC, useState } from 'react'
import { Button, Card, Divider, Icon, Loading, Space } from '../../packages'

const LoadingExample: FC = () => {
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
					toggle spinning
				</Button>
				<Loading spinning={spinning}>
					<Card title="loading wrapper" action={null} footer={null}>
						content
					</Card>
				</Loading>
			</Space>
			<Divider />
			<Loading icon={<Icon path={mdiLoading} spin={1} size="24px" />} style={{ fontSize: 20 }}>
				<Card title="custom spinning icon" action={null} footer={null}>
					content
				</Card>
			</Loading>
			<Divider />
			<Loading description="text description">
				<Card title="text description" action={null} footer={null}>
					content
				</Card>
			</Loading>
		</>
	)
}

export default LoadingExample
