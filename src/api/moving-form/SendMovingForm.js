import mockResponse from './mocks/Mock.SendMovingForm.json'
import CONFIG from '../../utils/Config'

export default query = async (data) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/type/situation'
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: CONFIG.token,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({data})
    }).then((response) => response.json()).then((responseJson) => {
      console.log(responseJson)
      if (responseJson.detail != null) {
        reject(responseJson.detail)
      }
      resolve(responseJson)
    }).catch((error) => {
      console.log(error)
      reject('Server error, Please try again later')
    })
  })
}