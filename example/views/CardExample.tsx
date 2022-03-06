import React, { FC } from 'react'
import { Divider, Card, Loading } from '../../packages'

const CardExample: FC = () => {
	return (
		<>
			<h1>Card</h1>
			<Card title="basic">content</Card>
			<Divider />
			<Card action={null} title="no top-right action">
				content
			</Card>
			<Divider />
			<Card header={null}>no header</Card>
			<Divider />
			<Card footer={null} title="no footer">
				content
			</Card>
			<Divider />
			<Card header={null} footer={null} title="only content">
				content
			</Card>
			<Divider />
			<Card
				title="custom card"
				header={
					<div style={{ color: 'purple', padding: 24 }}>
						<strong>custom header</strong>
					</div>
				}
				footer={
					<div
						style={{
							background: '#eee',
							padding: 24,
							borderBottomLeftRadius: 6,
							borderBottomRightRadius: 6
						}}
					>
						<span>custom footer</span>
					</div>
				}
			>
				content
			</Card>
			<Divider />
			<Card
				bordered={false}
				title="no border"
				action={null}
				footer={<div style={{ padding: '0 24px' }}>footer</div>}
			>
				内容
			</Card>
			<Divider />
			<Card shadow title="shadow card" footer={null}>
				content
			</Card>
			<Divider />
			<Loading>
				<Card title="loading" footer={null}>
					content
				</Card>
			</Loading>
		</>
	)
}

export default CardExample
