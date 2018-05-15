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
    CONFIG.token = props.token != null ? props.token : 'Token 6ab82e9a877c90550754a6c6e82857530e8218f3'
    CONFIG.url = props.url != null ? props.url : 'http://13.250.247.107/v1/form'
    CONFIG.formid = props.formid != null ? props.formid : 0
    CONFIG.formtype = props.formtype != null ? props.formtype : 0
  }

  render () {
    return (
      <Routes/>
    )
  }
}

