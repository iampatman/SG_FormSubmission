// @flow
import React from 'react'
import FormTextInput from './Form.TextInput'

export default (inputLocals: Object) => {
  let locals: Object = inputLocals // eslint-disable-line prefer-const
  if (!locals.keyboardType) {
    locals.keyboardType = 'default'
  }

  if (!locals.autoCapitalize) {
    locals.autoCapitalize = 'none'
  }

  if (!locals.editable) {
    locals.editable = true
  }

  if (!locals.config.autoCapitalize) {
    locals.config.autoCapitalize = 'sentences'
  }

  return <FormTextInput locals={locals}/>
}
