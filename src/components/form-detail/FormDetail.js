import React from 'react'
import {
  View,
  Text,
  FlatList, SectionList
} from 'react-native'
import styles from './FormDetail.Style'

export default class FormDetail extends React.Component {
  constructor (props) {
    super(props)
  }

  renderItem = ({item, index, section}) => {
    return (
      <View style={styles.itemContainer}>
        <View style={styles.itemTitleContainer}>
          <Text style={styles.itemTitleText} key={index}>{item.key}</Text>
        </View>
        <View style={styles.itemDetailContainer}>
          <Text key={index}>{item.value}</Text>

        </View>
      </View>

    )
  }

  render () {
    const data = [
      {
        title: 'Basic Information',
        data: [{id: 1, key: 'Status', value: 'Pending'}, {id: 2, key: 'Completion Date', value: '29/9/2018'}]
      },
      {
        title: 'Car Information',
        data: [{id: 1, key: 'Status', value: 'Pending'}, {id: 2, key: 'Completion Date', value: '29/9/2018'}]
      },
      {
        title: 'Other information',
        data: [{id: 1, key: 'Status', value: 'Pending'}, {id: 2, key: 'Completion Date', value: '29/9/2018'}]
      },
    ]
    return (
      <View style={styles.container}>
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={({section: {title}}) => <Text style={styles.sectionText}>{title}</Text>}
          sections={data}
        />
      </View>
    )
  }
}