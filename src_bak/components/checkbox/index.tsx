import { Checkbox as _Checkbox } from './Checkbox'
import { CheckboxGroup as _CheckboxGroup } from './CheckboxGroup'

export const Checkbox = _Checkbox as typeof _Checkbox & { Group: typeof _CheckboxGroup }
Checkbox.Group = _CheckboxGroup
