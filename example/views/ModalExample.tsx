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
				<Card bordered={false} onCancel={hide}>
					1232
				</Card>
			</Modal>
			<Divider />
			<Card onCancel={hide}>1232</Card>
		</>
	)
}

export default ModalExample
