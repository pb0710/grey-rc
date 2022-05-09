import React from 'react'
import ButtonExample from './views/ButtonExample'
import SwitchExample from './views/SwitchExample'
import RadioExample from './views/RadioExample'
import CheckboxExample from './views/CheckboxExample'
import InputExample from './views/InputExample'
import TooltipExample from './views/TooltipExample'
import CollapseExample from './views/CollapseExample'
import LoadingExample from './views/LoadingExample'
import ListExample from './views/ListExample'
import ModalExample from './views/ModalExample'
import CardExample from './views/CardExample'
import ProgressExample from './views/ProgressExample'
import AvatarExample from './views/AvatarExample'
import ImageExample from './views/ImageExample'

export const componentRoutes = [
	{
		name: 'Button',
		path: 'button',
		element: <ButtonExample />
	},
	{
		name: 'Switch',
		path: 'switch',
		element: <SwitchExample />
	},
	{
		name: 'Radio',
		path: 'radio',
		element: <RadioExample />
	},
	{
		name: 'Checkbox',
		path: 'checkbox',
		element: <CheckboxExample />
	},
	{
		name: 'Input',
		path: 'input',
		element: <InputExample />
	},
	{
		name: 'Tooltip',
		path: 'tooltip',
		element: <TooltipExample />
	},
	{
		name: 'Collapse',
		path: 'collapse',
		element: <CollapseExample />
	},
	{
		name: 'Loading',
		path: 'loading',
		element: <LoadingExample />
	},
	{
		name: 'List',
		path: 'list',
		element: <ListExample />
	},
	{
		name: 'Modal',
		path: 'modal',
		element: <ModalExample />
	},
	{
		name: 'Card',
		path: 'card',
		element: <CardExample />
	},
	{
		name: 'Progress',
		path: 'progress',
		element: <ProgressExample />
	},
	{
		name: 'Avatar',
		path: 'avatar',
		element: <AvatarExample />
	},
	{
		name: 'Image',
		path: 'image',
		element: <ImageExample />
	}
]

const routes = [
	{
		path: 'component',
		children: componentRoutes
	}
]

export default routes
