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

describe('batchAuthorizer', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('when subscribing to user channels', () => {
    describe('when the request is successful', () => {
      it('executes the callback with the correct payload', async () => {
        const userId = faker.string.uuid()
        const channelName = `private-user_${userId}`
        const callback = jest.fn()
        const socketId = '12345.54321'

        const authUserSubscriptions = jest.fn()
          .mockImplementationOnce(successfulMock)
        const authDeviceSubscriptions = jest.fn()
        const authDeviceProcessSubscriptions = jest.fn()

        const authorizer = batchAuthorizer(
          userId,
          authUserSubscriptions,
          authDeviceSubscriptions,
          authDeviceProcessSubscriptions,
        )

        authorizer({ name: channelName }).authorize(socketId, callback)
        authorizer({ name: channelName }).authorize(socketId, callback)
        await new Promise(resolve => setTimeout(resolve, 1))

        expect(authUserSubscriptions).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
      })
    })

    describe('when the request is NOT successful', () => {
      it('executes the callback with the correct payload', async () => {
        const userId = faker.string.uuid()
        const channelName = `private-user_${userId}`
        const callback = jest.fn()
        const socketId = '12345.54321'

        const authUserSubscriptions = jest.fn()
          .mockImplementationOnce(failingMock)
        const authDeviceSubscriptions = jest.fn()
        const authDeviceProcessSubscriptions = jest.fn()

        const authorizer = batchAuthorizer(
          userId,
          authUserSubscriptions,
          authDeviceSubscriptions,
          authDeviceProcessSubscriptions,
        )

        authorizer({ name: channelName }).authorize(socketId, callback)
        authorizer({ name: channelName }).authorize(socketId, callback)
        await new Promise(resolve => setTimeout(resolve, 1))

        expect(authUserSubscriptions).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenCalledWith(true, null)
      })
    })
  })

  describe('when subscribing to device channels', () => {
    describe('when the request is successful', () => {
      it('executes the callback with the correct payload', async () => {
        const userId = faker.string.uuid()
        const deviceId = faker.string.uuid()
        const channelName = `private-device_${deviceId}`
        const callback = jest.fn()
        const socketId = '12345.54321'

        const authUserSubscriptions = jest.fn()
        const authDeviceSubscriptions = jest.fn()
          .mockImplementationOnce(successfulMock)
        const authDeviceProcessSubscriptions = jest.fn()

        const authorizer = batchAuthorizer(
          userId,
          authUserSubscriptions,
          authDeviceSubscriptions,
          authDeviceProcessSubscriptions,
        )

        authorizer({ name: channelName }).authorize(socketId, callback)
        authorizer({ name: channelName }).authorize(socketId, callback)
        await new Promise(resolve => setTimeout(resolve, 1))

        expect(authDeviceSubscriptions).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
      })
    })

    describe('when the request is NOT successful', () => {
      it('executes the callback with the correct payload', async () => {
        const userId = faker.string.uuid()
        const deviceId = faker.string.uuid()
        const channelName = `private-device_${deviceId}`
        const callback = jest.fn()
        const socketId = '12345.54321'

        const authUserSubscriptions = jest.fn()
        const authDeviceSubscriptions = jest.fn()
          .mockImplementationOnce(failingMock)
        const authDeviceProcessSubscriptions = jest.fn()

        const authorizer = batchAuthorizer(
          userId,
          authUserSubscriptions,
          authDeviceSubscriptions,
          authDeviceProcessSubscriptions,
        )

        authorizer({ name: channelName }).authorize(socketId, callback)
        authorizer({ name: channelName }).authorize(socketId, callback)
        await new Promise(resolve => setTimeout(resolve, 1))

        expect(authDeviceSubscriptions).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenCalledWith(true, null)
      })
    })
  })

  describe('when subscribing to device process channels', () => {
    describe('when the request is successful', () => {
      it('executes the callback with the correct payload', async () => {
        const userId = faker.string.uuid()
        const deviceId = faker.string.uuid()
        const processId = faker.string.uuid()
        const channelName1 = `private-device_${deviceId}_process_${processId}`
        const channelName2 = `private-device_${deviceId}_process_${processId}`
        const callback = jest.fn()
        const socketId = '12345.54321'

        const authUserSubscriptions = jest.fn()
        const authDeviceSubscriptions = jest.fn()
        const authDeviceProcessSubscriptions = jest.fn()
          .mockImplementationOnce(successfulMock)

        const authorizer = batchAuthorizer(
          userId,
          authUserSubscriptions,
          authDeviceSubscriptions,
          authDeviceProcessSubscriptions,
        )

        authorizer({ name: channelName1 }).authorize(socketId, callback)
        authorizer({ name: channelName2 }).authorize(socketId, callback)
        await new Promise(resolve => setTimeout(resolve, 1))

        expect(authDeviceProcessSubscriptions).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenCalledWith(false, { auth: 'token' })
      })
    })

    describe('when the request is NOT successful', () => {
      it('executes the callback with the correct payload', async () => {
        const userId = faker.string.uuid()
        const deviceId = faker.string.uuid()
        const processId = faker.string.uuid()
        const channelName1 = `private-device_${deviceId}_process_${processId}`
        const channelName2 = `private-device_${deviceId}_process_${processId}`
        const callback = jest.fn()
        const socketId = '12345.54321'

        const authUserSubscriptions = jest.fn()
        const authDeviceSubscriptions = jest.fn()
        const authDeviceProcessSubscriptions = jest.fn()
          .mockImplementationOnce(failingMock)

        const authorizer = batchAuthorizer(
          userId,
          authUserSubscriptions,
          authDeviceSubscriptions,
          authDeviceProcessSubscriptions,
        )

        authorizer({ name: channelName1 }).authorize(socketId, callback)
        authorizer({ name: channelName2 }).authorize(socketId, callback)
        await new Promise(resolve => setTimeout(resolve, 1))

        expect(authDeviceProcessSubscriptions).toHaveBeenCalledTimes(1)
        expect(callback).toHaveBeenCalledTimes(2)
        expect(callback).toHaveBeenCalledWith(true, null)
      })
    })
  })

  describe('when subscribing to all three of them', () => {
    it('calls all the right endpoints and callback', async () => {
      const userId = faker.string.uuid()
      const deviceId = faker.string.uuid()
      const processId = faker.string.uuid()
      const userChannel = `private-user_${userId}`
      const deviceChannel = `private-device_${deviceId}`
      const deviceProcessChannel = `private-device_${deviceId}_process_${processId}`
      const callback = jest.fn()
      const socketId = '12345.54321'

      const authUserSubscriptions = jest.fn()
        .mockImplementationOnce(successfulMock)
      const authDeviceSubscriptions = jest.fn()
        .mockImplementationOnce(successfulMock)
      const authDeviceProcessSubscriptions = jest.fn()
        .mockImplementationOnce(successfulMock)

      const authorizer = batchAuthorizer(
        userId,
        authUserSubscriptions,
        authDeviceSubscriptions,
        authDeviceProcessSubscriptions,
      )

      authorizer({ name: userChannel }).authorize(socketId, callback)
      authorizer({ name: deviceChannel }).authorize(socketId, callback)
      authorizer({ name: deviceProcessChannel }).authorize(socketId, callback)
      await new Promise(resolve => setTimeout(resolve, 1))

      expect(authUserSubscriptions).toHaveBeenCalledTimes(1)
      expect(authDeviceSubscriptions).toHaveBeenCalledTimes(1)
      expect(authDeviceProcessSubscriptions).toHaveBeenCalledTimes(1)
      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(1, false, { auth: 'token' })
      expect(callback).toHaveBeenNthCalledWith(2, false, { auth: 'token' })
      expect(callback).toHaveBeenNthCalledWith(3, false, { auth: 'token' })
    })
  })
})
