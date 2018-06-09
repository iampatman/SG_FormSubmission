import React from 'react'
import {
  View,
  TextInput,
  Dimensions,
  Modal,
  Alert,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Keyboard
} from 'react-native'
import styles from './RenovationForm.Style'

import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import { submitForm, DATA_TYPE, loadData } from '../../api/index'
import Loader from '../../components/loader/Loader'
import moment from 'moment'
import RNFetchBlob from 'react-native-fetch-blob'
import Images from '../../assets/Images'
import showUploadFileActionSheet, { SELECTED_TYPE } from '../../components/uploader/Uploader'

export default class RenovationFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Renovation'
  }

  constructor (props) {
    super(props)
    this.data = {
      formtype: 3,
      type: '',
      email: '',
      unit_no: '',
      commence_date: '',
      completed_date: '',
      engaging_contractor: {
        choose: false,
        mover_name: '',
        mover_address: '',
        mover_phno: '',
        mover_email: '',
        vehicle_type: ''
      },
      file_upload: []
    }

    this.state = {
      showingCalendarPicker: false,
      isKeyboardVisible: false,
      showingMovingContractor: false,
      tagChecked: false,
      loading: true,
      loadingText: 'Loading',
      commenceDateSelected: false,
      typeData: [],
      uploadedPhoto: Images.picture_frame_icon,
      selectedDocumentFileName: ''
    }
  }

  componentDidMount = () => {
    this.loadData()
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow)
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide)
  }

  componentWillUnmount = () => {
    this.keyboardDidShowListener.remove()
    this.keyboardDidHideListener.remove()
  }

  _keyboardDidShow = () => {
    console.log('_keyboardDidShow')
    this.setState({
      isKeyboardVisible: true
    })
  }

  _keyboardDidHide = () => {
    console.log('_keyboardDidHide')

    this.setState({
      isKeyboardVisible: false
    })
  }

  loadData = () => {
    loadData(DATA_TYPE.RENOVATION).then((data) => {
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
    const {type, commence_date, completed_date} = this.data
    if (type == '' || commence_date == '' || completed_date == '') {
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

  onCalendarChanged = (date: Date) => {
    let dateStr = date.toDateString()
    let formattedStr = moment(dateStr, 'ddd MMM DD YYYY').format('YYYY/MM/DD')
    // console.log('CalendarPicker ' + formattedStr)
    this.refTenancyFrom.setNativeProps({text: formattedStr})
    if (this.state.commenceDateSelected == true) {
      this.data.commence_date = formattedStr
    } else {
      this.data.completed_date = formattedStr

    }
    this.setState({
      showingCalendarPicker: false,
    })
  }

  uploadFile = () => {
    this.data.file_upload = []
    const onComplete = (fileType, response) => {
      switch (fileType) {
        case SELECTED_TYPE.DOCUMENT:
          RNFetchBlob.fs.readFile(response.uri, 'base64')
            .then((data) => {
              console.log(`fileName ${response.fileName} bdata length ${data.length}`)
              this.data.file_upload.push({name: response.fileName, bdata: data})
            })
          if (response != null) {
            this.setState({
              selectedDocumentFileName: response.fileName,
              uploadedPhoto: Images.document_icon
            })
          }
          break
        case SELECTED_TYPE.IMAGE:
          this.data.file_upload.push({name: response.fileName, bdata: response.data})
          this.setState({
            uploadedPhoto: {uri: response.uri},
          })
          break
      }
    }
    showUploadFileActionSheet({
      onComplete
    })
  }

  onTenantTypeSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    const {typeData} = this.state
    const selectedId = typeData.filter((obj) => obj.name === text[0])[0].id
    this.data.type = selectedId
    this.refVehicleType.setNativeProps({text: text[0]})
  }

  renderContractorForm = () => {
    if (this.state.showingMovingContractor) {
      return (
        <View>
          <TextInput style={styles.input} placeholder={'Mover Name'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_name = text}}/>
          <TextInput style={styles.input} placeholder={'Mover Address'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_address = text}}/>
          <TextInput style={styles.input} placeholder={'Mover Mobile Number'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_phno = text}}/>
          <TextInput style={styles.input} placeholder={'Mover Email'}
                     onChangeText={(text) => {this.data.engaging_contractor.mover_email = text}}/>
          <TextInput style={styles.input} placeholder={'Vehicle Type'}
                     onChangeText={(text) => {this.data.engaging_contractor.vehicle_type = text}}/>
        </View>
      )
    } else {
      return null
    }
  }

  render () {
    const {
      typeData, loadingText, loading,
      uploadedPhoto, selectedDocumentFileName, isKeyboardVisible
    } = this.state
    const containerStyle = isKeyboardVisible == true ? {paddingBottom: 230} : {paddingBottom: 80}

    return (
      <View style={styles.container}>
        <Loader loading={loading} text={loadingText}/>
        <ScrollView contentContainerStyle={containerStyle}>
          <TextInput ref={ref => this.refVehicleType = ref}
                     style={styles.input}
                     placeholder={'Renovation Type'}
                     onFocus={() => showPicker({
                       pickerData: typeData.map((item) => item.name),
                       onPickerConfirm: this.onTenantTypeSelected
                     })}/>
          <TextInput style={styles.input} placeholder={'Unit'} value={this.data.unit_no} editable={false}/>
          <TextInput style={styles.input} placeholder={'Email address'} value={this.data.email} editable={false}/>
          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({showingCalendarPicker: true, commenceDateSelected: true})}>
            <Text ref={ref => this.refTenancyFrom = ref}>
              {this.data.commence_date == '' ? 'Commencement Date' : this.data.commence_date}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({
                              showingCalendarPicker: true,
                              commenceDateSelected: false
                            })}>
            <Text ref={ref => this.refTenancyTo = ref}>
              {this.data.completed_date == '' ? 'Complete Date' : this.data.completed_date}
            </Text>
          </TouchableOpacity>
          <View style={{flexDirection: 'row'}}>
            <Text>Engaging Contractor/Mover</Text>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.data.engaging_contractor.choose = selected.target.checked
              this.setState({showingMovingContractor: selected.target.checked})
            }}/>
          </View>
          {this.renderContractorForm()}
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10}}>
            <Button type={'ghost'} onClick={this.uploadFile}>Attach Agreement</Button>
            <Image source={uploadedPhoto} style={{height: 50, width: 50}}/>
            <Text>{selectedDocumentFileName}</Text>
          </View>
          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={this.onCalendarChanged}/>
        </ScrollView>
        <Button
          type={'primary'}
          style={styles.submitBtn}
          onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}