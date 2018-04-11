import {
  StyleSheet
} from 'react-native'
import Theme from '../../../../themes/Theme'

export default StyleSheet.create({
  container: {
    height: Theme.Metrics.form.inputHeight,
    width: '100%',
    position: 'relative',
    marginBottom: Theme.Metrics.margins.medium,
    borderBottomWidth: 1,
    borderBottomColor: Theme.Colors.inputBorder,
    paddingTop: 5
  },
  dateInput: {
    justifyContent: 'center',
    marginTop: 15
  },
  textInputError: {
    borderColor: Theme.Colors.danger
  },
  textInputClearContainer: {
    width: Theme.Metrics.form.inputHeight - 5,
    height: Theme.Metrics.form.inputHeight - 5,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    right: 0,
    top: 5
  },
  placeholderLabel: {
    position: 'absolute',
    left: 0,
    color: Theme.Colors.placeholder,
    fontWeight: 'bold'
  },
  errorLabel: {
    position: 'absolute',
    bottom: -18,
    color: Theme.Colors.danger,
    fontWeight: 'bold',
    fontSize: Theme.Font.sizes.small
  }
})
