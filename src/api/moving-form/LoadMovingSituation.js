import mockResponse from './mocks/Mocks.MovingSituation.json'

export default query = async (data) => {
  return Promise.resolve(mockResponse)
  // return Promise.reject('Data invalid')
}