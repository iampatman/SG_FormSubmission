import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView } from 'react-native'
import styles from './MovingForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import { movingSituationData } from './MovingSituation.Data'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }

  constructor (props) {
    super(props)
    this.state = {
      showingCalendarPicker: false,
      showingMovingContractor: false
    }

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
    const {navigation} = this.props
    navigateToThankyou(navigation)
  }
  render () {
    return (
      <View style={styles.container}>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refMovingSituation = ref} style={styles.input} placeholder={'Moving Situation'}
                     onFocus={() => showPicker({
                       pickerData: movingSituationData,
                       onPickerConfirm: (text) => {
                         console.log('onPickerConfirm' + text[0])
                         this.refMovingSituation.setNativeProps({text: text[0]})
                       }
                     })}/>
          <TextInput style={styles.input} placeholder={'Moving Date'}
                     ref={ref => this.refMovingDate = ref}
                     onFocus={() => this.setState({showingCalendarPicker: true})}/>
          <TextInput style={styles.input} placeholder={'Unit'} value={'13-580'} editable={false}/>
          <TextInput style={styles.input} placeholder={'Email address'} value={'nguyentrung0904@gmail.com'}/>
          <TextInput style={styles.input} placeholder={'Description'}/>
          <View style={{flexDirection: 'row'}}>
            <Text>Engaging Contractor/Mover</Text>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.setState({showingMovingContractor:  selected.target.checked})}}></Checkbox>
          </View>
          {this.renderContractorForm()}

          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={(data) => {
                            console.log('CalendarPicker ' + data)
                            this.refMovingDate.setNativeProps({text: data})
                            this.setState({showingCalendarPicker: false})
                          }}/>
        </ScrollView>
        <Button type={'primary'} style={styles.submitBtn} onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}