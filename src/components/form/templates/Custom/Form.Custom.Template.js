// @flow
import FormCustom from './Form.Custom'

export default (locals: Object) => {
  const {component, ...others} = locals.config
  return FormCustom(others)(component)
}
