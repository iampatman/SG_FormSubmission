import React, { Component } from 'react'
import Routes from './src/navigation/Routes'
import DetailRoutes from './src/navigation/DetailStack'
import CONFIG from './src/utils/Config'
import setGlobalHandler from './src/utils/GlobalErrorHandler'

setGlobalHandler()

export default class App extends Component<> {

  constructor (props) {
    super(props)
    CONFIG.rootTag = props.rootTag ? props.rootTag : '1'
    CONFIG.token = props.token != null ? props.token : 'Token 21b6ce4aa462fcded25d9e17875751fe2ca1845f'
    CONFIG.url = props.url != null ? props.url : 'http://13.250.247.107:8003/v1/form'
    CONFIG.formid = props.formid != null ? parseInt(props.formid) : 0
    CONFIG.formtype = props.formtype != null ? parseInt(props.formtype) : 0
  }

  render () {
    console.log('CONFIG: ' + JSON.stringify(CONFIG))

    if (CONFIG.formid == 0 || CONFIG.formtype == 0) {
      return (
        <Routes/>
      )
    } else {
      return (
        <DetailRoutes/>
      )
    }

  }
}

