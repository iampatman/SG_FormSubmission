import mockResponse from './mocks/Mock.FormHistory.json'

export default query = async (data) => {
  return Promise.resolve(mockResponse)
  // return Promise.reject('Data invalid')
}