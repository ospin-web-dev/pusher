const { faker } = require('@faker-js/faker')
const batchAuthorizer = require('batchAuthorizer')

const successfulMock = (userId, { channelNames } = {}) => ({
  data: {
    tokens: channelNames.map(channelName => ({
      channelName, token: 'token',
    })),
  },
})

const failingMock = (userId, { channelNames } = {}) => ({
  data: {
    tokens: channelNames.map(channelName => ({
      channelName,
    })),
  },
})

const authDeviceSubscriptions = jest.fn()
  .mockImplementationOnce(successfulMock)
  .mockImplementationOnce(failingMock)
  .mockImplementationOnce(successfulMock)

const authDeviceProcessSubscriptions = jest.fn()
  .mockImplementationOnce(successfulMock)
  .mockImplementationOnce(failingMock)
  .mockImplementationOnce(successfulMock)

describe('batchAuthorizer', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when only non process device channels are authorized', () => {
    it('executes the callback functions when a token is returned', async () => {
      const userId = faker.string.uuid()
      const deviceId = faker.string.uuid()
      const authorizer = batchAuthorizer(userId, authDeviceSubscriptions, authDeviceProcessSubscriptions)
      const channelName = `private-device_${deviceId}`
      const callback = jest.fn()
      const socketId = '12345.54321'

      authorizer({ name: channelName }).authorize(socketId, callback)
      authorizer({ name: channelName }).authorize(socketId, callback)
      await new Promise(resolve => setTimeout(resolve, 1))

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
    })

    it('executes the callback function when no token is returned', async () => {
      const userId = faker.string.uuid()
      const deviceId = faker.string.uuid()
      const authorizer = batchAuthorizer(userId, authDeviceSubscriptions, authDeviceProcessSubscriptions)
      const channelName = `private-device_${deviceId}`
      const callback = jest.fn()
      const socketId = '12345.54321'

      authorizer({ name: channelName }).authorize(socketId, callback)
      await new Promise(resolve => setTimeout(resolve, 1))

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(true, null)
    })
  })

  describe('when only process device channels are authorized', () => {
    it('executes the callback functions when a token is returned', async () => {
      const userId = faker.string.uuid()
      const deviceId = faker.string.uuid()
      const processId = faker.string.uuid()
      const authorizer = batchAuthorizer(userId, authDeviceSubscriptions, authDeviceProcessSubscriptions)
      const channelName = `private-device_${deviceId}_process_${processId}`
      const callback = jest.fn()
      const socketId = '12345.54321'

      authorizer({ name: channelName }).authorize(socketId, callback)
      authorizer({ name: channelName }).authorize(socketId, callback)
      await new Promise(resolve => setTimeout(resolve, 1))

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
    })

    it('executes the callback function when no token is returned', async () => {
      const userId = faker.string.uuid()
      const deviceId = faker.string.uuid()
      const processId = faker.string.uuid()
      const authorizer = batchAuthorizer(userId, authDeviceSubscriptions, authDeviceProcessSubscriptions)
      const channelName = `private-device_${deviceId}_process_${processId}`
      const callback = jest.fn()
      const socketId = '12345.54321'

      authorizer({ name: channelName }).authorize(socketId, callback)
      await new Promise(resolve => setTimeout(resolve, 1))

      expect(callback).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledWith(true, null)
    })
  })

  describe('when device process and non device process channels are authorized', () => {
    it('executes the callback functions when a token is returned', async () => {
      const userId = faker.string.uuid()
      const deviceId = faker.string.uuid()
      const processId = faker.string.uuid()
      const authorizer = batchAuthorizer(userId, authDeviceSubscriptions, authDeviceProcessSubscriptions)
      const channelName1 = `private-device_${deviceId}`
      const channelName2 = `private-device_${deviceId}_process_${processId}`
      const callback = jest.fn()
      const socketId = '12345.54321'

      authorizer({ name: channelName1 }).authorize(socketId, callback)
      authorizer({ name: channelName2 }).authorize(socketId, callback)
      await new Promise(resolve => setTimeout(resolve, 1))

      expect(callback).toHaveBeenCalledTimes(2)
      expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
    })
  })
})
