import React from 'react'
import { View, TextInput, Dimensions, Modal, Alert, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from './RefundForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import { submitForm, DATA_TYPE, loadData } from '../../api/index'
import Loader from '../../components/loader/Loader'
import moment from 'moment'
import CONFIG from '../../utils/Config'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'

export default class RefundFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Refund'
  }

  constructor (props) {
    super(props)
    this.data = {
      formtype: 5,
      type: '',
      email: '',
      amount: '',
      account_name: '',
      account_no: '',
      file_upload: []
    }

    this.state = {
      loading: true,
      typeData: []
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    loadData(DATA_TYPE.REFUND).then((data) => {
      console.log('tdata ' + JSON.stringify(data))
      this.data.email = data.email
      this.setState({
        typeData: data.tdata,
        loading: false
      })
    }).catch()
  }

  // loadData = () => {
  //   loadData(DATA_TYPE.REFUND).then((tdata) => {
  //     console.log('tdata ' + JSON.stringify(tdata))
  //     this.setState({
  //       typeData: tdata,
  //       loading: false
  //     })
  //   }).catch()
  // }

  submitFormData = (data) => {
    const {navigation} = this.props
    console.log('Data submitForm' + data)
    this.setState({loading: true})
    submitForm(data).then((result) => {
      this.setState({loading: false})
      navigateToThankyou(navigation)
    }).catch((errorMsg) => {
      Alert.alert('Error', errorMsg, [{
        text: 'OK', onPress: () => {
          this.setState({loading: false})
        }
      }], {cancelable: false})
    })
  }

  onSubmitPressed = () => {
    console.log('Data onSubmitPressed' + JSON.stringify(this.data))
    this.submitFormData(this.data)
  }

  onTenantTypeSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    const {typeData} = this.state
    const selectedId = typeData.filter((obj) => obj.name === text[0])[0].id
    this.data.type = selectedId
    this.refVehicleType.setNativeProps({text: text[0]})
  }

  render () {
    const {typeData} = this.state

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} text={'Submitting'}/>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refVehicleType = ref}
                     style={styles.input}
                     placeholder={'Refund Type'}
                     onFocus={() => showPicker({
                       pickerData: typeData.map((item) => item.name),
                       onPickerConfirm: this.onTenantTypeSelected
                     })}/>
          <TextInput style={styles.input} placeholder={'Amount'}
                     onChangeText={(text) => {this.data.amount = text}}/>
          <TextInput style={styles.input} placeholder={'Account Name'}
                     onChangeText={(text) => {this.data.account_name = text}}/>
          <TextInput style={styles.input} placeholder={'Account Number'}
                     onChangeText={(text) => {this.data.account_no = text}}/>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10}}>
            <Button type={'ghost'} onClick={this.uploadFile}>Attach Agreement</Button>
          </View>

        </ScrollView>
        <Button
          type={'primary'}
          style={styles.submitBtn}
          onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}