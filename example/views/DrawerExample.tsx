import React, { useState } from 'react'
import { Button, Divider, Drawer, Radio } from '../../packages'

const DrawerExample = () => {
	const [placement, setPlacement] = useState<'left' | 'top' | 'right' | 'bottom'>('left')
	const [visible, setVisible] = useState(false)
	const [visible1, setVisible1] = useState(false)
	return (
		<>
			<h1>Drawer</h1>
			<Radio.Group
				type="tab"
				value={placement}
				onChange={value => {
					setPlacement(value as any)
				}}
			>
				<Radio label="left">Left</Radio>
				<Radio label="top">Top</Radio>
				<Radio label="right">Right</Radio>
				<Radio label="bottom">Bottom</Radio>
			</Radio.Group>
			<Divider />
			<Button onClick={() => setVisible(true)}>Show drawer</Button>
			<Drawer visible={visible} placement={placement} onCancel={() => setVisible(false)}>
				<h1>Title</h1>
			</Drawer>
			<Divider />
			<Button onClick={() => setVisible1(true)}>Closable</Button>
			<Drawer closable maskClosable={false} width={300} visible={visible1} onCancel={() => setVisible1(false)}>
				<h1>Title</h1>
			</Drawer>
		</>
	)
}

export default DrawerExample
