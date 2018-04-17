import mockResponse from './mocks/Mock.SendMovingForm.json'

export default query = async (data) => {
  return Promise.resolve(mockResponse)
  // return Promise.reject('Data invalid')
}