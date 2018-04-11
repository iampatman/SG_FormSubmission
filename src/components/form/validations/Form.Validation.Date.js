// @flow
import t from 'tcomb-form-native'
import {getFormItemPath} from '../Form.Util'

const Date = t.refinement(t.Date, function (date) {
  return (date instanceof Date)
})

Date.getValidationErrorMessage = function (value: string, path: Array<string>, context: Object) {
  const {tr} = context
  const itemPath = getFormItemPath(path)

  if (!value) {
    return {
      type: 'empty',
      message: tr('date_empty', {path: itemPath})
    }
  }

  return {
    type: 'invalid',
    message: tr('date_invalid', {path: itemPath})
  }
}

export default Date
