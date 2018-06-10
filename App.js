import React, { Component } from 'react'
import Routes from './src/navigation/Routes'
import DetailRoutes from './src/navigation/DetailStack'
import CONFIG from './src/utils/Config'

export default class App extends Component<> {

  constructor (props) {
    super(props)
    CONFIG.rootTag = props.rootTag ? props.rootTag : '1'
    CONFIG.token = props.token != null ? props.token : 'Token 76c2fb4fbc228e154d0e75ebd4d7cf3a5d68d1ec'
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

