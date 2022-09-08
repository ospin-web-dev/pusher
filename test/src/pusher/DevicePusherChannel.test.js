const faker = require('faker')
const { DevicePusherChannel, OspinPusherClient } = require('pusher')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the DevicePusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connectClient = () => OspinPusherClient.connect({ env: 'dev', userId: faker.datatype.uuid() })

  describe('the getter for EVENTS', () => {

    it('returns the map of device events', () => {
      const map = DevicePusherChannel.EVENTS

      expect(map).toStrictEqual({
        DEVICE_DESCRIPTION_UPDATED: 'device-description-updated',
        DEVICE_CONNECTION_UPDATED: 'device-connection-updated',
        DEVICE_STATE_UPDATED: 'device-state-updated',
        DEVICE_DEFAULT_FCT_GRAPH_UPDATED: 'device-default-fct-graph-updated',
        DEVICE_EVENT_CREATED: 'device-event-created',
        DEVICE_FIRMWARE_UPDATED: 'device-firmware-updated',
        DEVICE_FUNCTIONALITIES_UPDATED: 'device-functionalities-updated',
      })
    })
  })

  describe('subscribe', () => {
    it('calls client.subscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'subscribe').mockImplementation(() => ({
        bind: () => {},
      }))
      const deviceId = faker.datatype.uuid()
      const eventHandler = { 'device-description-updated': () => {} }

      DevicePusherChannel.subscribe({ deviceId }, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}`)
    })
  })

  describe('unsubscribe', () => {
    it('calls client.unsubscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'unsubscribe').mockImplementation()
      const deviceId = faker.datatype.uuid()

      DevicePusherChannel.unsubscribe({ deviceId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}`)
    })
  })
})
