import React from 'react'
import { View, TextInput, Dimensions, Modal, Text, ScrollView } from 'react-native'
import styles from './RentalForm.Style'
import Checkbox from '../../components/check-box/Checkbox'
import { showPicker } from '../../components/Picker/Picker'
import CalendarPicker from '../../components/calendar/Calendar.Picker'
import { Button } from 'antd-mobile'
import { navigateToThankyou } from '../../navigation/helpers/Nav.FormMenu.Helper'

export default class RentalFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Rental'
  }

  constructor (props) {
    super(props)
    this.state = {
      showingCalendarPicker: false,
      tacChecked: false
    }

  }

  onSubmitPressed = () => {
    const {navigation} = this.props
    navigateToThankyou(navigation)
  }

  onMovingSituationSelected = (text) => {
    console.log('onPickerConfirm' + text[0])
    this.refTenantType.setNativeProps({text: text[0]})
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView content={{paddingBottom: 80}}>
          <TextInput ref={ref => this.refTenantType = ref}
                     style={styles.input}
                     placeholder={'Tenant Type'}
                     onFocus={() => showPicker({
                       pickerData: movingSituationData,
                       onPickerConfirm: this.onMovingSituationSelected
                     })}/>
          <TextInput style={styles.input} placeholder={'Tenant Name'}/>
          <TextInput style={styles.input} placeholder={'Tenant Phone Number'}/>
          <TextInput style={styles.input} placeholder={'Tenancy From'}
                     ref={ref => this.refTenancyFrom = ref}
                     onFocus={() => this.setState({showingCalendarPicker: true})}/>
          <TextInput style={styles.input} placeholder={'Tenancy To'}
                     ref={ref => this.refTenancyTo = ref}
                     onFocus={() => this.setState({showingCalendarPicker: true})}/>
          <TextInput style={styles.input} placeholder={'Description'}/>
          <View style={{flexDirection: 'row'}}>
            <Checkbox onChange={(selected) => {
              console.log('Checkbox onChange' + selected.target.checked)
              this.setState({tacChecked: selected.target.checked})
            }}/>
            <Text>I agree to the terms and conditions</Text>
          </View>
          <CalendarPicker visible={this.state.showingCalendarPicker} title={'Moving date'}
                          onChange={(data) => {
                            console.log('CalendarPicker ' + data)
                            this.refTenancyFrom.setNativeProps({text: data})
                            this.setState({showingCalendarPicker: false})
                          }}/>
        </ScrollView>
        <Button disabled={!this.state.tacChecked}
                type={'primary'}
                style={styles.submitBtn}
                onClick={this.onSubmitPressed}>SUBMIT</Button>
      </View>
    )
  }
}