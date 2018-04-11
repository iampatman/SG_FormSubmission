import { StyleSheet, Dimensions } from 'react-native'
const SCREEN_WIDTH = Dimensions.get('window').width
const item_spacing = 20
const item_width = (SCREEN_WIDTH - item_spacing) / 4
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    height: 50,
    margin: 10,
    paddingHorizontal: 10,
    borderWidth: 0.3,
    borderColor: 'gray',
    borderRadius: 4
  }
})