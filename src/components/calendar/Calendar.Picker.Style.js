import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  content: {
    left: 0,
    right: 0,
    bottom: 0,
    padding: 10,
    backgroundColor: 'white',
    position: 'absolute',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    color: 'grey',
    marginBottom: 10
  },
  calendar: {
    alignSelf: 'stretch'
  }
})
