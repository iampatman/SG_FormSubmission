import React from 'react'
import { View, TextInput, Dimensions, Modal, Alert, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from './VehicleForm.Style'
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

export default class VehicleFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Vehicle'
  }

  constructor (props) {
    super(props)
    this.data = {
      formtype: 4,
      type: '',
      email: '',
      unit_no: '',
      usage_start_date: '',
      usage_end_date: '',
      vehicle_no:'',
      file_upload: []
    }

    this.state = {
      showingCalendarPicker: false,
      showingMovingContractor: false,
      tagChecked: false,
      loading: true,
      loadingText: 'Loading',
      commenceDateSelected: false,
      vehicleTypes: []
    }
  }

  componentDidMount () {
    this.loadData()
  }


  loadData = () => {
    loadData(DATA_TYPE.VEHICLE).then((data) => {
      console.log('tdata ' + JSON.stringify(data))
      this.data.email = data.email
      this.data.unit_no = data.unit_no
      this.setState({
        vehicleTypes: data.tdata,
        loading: false
      })
    }).catch()
  }

  // loadData = () => {
  //   loadData(DATA_TYPE.VEHICLE).then((tdata) => {
  //     console.log('tdata ' + JSON.stringify(tdata))
  //     this.setState({
  //       vehicleTypes: tdata,
  //       loading: false
  //     })
  //   }).catch()
  // }

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

  onSubmitPressed = () => {
    console.log('Data onSubmitPressed' + JSON.stringify(this.data))
    this.submitFormData(this.data)
  }

  onCalendarChanged = (date: Date) => {
    let dateStr = date.toDateString()
    let formattedStr = moment(dateStr, 'ddd MMM DD YYYY').format('YYYY/MM/DD')
    // console.log('CalendarPicker ' + formattedStr)
    this.refTenancyFrom.setNativeProps({text: formattedStr})
    if (this.state.commenceDateSelected == true) {
      this.data.usage_start_date = formattedStr
    } else {
      this.data.usage_end_date = formattedStr

    }
    this.setState({
      showingCalendarPicker: false,
    })
  }
  // uploadFile = (fileId) => {
  //   DocumentPicker.show({
  //     filetype: [DocumentPickerUtil.allFiles()],
  //   }, (error, res) => {
  //     // Android
  //     console.log(
  //       res.uri,
  //       res.type, // mime type
  //       res.fileName,
  //       res.fileSize
  //     )
  //   })
  // }
  onTenantTypeSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    const {vehicleTypes} = this.state
    const selectedId = vehicleTypes.filter((obj) => obj.name === text[0])[0].id
    this.data.type = selectedId
    this.refVehicleType.setNativeProps({text: text[0]})
  }

  render () {
    const {vehicleTypes, loadingText, loading} = this.state

    return (
      <View style={styles.container}>
        <Loader loading={loading} text={loadingText}/>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refVehicleType = ref}
                     style={styles.input}
                     placeholder={'Vehicle Type'}
                     onFocus={() => showPicker({
                       pickerData: vehicleTypes.map((item) => item.name),
                       onPickerConfirm: this.onTenantTypeSelected
                     })}/>
          <TextInput style={styles.input} placeholder={'Vehcle Number'}
                     onChangeText={(text) => {this.data.vehicle_no = text}}/>

          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({showingCalendarPicker: true, commenceDateSelected: true})}>
            <Text ref={ref => this.refTenancyFrom = ref}>
              {this.data.usage_start_date == '' ? 'Usage Start Date' : this.data.usage_start_date}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({
                              showingCalendarPicker: true,
                              commenceDateSelected: false
                            })}>
            <Text>
              {this.data.usage_end_date == '' ? 'Usage Start Date' : this.data.usage_end_date}
            </Text>
          </TouchableOpacity>
          <View
            style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginVertical: 10}}>
            <Button type={'ghost'} onClick={this.uploadFile}>Attach Agreement</Button>
          </View>
          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Select Date'}
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