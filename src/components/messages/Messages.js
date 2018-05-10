import React from 'react'
import {
  View,
  Text,
  FlatList, SectionList, TextInput
} from 'react-native'
import styles from './Messages.Style'
import { loadFormDetail } from '../../api/index'
import { Button } from 'antd-mobile'

export default class Messages extends React.Component {
  constructor (props) {
    super(props)
    console.log('messages props' + JSON.stringify(props))
    // const {params} = this.props.navigation.state
    this.state = {
      // formId: params.formId,
      newmsg: '',
      data: props.data,
      // onSend: params.onSend
    }
  }

  componentWillReceiveProps = (newProps) => {
    this.setState({
      data: newProps.data
    })
  }
  renderItem = ({item, index}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitleText} key={index}>{item.create_by}</Text>
        </View>
        <View style={styles.itemDetailContainer}>
          <Text key={index}>{item.detail}</Text>
          <Text style={styles.timeTagText} key={index}>{item.created_time}</Text>
        </View>
      </View>
    )
  }

  render () {
    const {data} = this.state
    console.log('messages data' + JSON.stringify(data))
    return (
      <View style={styles.container}>
        <View style={styles.sendMsgContainer}>
          <TextInput style={styles.messageInput}
                     placeholder={'Type your message here'}
                     onChangeText={(text) => this.setState({newmsg: text})}/>
          <Button disabled={this.state.newmsg == ''}
                  type={'primary'}
                  style={styles.submitBtn}
                  onClick={this.onSubmitPressed}>Send</Button>
        </View>
        <FlatList
          data={data}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}