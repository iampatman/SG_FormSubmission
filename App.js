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
    CONFIG.token = props.token != null ? props.token : 'Token cbcb4e39ddb2c7f24e602079d5b5991c59d09b63'
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

