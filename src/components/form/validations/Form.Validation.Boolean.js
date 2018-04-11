// @flow
import t from 'tcomb-form-native'
import validator from 'validator'
import {getFormItemPath} from '../Form.Util'

const Boolean = t.refinement(t.Boolean, function (num) {
  return validator.isBoolean(num)
})

Boolean.getValidationErrorMessage = function (value: string, path: Array<string>, context: Object) {
  const {tr} = context
  const itemPath = getFormItemPath(path)

  if (value === undefined || value === null) {
    return {
      type: 'empty',
      message: tr('boolean_empty', {path: itemPath})
    }
  }

  return {
    type: 'invalid',
    message: tr('boolean_invalid', {path: itemPath})
  }
}

export default Boolean
