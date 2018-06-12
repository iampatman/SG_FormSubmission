import React, { Component } from 'react'
import {
  View,
  Modal,
  TouchableOpacity,
  Text
} from 'react-native'
import CalendarMonth from './Calendar.Month'
import styles from './Calendar.Picker.Style'

export default class CalendarPicker extends Component {
  static defaultProps = {
    calendarProps: {}
  }

  constructor (props: Props) {
    super(props)
    this.state = {
      visible: props.visible || false,
      title: 'Select Date',
      calendarProps: {
        minDate: '1940-01-01',
        monthFormat: 'MM/YYYY',
        hideExtraDays: true,
        theme: {
          textMonthFontSize: 16
        },
        ...props.calendarProps
      },
      selectedDay: null
    }
  }

  componentWillReceiveProps (nextProps: Object) {
    if (nextProps.visible !== this.state.visible) {
      this.setState({visible: nextProps.visible})
    }

    if (nextProps.selectedDay !== this.state.selectedDay) {
      this.setState({selectedDay: nextProps.selectedDay})
    }
  }

  open = (params: Object = {}) => {
    const updatingProps = {
      ...params,
      visible: true
    }

    if (params.calendarProps) {
      updatingProps.calendarProps = {
        ...this.state.calendarProps,
        ...params.calendarProps
      }
    }

    this.setState(updatingProps)
  }

  close = () => {
    this.setState({visible: false})
  }

  onDayPress = (newDay: Object) => {
    this.setState({
      selectedDay: newDay.dateString
    }, () => {
      if (this.props.onChange) this.props.onChange(this.state.selectedDay)
      if (this.state.onComplete) this.state.onComplete(this.state.selectedDay)
      this.close()
    })
  }

  render () {
    const {visible, title, selectedDay} = this.state

    const markedDates = {}
    if (selectedDay) {
      markedDates[selectedDay] = {selected: true}
    }

    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={visible}
        onRequestClose={this.close}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.backdrop}
          onPress={this.close}
        />
        <View style={styles.content}>
          <Text style={styles.title}>{title}</Text>
          <CalendarMonth
            style={styles.calendar}
            {...this.props.calendarProps}
            markedDates={markedDates}
            onDayPress={this.onDayPress}
          />
        </View>
      </Modal>
    )
  }
}
