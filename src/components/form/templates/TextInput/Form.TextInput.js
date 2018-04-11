// @flow
import React, {Component} from 'react'
import {
  TextInput,
  TouchableOpacity,
  Animated,
  Text,
  InteractionManager
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Icon from '../../../icon/Icon'
import Theme from '../../../../themes/Theme'
import styles from './Form.TextInput.Style'

type Props = {
  locals: Object
}

type State = {
  isShowClear: boolean,
  value: string,
  labelAnimation: Object,
  isFocusing: boolean
}

export default class FormTextInput extends Component<Props, State> {
  constructor (props: Props) {
    super(props)
    // $FlowFixMe
    this.state = {
      isShowClear: false,
      value: props.locals.value || '',
      labelAnimation: new Animated.Value(!props.locals.value ? 0 : 1),
      isFocusing: false
    }
  }

  componentWillReceiveProps (nextProps: Object) {
    if (nextProps.locals.value) {
      this.updatePlaceholderAnimation()
      this.setState({value: nextProps.locals.value})
    }
  }

  onChange = (value: string) => {
    const {locals} = this.props
    // $FlowFixMe
    const isShowClear: boolean = value.length > 0

    this.setState({isShowClear, value}, () => {
      if (locals.onChange) locals.onChange(value)
      this.updatePlaceholderAnimation()
    })
  }

  onFocus = (e: Object) => {
    const {locals} = this.props
    if (locals.config.onFocus) locals.config.onFocus(e)
    this.setState({isFocusing: true}, () => {
      this.updatePlaceholderAnimation()
    })
  }

  onBlur = (e: Object) => {
    const {locals} = this.props
    if (locals.config.onBlur) locals.config.onBlur(e)
    this.setState({isFocusing: false}, () => {
      this.updatePlaceholderAnimation()
    })
  }

  updatePlaceholderAnimation = () => {
    InteractionManager.runAfterInteractions(() => {
      Animated.timing(this.state.labelAnimation, {
        toValue: (this.state.isFocusing || this.state.value.length > 0) ? 1 : 0,
        duration: 200
      }).start()
    })
  }

  clearValue = () => {
    if (this.refs.input) {
      this.refs.input.setNativeProps({text: ''})
      this.onChange('')
    }
  }

  getErrorMessage = (): string | null => {
    const {locals: {hasError, error, config}} = this.props
    if (!hasError) return null
    if (!error) return null

    const {validation} = config
    if (validation.errors && validation.errors[error.type]) return validation.errors[error.type]
    return error.message
  }

  render () {
    const {locals} = this.props
    const {labelAnimation} = this.state
    const animation = locals.config.animation

    const placeholderStyle = [styles.placeholderLabel, {
      top: labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0]
      }),
      fontSize: labelAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [Theme.Font.sizes.medium, Theme.Font.sizes.small]
      })
    }]

    const errorMessage = this.getErrorMessage()

    return (
      <Animatable.View animation={(animation ? animation.name : '')}
                       delay={(animation ? animation.delay : 0)}
                       duration={(animation ? animation.duration : 1000)}
                       style={[
                         styles.container,
                         locals.hasError ? styles.textInputError : null
                       ]}>
        <Animated.Text style={placeholderStyle}>
          {locals.placeholder || locals.config.placeholder}
        </Animated.Text>
        <TextInput
          ref='input'
          onChangeText={this.onChange}
          {...locals.config}
          onFocus={this.onFocus}
          onBlur={this.onBlur}
          style={[
            styles.textInput,
            locals.config.style
          ]}
          value={this.state.value}
          underlineColorAndroid={Theme.Colors.transparent}
          spellCheck={false}
        />
        {
          locals.hasError && locals.error &&
          <Text style={styles.errorLabel}>{errorMessage}</Text>
        }
        {
          this.state.isShowClear &&
          <TouchableOpacity onPress={this.clearValue} style={styles.textInputClearContainer}>
            <Icon name='cancel' size={Theme.Metrics.icons.tiny} color={Theme.Colors.placeholder}/>
          </TouchableOpacity>
        }
      </Animatable.View>
    )
  }
}
