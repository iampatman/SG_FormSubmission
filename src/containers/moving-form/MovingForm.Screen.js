import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from './MovingForm.Style'
import { Picker, List, WhiteSpace } from 'antd-mobile';

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }


  render () {
    return (
      <View style={styles.container}>
        <TextInput placeholder={'Moving Situation'} />
        <TextInput placeholder={'Moving Date'} />
        <TextInput placeholder={'Unit'} />
        <TextInput placeholder={'Email address'} value={'nguyentrung0904@gmail.com'} />
        <TextInput placeholder={'Description'} />
      </View>
    )
  }
}