import React, { FC } from 'react'
import { Route, Routes, NavLink } from 'react-router-dom'
import { cls } from 'gray-utils'
import './App.scss'
import ExampleIndex from './views/ExampleIndex'
import ButtonExample from './views/ButtonExample'
import DatePickerExample from './views/DatePickerExample'
import SwitchExample from './views/SwitchExample'
import RadioExample from './views/RadioExample'
import CheckboxExample from './views/CheckboxExample'

const App: FC = () => {
	const getNavCls = (props: { isActive: boolean }): string =>
		cls('nav-item', {
			active: props.isActive
		})
	return (
		<div className="example">
			<div className="nav-bar">
				<NavLink to="/" className={getNavCls}>
					Index
				</NavLink>
				<NavLink to="/button" className={getNavCls}>
					Button
				</NavLink>
				<NavLink to="/date-picker" className={getNavCls}>
					Date Picker
				</NavLink>
				<NavLink to="/switch" className={getNavCls}>
					Switch
				</NavLink>
				<NavLink to="/radio" className={getNavCls}>
					Radio
				</NavLink>
				<NavLink to="/checkbox" className={getNavCls}>
					Checkbox
				</NavLink>
			</div>
			<div className="content">
				<Routes>
					<Route path="/">
						<Route index element={<ExampleIndex />} />
						<Route path="button" element={<ButtonExample />} />
						<Route path="date-picker" element={<DatePickerExample />} />
						<Route path="switch" element={<SwitchExample />} />
						<Route path="radio" element={<RadioExample />} />
						<Route path="checkbox" element={<CheckboxExample />} />
					</Route>
				</Routes>
			</div>
		</div>
	)
}

export default App
