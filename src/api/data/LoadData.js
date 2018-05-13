import CONFIG from '../../utils/Config'

export const DATA_TYPE = {
  MOVING: 'situation',
  RENTAL: 'rental',
  RENOVATION: 'renovation',
  VEHICLE: 'vehicle',
  REFUND: 'bank'
}

export default query = (type: DATA_TYPE) => {
  return new Promise((resolve, reject) => {
    let url = CONFIG.url + '/type/' + type
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