import React from 'react'
import { View, TextInput, Dimensions, Modal, Alert, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
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
import RNFetchBlob from 'react-native-fetch-blob'
import Images from '../../assets/Images'
import showUploadFileActionSheet, { SELECTED_TYPE } from '../../components/uploader/Uploader'

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
      loadingText: 'Loading',
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
      this.data.unit_no = data.unit_no
      this.setState({
        typeData: data.tdata,
        loading: false
      })
    }).catch()
  }

  setLoading = (loading, loadingText) => {
    this.setState({
      loading, loadingText
    })
  }

  submitFormData = (data) => {
    const {navigation} = this.props
    console.log('Data submitForm' + data)
    this.setLoading(true, 'Submitting')
    submitForm(data).then((result) => {
      this.setLoading(false)
      navigateToThankyou(navigation)
    }).catch((errorMsg) => {
      Alert.alert('Error', errorMsg, [{
        text: 'OK', onPress: () => {
          this.setLoading(false)
        }
      }], {cancelable: false})
    })
  }

  validateForm = () => {
    const {type, account_no, account_name, amount} = this.data
    if (type == '' || account_no == '' || account_name == '' || amount == '') {
      Alert.alert('Notice', 'Please fill all the fields')
      return false
    } else {
      return true
    }
  }
  onSubmitPressed = () => {
    if (this.validateForm() == false) {
      return
    }
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
    const {
      typeData, loading, loadingText,
      uploadedPhoto, selectedDocumentFileName
    } = this.state

    return (
      <View style={styles.container}>
        <Loader loading={loading} text={loadingText}/>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refVehicleType = ref}
                     style={styles.input}
                     placeholder={'Refund Type'}
                     onFocus={() => showPicker({
                       pickerData: typeData.map((item) => item.name),
                       onPickerConfirm: this.onTenantTypeSelected
                     })}/>
          <TextInput style={styles.input} placeholder={'Unit'} value={this.data.unit_no} editable={false}/>
          <TextInput style={styles.input} placeholder={'Email address'} value={this.data.email} editable={false}/>
          <TextInput style={styles.input} placeholder={'Amount'}
                     onChangeText={(text) => {this.data.amount = text}}/>
          <TextInput style={styles.input} placeholder={'Account Name'}
                     onChangeText={(text) => {this.data.account_name = text}}/>
          <TextInput style={styles.input} placeholder={'Account Number'}
                     onChangeText={(text) => {this.data.account_no = text}}/>

        </ScrollView>
        <Button
          type={'primary'}
          style={styles.submitBtn}
          onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}