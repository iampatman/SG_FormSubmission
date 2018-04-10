import n from './RouteNames'
import { StackNavigator} from 'react-navigation'
import FormMenuScreen from '../containers/forms-menu/FormMenu.Screen'
import MovingFormScreen from '../containers/moving-form/MovingForm.Screen'

export default StackNavigator({
  [n.FORM_MENU]: {screen: FormMenuScreen},
  [n.MOVING]: {screen: MovingFormScreen},
}, {
  initialRouteName: n.MOVING
})