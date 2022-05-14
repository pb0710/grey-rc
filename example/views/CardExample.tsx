import React from 'react'
import { Divider, Card, Loading } from '../../packages'

const CardExample = () => {
	return (
		<>
			<h1>Card</h1>
			<Card header="Basic card" footer="Footer">
				Content
			</Card>
			<Divider />
			<Card header="Header" cover={<img src="https://iph.href.lu/500x300" />}>
				Content
			</Card>
			<Divider />
			<Card
				header={
					<div style={{ color: 'purple', padding: 24 }}>
						<strong>Custom header</strong>
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
						<span>Custom footer</span>
					</div>
				}
			>
				Content
			</Card>
			<Divider />
			<Card bordered={false} header="No border" footer="Footer">
				Content
			</Card>
			<Divider />
			<Card shadow header="Shadow card">
				Content
			</Card>
			<Divider />
			<Loading>
				<Card header="Loading card">Content</Card>
			</Loading>
		</>
	)
}

export default CardExample
