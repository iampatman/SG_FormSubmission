import React from 'react'
import { View, TextInput } from 'react-native'
import styles from './MovingForm.Style'
import { schema } from './MovingForm.Schema'

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }

  render () {
    return (
      <View style={styles.container}>
        <Form
          schema={schema}/>
      </View>
    )
  }
}