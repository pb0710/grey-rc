import React, { FC, useState } from 'react'
import { Button, Card, Divider, Modal } from '../../packages'

const ModalExample: FC = () => {
	const [visible, setVisible] = useState(false)
	const show = () => setVisible(true)
	const hide = () => setVisible(false)
	return (
		<>
			<h1>Modal</h1>
			<Button onClick={show}>show modal</Button>
			<Modal visible={visible} onCancel={hide}>
				<Card title="modal" bordered={false} shadow onCancel={hide}>
					content
				</Card>
			</Modal>
			<Divider />
		</>
	)
}

export default ModalExample
