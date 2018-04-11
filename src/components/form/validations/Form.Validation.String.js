// @flow
import t from 'tcomb-form-native'
import {getFormItemPath} from '../Form.Util'

const String = t.refinement(t.String, function (str) {
  return typeof str === 'string'
})

// if you define a getValidationErrorMessage function, it will be called on validation errors
String.getValidationErrorMessage = function (value: string, path: Array<string>, context: Object) {
  const {tr} = context
  const itemPath = getFormItemPath(path)

  if (!value) {
    return {
      type: 'empty',
      message: tr('string_empty', {path: itemPath})
    }
  }

  return {
    type: 'invalid',
    message: tr('string_invalid', {path: itemPath})
  }
}

export default String
