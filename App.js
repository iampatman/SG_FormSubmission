/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Routes from './src/navigation/Routes'
import CONFIG from './src/utils/Config'

type
Props = {}
export default class App extends Component<Props> {

  constructor (props) {
    super(props)
    CONFIG.rootTag = props.rootTag ? props.rootTag : '1'
    CONFIG.token = props.token != null ? props.token : 'Token e16a4044bc095771b2f5cab4955f25092fcfe2bd'
    CONFIG.url = props.url != null ? props.url : 'http://13.250.247.107:8003/v1/form'
    CONFIG.formid = props.formid != null ? props.formid : 0
    CONFIG.formtype = props.formtype != null ? props.formtype : 0
  }

  render () {
    return (
      <Routes/>
    )
  }
}

