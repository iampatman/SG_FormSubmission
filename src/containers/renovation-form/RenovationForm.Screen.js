import React from 'react'
import { View, TextInput, Dimensions, Modal, Alert, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from './RenovationForm.Style'
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

export default class RenovationFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Renovation'
  }

  constructor (props) {
    super(props)
    this.data = {
      formtype: 3,
      type: '',
      email: CONFIG.userDetails.email,
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
      showingMovingContractor: false,
      tagChecked: false,
      loading: true,
      commenceDateSelected: false,
      renovationTypes: []
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    loadData(DATA_TYPE.RENOVATION).then((tdata) => {
      console.log('tdata ' + JSON.stringify(tdata))
      this.setState({
        vehicleTypes: tdata,
        loading: false
      })
    }).catch()
  }

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
    const {renovationTypes} = this.state
    const selectedId = renovationTypes.filter((obj) => obj.name === text[0])[0].id
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
    const {renovationTypes} = this.state

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} text={'Submitting'}/>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refVehicleType = ref}
                     style={styles.input}
                     placeholder={'Renovation Type'}
                     onFocus={() => showPicker({
                       pickerData: renovationTypes.map((item) => item.name),
                       onPickerConfirm: this.onTenantTypeSelected
                     })}/>

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