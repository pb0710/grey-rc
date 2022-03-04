import { mdiLoading } from '@mdi/js'
import React, { FC, useState } from 'react'
import { Button, Divider, Icon, Loading, Space } from '../../packages'

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
					<div style={{ padding: 16, borderRadius: 6 }}>
						<Space direction="vertical">
							<strong>loading wrapper</strong>
							<span>you can append content to loading children nodes.</span>
						</Space>
					</div>
				</Loading>
			</Space>
			<Divider />
			<Loading icon={<Icon path={mdiLoading} spin={1} size="24px" />} style={{ fontSize: 20 }}>
				<div style={{ padding: 16, borderRadius: 6 }}>
					<Space direction="vertical">
						<strong>custom spinning icon</strong>
						<span>you can use any custom loading icon.</span>
					</Space>
				</div>
			</Loading>
			<Divider />
			<Loading description="text description">
				<div style={{ padding: 16, borderRadius: 6 }}>
					<Space direction="vertical">
						<strong>custom spinning icon</strong>
						<span>you can use any custom loading icon.</span>
					</Space>
				</div>
			</Loading>
		</>
	)
}

export default LoadingExample
