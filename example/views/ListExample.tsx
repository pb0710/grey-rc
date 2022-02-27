import { mdiApple, mdiGoogle, mdiTwitter } from '@mdi/js'
import React, { FC } from 'react'
import { Divider, Icon, List } from '../../packages'

const ListExample: FC = () => {
	return (
		<>
			<h1>List</h1>
			<List>
				<List.Item>list item 1</List.Item>
				<List.Item>list item 2</List.Item>
				<List.Item>list item 2</List.Item>
			</List>
			<Divider />
			<List bordered={false}>
				<List.Item>rimless list item 1</List.Item>
				<List.Item>rimless list item 2</List.Item>
				<List.Item>rimless list item 2</List.Item>
			</List>
			<Divider />
			<List>
				<List.Item prefix={<Icon path={mdiApple} />}>prefix list item 1</List.Item>
				<List.Item prefix={<Icon path={mdiTwitter} />}>prefix list item 2</List.Item>
				<List.Item prefix={<Icon path={mdiGoogle} />}>prefix list item 2</List.Item>
			</List>
			<Divider />
			<List>
				<List.Item suffix={<Icon path={mdiApple} />}>suffix list item 1</List.Item>
				<List.Item suffix={<Icon path={mdiTwitter} />}>suffix list item 2</List.Item>
				<List.Item suffix={<Icon path={mdiGoogle} />}>suffix list item 2</List.Item>
			</List>
		</>
	)
}

export default ListExample
