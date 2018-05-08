import React from 'react'
import {
  View,
  Text,
  FlatList, SectionList
} from 'react-native'
import styles from './FormDetail.Style'
import { loadFormDetail } from '../../api/index'
import { extractMovingData } from './FormDetail.ExtractData'
import Loader from '../../components/loader/Loader'

export default class FormDetailScreen extends React.Component {
  constructor (props) {
    super(props)
    const {params} = this.props.navigation.state
    this.state = {
      formId: params.formId,
      formType: 1,
      data: [],
      loading: true
    }
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

  componentDidMount () {
    this.loadData()
  }

  loadData = () => {
    loadFormDetail(this.state.formId).then((data) => {
      console.log('data: ' + JSON.stringify(data))
      var extractedData = extractMovingData(data)
      switch (this.state.formType) {
        case 1:
          extractedData = extractMovingData(data)
      }
      console.log('extractedData ' + extractedData)
      this.setState({
        data: extractedData,
        loading: false
      })
    }).catch((error) => {
      console.log(error)
    })
  }

  // extractData = (obj) => {
  //   var data = []
  //   Object.keys(obj).forEach((key) => {
  //     data.push({
  //       key,
  //       value: obj[key]
  //     })
  //   })
  //   return data
  // }

  render () {
    const {data,loading} = this.state
    return (
      <View style={styles.container}>
        <Loader loading={loading} text={'Loading'} />
        <SectionList
          renderItem={this.renderItem}
          renderSectionHeader={({section: {title}}) => <Text style={styles.sectionText}>{title}</Text>}
          sections={data}
        />
      </View>
    )
  }
}