import mockResponse from './mocks/Mocks.MovingSituation.json'
import CONFIG from '../../utils/Config'

export default query = (data) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/type/situation'
    fetch(url, {
      method: 'GET',
      headers: {
        Authorization: CONFIG.token
      }
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson)
      if (responseJson.detail != null) {
        reject(responseJson.detail)
      }
      resolve(responseJson.tdata)
    }).catch((error) => {
      console.log(error)
      reject('Server error, Please try again later')
    })
  })
}