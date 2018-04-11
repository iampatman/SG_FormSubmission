import React from 'react'

const FormCustom = (injectedProps) => WrappedComponent => {
  return <WrappedComponent {...injectedProps} />
}
export default FormCustom
