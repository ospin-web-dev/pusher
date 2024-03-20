const { faker } = require('@faker-js/faker')
const OspinPusherClient = require('OspinPusherClient')
const DeviceProcessStreamingDataPusherChannel = require('channels/DeviceProcessStreamingDataPusherChannel')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the DeviceProcessStreamingDataPusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connectClient = () => OspinPusherClient.connect({ env: 'dev', userId: faker.string.uuid() })

  describe('the getter for EVENTS', () => {

    it('returns the map of device events', () => {
      const map = DeviceProcessStreamingDataPusherChannel.EVENTS

      expect(map).toStrictEqual({
        PROCESS_IMAGE_GENERATED: 'process-image-created',
        PROCESS_SENSOR_DATA_GENERATED: 'process-sensor-data-generated',
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
      const processId = faker.string.uuid()
      const eventHandler = { 'process-image-created': () => {} }

      DeviceProcessStreamingDataPusherChannel.subscribe({ deviceId, processId }, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_process_${processId}_streaming_data`)
    })
  })

  describe('unsubscribe', () => {
    it('calls client.unsubscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'unsubscribe').mockImplementation()
      const deviceId = faker.string.uuid()
      const processId = faker.string.uuid()

      DeviceProcessStreamingDataPusherChannel.unsubscribe({ deviceId, processId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-device_${deviceId}_process_${processId}_streaming_data`)
    })
  })
})
