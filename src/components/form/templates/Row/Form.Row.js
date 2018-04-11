// @flow
import _ from 'lodash'
import React from 'react'
import {View} from 'react-native'
import {Flex} from 'antd-mobile'
import styles from './Form.Row.Style'

type Props = {
  locals: Object
}

const FormRow = (props: Props) => {
  const {locals} = props

  const items = []
  const keys = _.keys(locals.inputs)

  _.forEach(locals.inputs, (item, key) => {
    const {options: {config}} = item.props
    const indexOfKey = keys.indexOf(key)
    const containerStyle = indexOfKey > 0 && styles.itemContainer

    items.push(
      <Flex.Item
        style={config.columnStyle}
        key={key}
      >
        <View style={containerStyle}>
          {item}
        </View>
      </Flex.Item>
    )
  })

  return (
    <Flex>
      {items}
    </Flex>
  )
}

export default FormRow
