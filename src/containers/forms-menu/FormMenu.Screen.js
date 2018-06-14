import React from 'react'
import {
  View, Text, FlatList, Image,
  TouchableOpacity, NativeModules, Platform,
} from 'react-native'
import styles from './FormMenu.Style'
import listData from './FormMenu.Form'
import {
  navigateToHistory, navigateToMovingForm, navigateToRefundForm, navigateToRenovationForm,
  navigateToRentalForm, navigateToVehicleForm
} from '../../navigation/helpers/Nav.FormMenu.Helper'
import CONFIG from '../../utils/Config'

const {ReactManager} = NativeModules

export default class FormMenuScreen extends React.Component {
  static navigationOptions = {
    title: 'Form Submission',
    headerLeft: <TouchableOpacity onPress={() => {
      FormMenuScreen.goBackStaticFunc()}}>
      <Image source={require('../../assets/images/left-arrow.png')} style={{height: 20, width: 20, marginLeft: 10}}/>
    </TouchableOpacity>
  }

  static goBackStaticFunc = () => {
    if (CONFIG.rootTag != -1) {
      console.log('goBackToLifeUp app rootTag ' + CONFIG.rootTag)
      if (Platform.OS === 'ios') {
        ReactManager.dismissPresentedViewController(CONFIG.rootTag)
      } else {
        NativeModules.QRActivityStarter.goback_LifeUp()
      }

    }
  }

  onMenuSelected = (id) => {
    const {navigation} = this.props
    switch (id) {
      case 1:
        navigateToMovingForm(navigation)
        return
      case 2:
        navigateToRentalForm(navigation)
        return
      case 3:
        navigateToRenovationForm(navigation)
        return
      case 4:
        navigateToVehicleForm(navigation)
        return
      case 5:
        navigateToRefundForm(navigation)
        return
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
        {/*<TouchableOpacity style={styles.historyContainer} onPress={this.onShowHistoryPressed}>*/}
        {/*<Text>Check Submission History</Text>*/}
        {/*</TouchableOpacity>*/}
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