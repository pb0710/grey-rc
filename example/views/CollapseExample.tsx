import React, { useState } from 'react'
import { Button, Collapse, Divider } from '../../packages'

const CollapseExample = () => {
	const [controlledActives, setControlledActives] = useState<(string | number)[]>([])
	const [customHeaderExpend, setCustomHeaderExpend] = useState<boolean>(false)
	return (
		<>
			<h1>Collapse</h1>
			<Collapse>
				<Collapse.Panel itemKey="1" title="Panel title1">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Basic collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="2" title="Panel title2">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Basic collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="3" title="Panel title3">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Basic collapse</p>
					</div>
				</Collapse.Panel>
			</Collapse>
			<Divider />
			<Collapse accordion>
				<Collapse.Panel itemKey="1" title="Panel title1">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Accordion collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="2" title="Panel title2">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Accordion collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="3" title="Panel title3">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Accordion collapse</p>
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
				<Collapse.Panel itemKey="1" title="Panel title1">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Controlled collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="2" title="Panel title2">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Controlled collapse</p>
					</div>
				</Collapse.Panel>
				<Collapse.Panel itemKey="3" title="Panel title3">
					<div style={{ padding: 8, color: '#999' }}>
						<p>Controlled collapse</p>
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
						Toggle collapse
					</Button>
				}
				expend={customHeaderExpend}
			>
				<div style={{ padding: 8, color: '#999' }}>
					<p>Customer header of collapse Panel</p>
				</div>
			</Collapse.Panel>
		</>
	)
}

export default CollapseExample
