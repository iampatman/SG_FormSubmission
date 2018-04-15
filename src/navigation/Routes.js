import n from './RouteNames'
import { StackNavigator} from 'react-navigation'
import FormMenuScreen from '../containers/forms-menu/FormMenu.Screen'
import MovingFormScreen from '../containers/moving-form/MovingForm.Screen'
import ThankyouScreen from '../containers/thankyou-submission/Thankyou.Screen'
import SubmissionHistoryScreen from '../containers/submission-history/SubmissionHistory.Screen'
import RentalFormScreen from '../containers/rental-form/RentalForm.Screen'
import FormDetail from '../components/form-detail/FormDetail'

export default StackNavigator({
  [n.FORM_MENU]: {screen: FormMenuScreen},
  [n.MOVING]: {screen: MovingFormScreen},
  [n.RENTAL]: {screen: RentalFormScreen},
  [n.THANK_YOU]: {screen: ThankyouScreen},
  [n.SUBMISSION_HISTORY]: {screen: SubmissionHistoryScreen},
  [n.FORM_DETAIL]: {screen: FormDetail},
}, {
  initialRouteName: n.FORM_MENU
})