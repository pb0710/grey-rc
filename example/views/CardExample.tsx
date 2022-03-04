import React, { FC } from 'react'
import { Button, Divider, Card } from '../../packages'

const CardExample: FC = () => {
	return (
		<>
			<h1>Card</h1>
			<Button>show modal</Button>
			<Card>1232</Card>
			<Divider />
			<Card>1232</Card>
		</>
	)
}

export default CardExample
