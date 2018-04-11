import {
  StyleSheet
} from 'react-native'
import Theme from '../../../../themes/Theme'

export default StyleSheet.create({
  container: {
    height: Theme.Metrics.form.inputHeight,
    width: '100%',
    position: 'relative',
    marginBottom: Theme.Metrics.margins.default,
    paddingTop: 10
  },
  textInput: {
    height: 35,
    paddingRight: Theme.Metrics.margins.large,
    paddingLeft: 0,
    paddingTop: 0,
    paddingBottom: 0,
    textAlignVertical: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.inputBorder
  },
  textInputError: {
    borderColor: Theme.Colors.danger
  },
  textInputClearContainer: {
    width: 35,
    height: 35,
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 10
  },
  placeholderLabel: {
    position: 'absolute',
    left: 0,
    color: Theme.Colors.placeholder,
    fontWeight: 'bold'
  },
  errorLabel: {
    position: 'absolute',
    bottom: -15,
    height: 30,
    color: Theme.Colors.danger,
    fontWeight: 'bold',
    fontSize: Theme.Font.sizes.small
  }
})
