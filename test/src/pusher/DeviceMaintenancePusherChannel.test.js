const { faker } = require('@faker-js/faker')
const OspinPusherClient = require('OspinPusherClient')
const DeviceMaintenancePusherChannel = require('channels/DeviceMaintenancePusherChannel')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the DeviceMaintenancePusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connectClient = () => OspinPusherClient.connect({ env: 'dev', userId: faker.string.uuid() })

  describe('the getter for EVENTS', () => {

    it('returns the map of device events', () => {
      const map = DeviceMaintenancePusherChannel.EVENTS

      expect(map).toStrictEqual({
        DEVICE_SSH_CONNECTION_OPENED: 'device-ssh-connection-opened',
      })
    })
  })

  describe('subscribe', () => {
    it('calls client.subscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'subscribe').mockImplementation(() => ({
        bind: () => {},
      }))
      const deviceId = faker.string.uuid()
      const eventHandler = { 'device-ssh-connection-opened': () => {} }

      DeviceMaintenancePusherChannel.subscribe({ deviceId }, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_maintenance`)
    })
  })

  describe('unsubscribe', () => {
    it('calls client.unsubscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'unsubscribe').mockImplementation()
      const deviceId = faker.string.uuid()

      DeviceMaintenancePusherChannel.unsubscribe({ deviceId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_maintenance`)
    })
  })
})
