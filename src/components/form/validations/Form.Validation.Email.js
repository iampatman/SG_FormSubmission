// @flow
import t from 'tcomb-form-native'
import validator from 'validator'
import {getFormItemPath} from '../Form.Util'

const Email = t.refinement(t.String, function (str) {
  return validator.isEmail(str)
})

// if you define a getValidationErrorMessage function, it will be called on validation errors
Email.getValidationErrorMessage = function (value: string, path: Array<string>, context: Object) {
  const {tr} = context
  const itemPath = getFormItemPath(path)

  if (!value) {
    return {
      type: 'empty',
      message: tr('email_empty', {path: itemPath})
    }
  }

  return {
    type: 'invalid',
    message: tr('email_invalid', {path: itemPath})
  }
}

export default Email
