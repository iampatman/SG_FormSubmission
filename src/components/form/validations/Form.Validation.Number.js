// @flow
import t from 'tcomb-form-native'
import validator from 'validator'
import {getFormItemPath} from '../Form.Util'

const Number = t.refinement(t.Number, function (num) {
  return validator.isNumeric(num)
})

Number.getValidationErrorMessage = function (value: string, path: Array<string>, context: Object) {
  const {tr} = context
  const itemPath = getFormItemPath(path)

  if (value === undefined || value === null) {
    return {
      type: 'empty',
      message: tr('number_empty', {path: itemPath})
    }
  }

  return {
    type: 'invalid',
    message: tr('number_invalid', {path: itemPath})
  }
}

export default Number
