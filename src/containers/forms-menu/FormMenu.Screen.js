import React from 'react'
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import styles from './FormMenu.Style'
import listData from './FormMenu.Form'
import {
  navigateToHistory, navigateToMovingForm,
  navigateToRentalForm
} from '../../navigation/helpers/Nav.FormMenu.Helper'

export default class FormMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Form Submission'
  }

  onMenuSelected = (id) => {
    const {navigation} = this.props
    switch (id) {
      case 1:
        navigateToMovingForm(navigation)
        return
      case 2:
        navigateToRentalForm(navigation)
    }
  }

  onShowHistoryPressed = () => {
    const {navigation} = this.props
    navigateToHistory(navigation)
  }

  renderItem = (item) => {
    return (
      <TouchableOpacity style={styles.itemContainer} onPress={() => this.onMenuSelected(item.id)}>
        <Image source={item.icon} style={styles.iconImage}/>
        <Text style={styles.menuTitleText}>{item.title}</Text>
      </TouchableOpacity>
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.historyContainer} onPress={this.onShowHistoryPressed}>
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