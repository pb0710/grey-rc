import React from 'react'
import { Divider, Space } from '../../packages'
import Tag from '../../packages/modules/tag'

const TagExample = () => {
	return (
		<>
			<h1>Tag</h1>
			<Space>
				<Tag>Basic</Tag>
				<Tag round>Round</Tag>
				<Tag bordered>Round</Tag>
				<Tag bordered round>
					Round
				</Tag>
			</Space>
			<Divider />
			<Space>
				<Tag closable>Closable</Tag>
				<Tag
					closable
					onClose={() =>
						new Promise(resolve => {
							setTimeout(() => {
								resolve()
							}, 2000)
						})
					}
				>
					Async close
				</Tag>
			</Space>
		</>
	)
}

export default TagExample
