import React from 'react'
import { Divider, Space } from '../../packages'
import { Tag } from '../../packages'

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
				<Tag size="small">Small</Tag>
				<Tag size="medium">Medium</Tag>
				<Tag size="large">Large</Tag>
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
