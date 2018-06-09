import Picker from 'react-native-picker'
import React from 'react'

export const showPicker = (props = {}) => {
  Picker.init({
    pickerConfirmBtnText: 'Confirm',
    pickerCancelBtnText: 'Cancel',
    pickerTitleText: 'Select',
    ...props
  })
  Picker.show()
}
export const hidePicker = (props = {}) => {
  Picker.hide()
}


// export class MyPicker extends React.Component {
//   constructor (props) {
//     super(props)
//     var refPicker = null
//     // this.state = {}
//   }
//
//   show = () => {
//     if (this.refPicker)
//       this.refPicker.show()
//   }
//
//   hide = () => {
//     if (this.refPicker)
//       this.refPicker.hide()
//   }
//
//   render () {
//     return (
//       <Picker
//         ref={ref => this.refPicker = ref}
//         pickerConfirmBtnText={'Confirm'}
//         pickerCancelBtnText={'Cancel'}
//         pickerTitleText={'Select'}
//       />
//     )
//   }
// }