import { mdiApple, mdiGoogle, mdiTwitter } from '@mdi/js'
import React from 'react'
import { Divider, Icon, List } from '../../packages'

const ListExample = () => {
	return (
		<>
			<h1>List</h1>
			<List>
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
