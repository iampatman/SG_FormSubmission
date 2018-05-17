import n from './RouteNames'
import CONFIG from '../utils/Config'
import { StackNavigator } from 'react-navigation'
import FormMenuScreen from '../containers/forms-menu/FormMenu.Screen'
import MovingFormScreen from '../containers/moving-form/MovingForm.Screen'
import ThankyouScreen from '../containers/thankyou-submission/Thankyou.Screen'
import SubmissionHistoryScreen from '../containers/submission-history/SubmissionHistory.Screen'
import RentalFormScreen from '../containers/rental-form/RentalForm.Screen'
import FormDetailScreen from '../containers/form-detail/FormDetail.Screen'
import RenovationFormScreen from '../containers/renovation-form/RenovationForm.Screen'
import VehicleFormScreen from '../containers/vehicle-form/VehicleForm.Screen'
import RefundFormScreen from '../containers/refund-form/RefundForm.Screen'
import WebViewScreen from '../containers/web-view/WebView.Screen'

export default StackNavigator({
  [n.FORM_MENU]: {screen: FormMenuScreen},
  [n.MOVING]: {screen: MovingFormScreen},
  [n.RENTAL]: {screen: RentalFormScreen},
  [n.RENOVATION]: {screen: RenovationFormScreen},
  [n.VEHICLE]: {screen: VehicleFormScreen},
  [n.REFUND]: {screen: RefundFormScreen},
  [n.THANK_YOU]: {screen: ThankyouScreen},
  [n.SUBMISSION_HISTORY]: {screen: SubmissionHistoryScreen},
  [n.FORM_DETAIL]: {screen: FormDetailScreen},
  [n.WEB_VIEW]: {screen: WebViewScreen},
}, {
  initialRouteName: CONFIG.formid == 0 && CONFIG.formtype == 0  ? n.FORM_MENU : n.FORM_DETAIL
})