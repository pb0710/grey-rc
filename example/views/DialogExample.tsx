import React, { useState } from 'react'
import { Button, Divider, Dialog } from '../../packages'

const DialogExample = () => {
	const [visible, setVisible] = useState(false)
	const show = () => setVisible(true)
	const hide = () => setVisible(false)
	return (
		<>
			<h1>Dialog</h1>
			<Button onClick={show}>Show dialog</Button>
			<Dialog visible={visible} title="Basic Dialog" onCancel={hide}>
				Content
			</Dialog>
			<Divider />
		</>
	)
}

export default DialogExample
