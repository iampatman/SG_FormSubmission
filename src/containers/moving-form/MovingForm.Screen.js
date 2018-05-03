import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView, Alert, TouchableOpacity } from 'react-native'
import styles from './MovingForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import Loader from '../../components/loader/Loader'
import { loadMovingSituation, sendMovingForm } from '../../api/index'
import moment from 'moment'
import CONFIG from '../../utils/Config'

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }

  constructor (props) {
    super(props)

    this.data = {
      formtype: 1,
      moving_situation: '',
      moving_date: '',
      description: '',
      email: CONFIG.userDetails.email,
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
      loading: true,
      movingSituationData: []
    }
  }

  loadData = () => {
    loadMovingSituation().then((tdata) => {
      console.log('tdata ' + JSON.stringify(tdata))
      this.setState({
        movingSituationData: tdata,
        loading: false
      })
    }).catch()
  }

  componentDidMount () {
    this.loadData()
  }

  submitForm = (data) => {
    const {navigation} = this.props
    console.log('Data submitForm' + data)
    this.setState({loading: true})
    sendMovingForm(data).then((result) => {
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
    this.submitForm(this.data)
  }

  onCalendarChanged = (date: Date) => {
    let dateStr = date.toDateString()
    let formattedStr = moment(dateStr, 'ddd MMM DD YYYY').format('YYYY/MM/DD')
    console.log('CalendarPicker ' + formattedStr)
    this.refTenancyFrom.setNativeProps({text: formattedStr})
    this.data.moving_date = formattedStr
    this.setState({
      showingCalendarPicker: false,
    })
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

  onMovingSituationSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    const {movingSituationData} = this.state
    const selectedId = movingSituationData.filter((obj) => obj.name === text[0])[0].id
    this.data.moving_situation = selectedId
    this.refTenantType.setNativeProps({text: text[0]})
  }

  uploadFile = (fileId) => {
    DocumentPicker.show({
      filetype: [DocumentPickerUtil.allFiles()],
    }, (error, res) => {
      // Android
      console.log(
        res.uri,
        res.type, // mime type
        res.fileName,
        res.fileSize
      )
    })
  }

  render () {
    const {movingSituationData} = this.state
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} text={'Submitting'}/>
        <ScrollView contentContainerStyle={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refTenantType = ref}
                     style={styles.input}
                     placeholder={'Moving Situation'}
                     onFocus={() => showPicker({
                       pickerData: movingSituationData.map((item) => item.name),
                       onPickerConfirm: this.onMovingSituationSelected
                     })}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
            <Button type={'ghost'} onClick={this.uploadFile}>Upload file 47</Button>
            <Button type={'ghost'} onClick={this.uploadFile}>Upload file 65</Button>
          </View>
          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({showingCalendarPicker: true})}>
            <Text ref={ref => this.refTenancyFrom = ref}>
              {this.data.moving_date == '' ? 'Moving Date' : this.data.moving_date}
            </Text>
          </TouchableOpacity>
          {/*<TextInput style={styles.input} placeholder={'Moving Date'}*/}
          {/*ref={ref => this.refTenancyFrom = ref}*/}
          {/*onFocus={() => this.setState({showingCalendarPicker: true})}/>*/}
          <TextInput style={styles.input} placeholder={'Unit'} value={'13-580'} editable={false}/>
          <TextInput style={styles.input} placeholder={'Email address'} value={'nguyentrung0904@gmail.com'}/>
          <TextInput style={styles.input} placeholder={'Description'}
                     onChangeText={(text) => this.data.description = text}/>
          <View style={{flexDirection: 'row'}}>
            <Text>Engaging Contractor/Mover</Text>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.data.engaging_contractor.choose = selected.target.checked
              this.setState({showingMovingContractor: selected.target.checked})
            }}/>
          </View>
          {this.renderContractorForm()}

          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={this.onCalendarChanged}/>
        </ScrollView>
        <Button type={'primary'} style={styles.submitBtn} onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}