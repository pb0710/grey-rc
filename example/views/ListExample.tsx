import { mdiApple, mdiGoogle, mdiTwitter } from '@mdi/js'
import React, { useState } from 'react'
import { Divider, Icon, List, Radio } from '../../packages'

const ListExample = () => {
	const [size, setSize] = useState<'small' | 'medium' | 'large'>('small')
	return (
		<>
			<h1>List</h1>
			<List>
				<List.Item>List item 1</List.Item>
				<List.Item>List item 2</List.Item>
				<List.Item>List item 2</List.Item>
			</List>
			<Divider />
			<Radio.Group
				style={{ marginBottom: 8 }}
				type="tab"
				value={size}
				onChange={value => {
					setSize(value as any)
				}}
			>
				<Radio label="small">Small</Radio>
				<Radio label="medium">Medium</Radio>
				<Radio label="large">Large</Radio>
			</Radio.Group>
			<List size={size}>
				<List.Item>List item 1</List.Item>
				<List.Item>List item 2</List.Item>
				<List.Item>List item 2</List.Item>
			</List>
			<Divider />
			<List bordered={false}>
				<List.Item>Rimless list item 1</List.Item>
				<List.Item>Rimless list item 2</List.Item>
				<List.Item>Rimless list item 2</List.Item>
			</List>
			<Divider />
			<List>
				<List.Item prefix={<Icon path={mdiApple} />}>Prefix list item 1</List.Item>
				<List.Item prefix={<Icon path={mdiTwitter} />}>Prefix list item 2</List.Item>
				<List.Item prefix={<Icon path={mdiGoogle} />}>Prefix list item 2</List.Item>
			</List>
			<Divider />
			<List>
				<List.Item suffix={<Icon path={mdiApple} />}>Suffix list item 1</List.Item>
				<List.Item suffix={<Icon path={mdiTwitter} />}>Suffix list item 2</List.Item>
				<List.Item suffix={<Icon path={mdiGoogle} />}>Suffix list item 2</List.Item>
			</List>
		</>
	)
}

export default ListExample
