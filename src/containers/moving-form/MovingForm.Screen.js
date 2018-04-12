import React from 'react'
import { View, TextInput, Picker, Dimensions, Modal } from 'react-native'
import styles from './MovingForm.Style'

export default class MovingFormScreen extends React.Component {
  static navigationOptions = {
    title: 'Moving'
  }

  constructor (props) {
    super(props)
    this.state = {
      language: ''
    }

  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput style={styles.input} placeholder={'Moving Situation'}/>
        <TextInput style={styles.input} placeholder={'Moving Date'}/>
        <TextInput style={styles.input} placeholder={'Unit'}/>
        <TextInput style={styles.input} placeholder={'Email address'}/>
        <TextInput style={styles.input} placeholder={'Description'}/>
        <Modal transparent={true} animationType={'slide'} visible={true}>
          <View style={styles.modalContainer}>
            <Picker
              selectedValue={this.state.language}
              style={{width: Dimensions.get('window').width, height: 200}}
              onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
              <Picker.Item label="Java" value="java"/>
              <Picker.Item label="JavaScript" value="js"/>
            </Picker>
          </View>

        </Modal>

      </View>
    )
  }
}