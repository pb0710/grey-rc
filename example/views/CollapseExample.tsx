import React, { FC, useState } from 'react'
import { Button, Collapse, Divider } from '../../packages'

const CollapseExample: FC = () => {
	const [controlledActives, setControlledActives] = useState<(string | number)[]>([])
	const [customHeaderExpend, setCustomHeaderExpend] = useState<boolean>(false)
	return (
		<>
			<h1>Collapse</h1>
			<Collapse>
				<Collapse.Panel itemKey="1" title="panel title1">
					<div style={{ padding: 8, color: '#999' }}>
						<p>basic collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="2" title="panel title2">
					<div style={{ padding: 8, color: '#999' }}>
						<p>basic collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="3" title="panel title3">
					<div style={{ padding: 8, color: '#999' }}>
						<p>basic collapse</p>
					</div>
				</Collapse.Panel>
			</Collapse>
			<Divider />
			<Collapse accordion>
				<Collapse.Panel itemKey="1" title="panel title1">
					<div style={{ padding: 8, color: '#999' }}>
						<p>accordion collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="2" title="panel title2">
					<div style={{ padding: 8, color: '#999' }}>
						<p>accordion collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="3" title="panel title3">
					<div style={{ padding: 8, color: '#999' }}>
						<p>accordion collapse</p>
					</div>
				</Collapse.Panel>
			</Collapse>
			<Divider />
			<Collapse
				defaultActives={[1]}
				actives={controlledActives}
				onChange={actives => {
					setControlledActives(actives)
				}}
			>
				<Collapse.Panel itemKey="1" title="panel title1">
					<div style={{ padding: 8, color: '#999' }}>
						<p>controlled collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="2" title="panel title2">
					<div style={{ padding: 8, color: '#999' }}>
						<p>controlled collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="3" title="panel title3">
					<div style={{ padding: 8, color: '#999' }}>
						<p>controlled collapse</p>
					</div>
				</Collapse.Panel>
			</Collapse>
			<Divider />
			<Collapse.Panel
				title={
					<Button
						onClick={() => {
							setCustomHeaderExpend(pre => !pre)
						}}
					>
						toggle collapse
					</Button>
				}
				expend={customHeaderExpend}
			>
				<div style={{ padding: 8, color: '#999' }}>
					<p>customer header of collapse panel</p>
				</div>
			</Collapse.Panel>
		</>
	)
}

export default CollapseExample
