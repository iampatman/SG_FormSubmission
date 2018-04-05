import n from './RouteNames'
import { StackNavigator} from 'react-navigation'
import FormMenuScreen from '../containers/forms-menu/FormMenu.Screen'

export default StackNavigator({
  [n.FORM_MENU]: {screen: FormMenuScreen},
}, {
  initialRouteName: n.FORM_MENU
})