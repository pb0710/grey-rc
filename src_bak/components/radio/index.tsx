import { Radio as _Radio } from './Radio'
import { RadioGroup as _RadioGroup } from './RadioGroup'

export const Radio = _Radio as typeof _Radio & { Group: typeof _RadioGroup }
Radio.Group = _RadioGroup
