import { mdiAccount, mdiFileImageRemove } from '@mdi/js'
import React, { FC } from 'react'
import { Avatar, Divider, Icon, Space } from '../../packages'

const AvatarExample: FC = () => {
	const picSrc = 'https://iph.href.lu/200x200'
	return (
		<>
			<h1>Avatar</h1>
			<Space size="large">
				<Avatar round size="small" src={picSrc} />
				<Avatar round size="medium" src={picSrc} />
				<Avatar round size="large" src={picSrc} />
			</Space>
			<Divider />
			<Space size="large">
				<Avatar size="small" src={picSrc} />
				<Avatar size="medium" src={picSrc} />
				<Avatar size="large" src={picSrc} />
			</Space>
			<Divider />
			<Avatar src={picSrc}>
				<Icon path={mdiAccount} size="24px" />
			</Avatar>
			<Divider />
			<Avatar src={picSrc}>text</Avatar>
			<Divider />
			<Avatar src="http://error.path.jpg" fallback={<Icon path={mdiFileImageRemove} size="24px" />} />
			<Divider />
			<Avatar badge="99+" src={picSrc} />
			<Divider />
			<Avatar.Group size="small">
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group size="medium">
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group size="large">
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group overlapFrom="right" size="small">
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group overlapFrom="right" size="medium">
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
			</Avatar.Group>
			<Divider />
			<Avatar.Group overlapFrom="right" size="large">
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
				<Avatar round src={picSrc} />
			</Avatar.Group>
		</>
	)
}

export default AvatarExample
