import { Input as _Input } from './Input'
import { Password as _Password } from './Password'
import { Textarea as _Textarea } from './Textarea'

export const Input = _Input as typeof _Input & { Password: typeof _Password } & { Textarea: typeof _Textarea }
Input.Password = _Password
Input.Textarea = _Textarea
