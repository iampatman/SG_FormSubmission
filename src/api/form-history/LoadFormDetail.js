import mockResponse from './mocks/Mock.MovingFormDetail.json'

export default query = async (data) => {
  return Promise.resolve(mockResponse)
  // return Promise.reject('Data invalid')
}