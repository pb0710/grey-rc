import React from 'react'
import { Navigate } from 'react-router-dom'
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
import FormExample from './views/FormExample'
import DialogExample from './views/DialogExample'
import PopupExample from './views/PopupExample'
import TabsExample from './views/TabsExample'
import SelectExample from './views/SelectExample'

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
	},
	{
		name: 'Form',
		path: 'form',
		element: <FormExample />
	},
	{
		name: 'Dialog',
		path: 'dialog',
		element: <DialogExample />
	},
	{
		name: 'Popup',
		path: 'popup',
		element: <PopupExample />
	},
	{
		name: 'Tabs',
		path: 'tabs',
		element: <TabsExample />
	},
	{
		name: 'Select',
		path: 'select',
		element: <SelectExample />
	}
]

const routes = [
	{
		path: 'component',
		children: componentRoutes
	},
	{
		path: '*',
		element: <Navigate to={`component/${componentRoutes[0].path}`} replace />
	}
]

export default routes
