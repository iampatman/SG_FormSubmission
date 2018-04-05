import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from './FormMenu.Style'
import listData from './FormMenu.Form'

export default class FormMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Form Submission'
  }
  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.itemContainer}>
        <Image source={item.icon} style={styles.iconImage}/>
        <Text style={styles.menuTitleText}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.historyContainer}>
          <Text>Check Submission History</Text>
        </TouchableOpacity>
        <FlatList data={listData}
                  renderItem={(item) => this.renderItem(item.item)}
                  numColumns={3}
                  scrollEnabled={false}
                  keyExtractor={(item) => item.id}
        />
      </View>
    )
  }
}