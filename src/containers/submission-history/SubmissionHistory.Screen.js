import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView, FlatList, Image } from 'react-native'
import styles from './SubmissionHistory.Style'

import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'

export default class SubmissionHistoryScreen extends React.Component {
  static navigationOptions = {
    title: 'Form Submission History'
  }

  constructor (props) {
    super(props)
    this.state = {

    }

  }

  getIconFromFormTypeId = (formTypeId, hightlight) => {

    switch (formTypeId) {
      case '1':
        return hightlight ? require('../../assets/icons/ic_moving_blue.png') : require('../../assets/icons/ic_moving_grey.png')
      case '2':
        return hightlight ? require('../../assets/icons/ic_rental_blue.png') : require('../../assets/icons/ic_rental_grey.png')
      case '3':
        return hightlight ? require('../../assets/icons/ic_renovation_blue.png') : require('../../assets/icons/ic_renovation_grey.png')
      case '4':
        return hightlight ? require('../../assets/icons/ic_car_blue.png') : require('../../assets/icons/ic_car_grey.png')
      case '5':
        return hightlight ? require('../../assets/icons/ic_wallet_blue.png') : require('../../assets/icons/ic_wallet_grey.png')
    }
  }

  renderItem = (item) => {

    const highlight = item.status == 'Pending'
    const textStyle = highlight ? null : styles.detailTextStyle1
    const icon = this.getIconFromFormTypeId(item.formTypeId, highlight)
    return (
      <View style={styles.itemContainer}>
        <Image source={icon}/>
        <View style={styles.detailContainer}>
          <Text style={textStyle}>
            {item.formTypeName}
          </Text>
          <Text style={textStyle}>
            Status: {item.status}
          </Text>
        </View>
        <View style={styles.itemRightContainer}>
          <Text style={textStyle}>
            {item.date}
          </Text>
          {item.hasNewMessage ? <View style={styles.newMsgContainer}>
              <Text style={styles.newMsgText}>New Message</Text>
            </View>
            : null}
        </View>
      </View>
    )
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator}></View>
    )
  }

  render () {
    const data = [
      {
        formId: '1',
        formTypeId: '1',
        formTypeName: 'Moving',
        status: 'Pending',
        date: '23/10/2018',
        hasNewMessage: false
      },
      {
        formId: '2',
        formTypeId: '2',
        formTypeName: 'Moving',
        status: 'Pending',
        date: '23/10/2018',
        hasNewMessage: true
      },
      {
        formId: '3',
        formTypeId: '3',
        formTypeName: 'Wallet Refund',
        status: 'Approved',
        date: '23/10/2018',
        hasNewMessage: false
      }
    ]
    return (
      <View style={styles.container}>
        <FlatList data={data}
                  renderItem={(item) => this.renderItem(item.item)}
                  keyExtractor={(item) => item.formId}
                  ItemSeparatorComponent={this.renderSeparator}/>
      </View>
    )
  }
}