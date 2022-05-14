import React, { useState } from 'react'
import { Button, Card, Divider, Modal } from '../../packages'

const ModalExample = () => {
	const [visible, setVisible] = useState(false)
	const show = () => setVisible(true)
	const hide = () => setVisible(false)
	return (
		<>
			<h1>Modal</h1>
			<Button onClick={show}>Show modal</Button>
			<Modal visible={visible} title="Basic Modal" onCancel={hide}>
				<Card>Content</Card>
			</Modal>
			<Divider />
		</>
	)
}

export default ModalExample
