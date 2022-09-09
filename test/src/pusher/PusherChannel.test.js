const faker = require('faker')
const OspinPusherClient = require('OspinPusherClient')
const DevicePusherChannel = require('channels/DevicePusherChannel')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the DevicePusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
    OspinPusherClient.resetOspinPusherClient()
  })

  const connectClient = () => OspinPusherClient.connect({ env: 'dev', userId: faker.datatype.uuid() })

  describe('subscribe', () => {
    describe('when the client is not connected', () => {
      it('calls console.warn when the event is unknown', () => {
        const spy = jest.spyOn(console, 'warn').mockImplementation()
        const deviceId = faker.datatype.uuid()
        const eventHandler = { 'device-description-updated': () => {} }

        DevicePusherChannel.subscribe({ deviceId }, eventHandler)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('Connect OspinPusherClient'))
      })
    })

    describe('when an event is unknown for the channel', () => {
      it('calls console.warn when the event is unknown', () => {
        connectClient()
        const spy = jest.spyOn(console, 'warn').mockImplementation()
        const deviceId = faker.datatype.uuid()
        const eventHandler = { miracle: () => {} }

        DevicePusherChannel.subscribe({ deviceId }, eventHandler)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('event miracle for channel'))
      })
    })

    describe('when an event handler is NOT a function', () => {
      it('calls console.warn when the event is unknown', () => {
        connectClient()
        const spy = jest.spyOn(console, 'warn').mockImplementation()
        const deviceId = faker.datatype.uuid()
        const eventHandler = { 'device-description-updated': 'notice me senpai' }

        DevicePusherChannel.subscribe({ deviceId }, eventHandler)

        expect(spy).toHaveBeenCalledTimes(1)
        expect(spy).toHaveBeenCalledWith(expect.stringContaining('event handler for pusher'))
      })
    })
  })

  describe('unsubscribe', () => {
    it('calls console.warn when the event is unknown', () => {
      const spy = jest.spyOn(console, 'warn').mockImplementation()
      const deviceId = faker.datatype.uuid()

      DevicePusherChannel.unsubscribe({ deviceId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(expect.stringContaining('Connect OspinPusherClient'))
    })
  })
})
