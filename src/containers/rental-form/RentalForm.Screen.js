import React from 'react'
import { View, TextInput, Dimensions, Modal, Alert, Text, ScrollView, TouchableOpacity } from 'react-native'
import styles from './RentalForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import { submitForm, DATA_TYPE, loadData } from '../../api/index'
import Loader from '../../components/loader/Loader'
import moment from 'moment'

export default class RentalFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Rental'
  }

  constructor (props) {
    super(props)
    this.data = {
      formtype: 2,
      type: '',
      tenancy_start_date: '',
      tenancy_end_date: '',
      file_upload: []
    }

    this.state = {
      showingCalendarPicker: false,
      showingMovingContractor: false,
      tagChecked: false,
      loading: true,
      tenantTypes: []
    }
  }

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    loadData(DATA_TYPE.RENTAL).then((tdata) => {
      console.log('tdata ' + JSON.stringify(tdata))
      this.setState({
        tenantTypes: tdata,
        loading: false
      })
    }).catch()
  }

  onSubmitPressed = () => {
    const {navigation} = this.props
    navigateToThankyou(navigation)
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
    console.log('CalendarPicker ' + formattedStr)
    this.refTenancyFrom.setNativeProps({text: formattedStr})
    this.data.tenancy_start_date = formattedStr
    this.data.tenancy_end_date = formattedStr
    this.setState({
      showingCalendarPicker: false,
    })
  }

  onTenantTypeSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    const {tenantTypes} = this.state
    const selectedId = tenantTypes.filter((obj) => obj.name === text[0])[0].id
    this.data.type = selectedId
    this.refTenantType.setNativeProps({text: text[0]})
  }

  render () {
    const {tenantTypes} = this.state

    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} text={'Submitting'}/>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refTenantType = ref}
                     style={styles.input}
                     placeholder={'Tenant Type'}
                     onFocus={() => showPicker({
                       pickerData: tenantTypes.map((item) => item.name),
                       onPickerConfirm: this.onTenantTypeSelected
                     })}/>
          <TextInput style={styles.input} placeholder={'Tenant Name'}/>
          <TextInput style={styles.input} placeholder={'Tenant Phone Number'}/>
          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({showingCalendarPicker: true})}>
            <Text ref={ref => this.refTenancyFrom = ref}>
              {this.data.tenancy_start_date == '' ? 'Tenancy From' : this.data.tenancy_start_date}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.datePickerView}
                            onPress={() => this.setState({showingCalendarPicker: true})}>
            <Text ref={ref => this.refTenancyTo = ref}>
              {this.data.tenancy_start_date == '' ? 'Tenancy To' : this.data.tenancy_start_date}
            </Text>
          </TouchableOpacity>
          <TextInput style={styles.input} placeholder={'Description'}/>
          <View style={{flexDirection: 'row'}}>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.setState({tacChecked: selected.target.checked})
            }}/>
            <Text>I agree to the terms and conditions</Text>
          </View>
          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={this.onCalendarChanged}/>
        </ScrollView>
        <Button disabled={!this.state.tacChecked}
                type={'primary'}
                style={styles.submitBtn}
                onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}