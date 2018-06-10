import { ActionSheet } from 'antd-mobile'
import { DocumentPicker, DocumentPickerUtil } from 'react-native-document-picker'
import ImagePicker from 'react-native-image-picker'
import { Platform } from 'react-native'

export const SELECTED_TYPE = {
  IMAGE: 1,
  DOCUMENT: 2
}

const DOCUMENT_OPTION = 'Document'
const CAMERA_ROLL_OPTION = 'Camera Roll'
const TAKE_PHOTO_OPTION = 'Take Photo'
const CANCEL_OPTION = 'Cancel'

export default showUploadFileActionSheet = (props: Object) => {

  const {onComplete, title} = props

  const optionsTitle = [DOCUMENT_OPTION, CAMERA_ROLL_OPTION, TAKE_PHOTO_OPTION, CANCEL_OPTION]
  if (Platform.OS === 'ios') optionsTitle.splice(0, 1)
  ActionSheet.showActionSheetWithOptions({
    options: optionsTitle, cancelButtonIndex: 3, title: title ? title : 'Upload'
  }, (selectedId) => {
    console.log('uploadFile ' + selectedId)
    const options = {
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    }
    switch (selectedId) {
      case optionsTitle.indexOf(DOCUMENT_OPTION):
        DocumentPicker.show({
          filetype: [DocumentPickerUtil.allFiles()],
        }, (error, response) => {
          console.log('DocumentPicker: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.DOCUMENT, error != null ? null : response)
        })
        break
      case optionsTitle.indexOf(CAMERA_ROLL_OPTION):
        ImagePicker.launchImageLibrary(options, (response) => {
          console.log('launchImageLibrary: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.IMAGE, response)
        })
        break
      case optionsTitle.indexOf(TAKE_PHOTO_OPTION):
        ImagePicker.launchCamera(options, (response) => {
          console.log('launchCamera: ' + JSON.stringify(response))
          if (onComplete) onComplete(SELECTED_TYPE.IMAGE, response)
        })
        break
    }
  })
}