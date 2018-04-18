import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView, Alert } from 'react-native'
import styles from './MovingForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import { movingSituationData } from './MovingSituation.Data'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import { sendMovingForm } from '../../api/index'
import Loader from '../../components/loader/Loader'

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }

  constructor (props) {
    super(props)
    this.state = {
      showingCalendarPicker: false,
      showingMovingContractor: false,
      loading: false
    }
  }

  submitForm = () => {
    const {navigation} = this.props
    this.setState({loading: true})
    sendMovingForm().then((result) => {
      setTimeout(() => {
        this.setState({loading: false})
        navigateToThankyou(navigation)
      }, 3000)
    }).catch((errorMsg) => {
      Alert.alert('Error', errorMsg)
    })
  }

  renderContractorForm = () => {
    if (this.state.showingMovingContractor) {
      return (
        <View>
          <TextInput style={styles.input} placeholder={'Mover Name'}/>
          <TextInput style={styles.input} placeholder={'Mover Address'}/>
          <TextInput style={styles.input} placeholder={'Mover Mobile Number'}/>
          <TextInput style={styles.input} placeholder={'Mover Email'}/>
          <TextInput style={styles.input} placeholder={'Vehicle Type'}/>
        </View>
      )
    } else {
      return null
    }

  }
  onSubmitPressed = () => {
    this.submitForm()
  }

  onMovingSituationSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    this.refTenantType.setNativeProps({text: text[0]})
  }
  uploadFile = () => {
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
    return (
      <View style={styles.container}>
        <Loader loading={this.state.loading} text={'Submitting'}/>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refTenantType = ref}
                     style={styles.input}
                     placeholder={'Moving Situation'}
                     onFocus={() => showPicker({
                       pickerData: movingSituationData,
                       onPickerConfirm: this.onMovingSituationSelected
                     })}/>
          <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
            <Button type={'ghost'} onClick={this.uploadFile}>Upload file 1</Button>
            <Button type={'ghost'} onClick={this.uploadFile}>Upload file 2</Button>
          </View>
          <TextInput style={styles.input} placeholder={'Moving Date'}
                     ref={ref => this.refTenancyFrom = ref}
                     onFocus={() => this.setState({showingCalendarPicker: true})}/>
          <TextInput style={styles.input} placeholder={'Unit'} value={'13-580'} editable={false}/>
          <TextInput style={styles.input} placeholder={'Email address'} value={'nguyentrung0904@gmail.com'}/>
          <TextInput style={styles.input} placeholder={'Description'}/>
          <View style={{flexDirection: 'row'}}>
            <Text>Engaging Contractor/Mover</Text>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.setState({showingMovingContractor: selected.target.checked})
            }}/>
          </View>
          {this.renderContractorForm()}

          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={(data) => {
                            console.log('CalendarPicker ' + data)
                            this.refTenancyFrom.setNativeProps({text: data})
                            this.setState({showingCalendarPicker: false})
                          }}/>
        </ScrollView>
        <Button type={'primary'} style={styles.submitBtn} onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}