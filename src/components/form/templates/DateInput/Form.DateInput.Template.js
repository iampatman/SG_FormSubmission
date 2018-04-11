// @flow
import React from 'react'
import FormDateInput from './Form.DateInput'

export default (inputLocals: Object) => {
  let locals: Object = inputLocals // eslint-disable-line prefer-const

  if (!locals.editable) {
    locals.editable = true
  }

  return <FormDateInput locals={locals}/>
}
