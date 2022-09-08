const Pusher = require('pusher-js')
const faker = require('faker')
const { OspinPusherClient } = require('pusher')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the OspinPusherClient', () => {

  beforeEach(() => {
    OspinPusherClient.resetOspinPusherClient()
    jest.clearAllMocks()
  })

  const initDefaultClient = () => {
    const env = 'dev'
    const userId = faker.datatype.uuid()
    const cluster = 'us'
    const initData = { env, userId, cluster }

    return OspinPusherClient.connect(initData)
  }

  describe('connect', () => {
    describe('when NOT already initialized', () => {
      it('returns an instance of the pusher client', () => {
        const env = 'dev'
        const userId = faker.datatype.uuid()
        const cluster = 'us'
        const initData = { env, userId, cluster }

        const client = OspinPusherClient.connect(initData)

        expect(client).toBeInstanceOf(Pusher)
      })

      it('sets the default value for the cluster to eu', () => {
        const env = 'dev'
        const userId = faker.datatype.uuid()
        const initData = { env, userId }

        const client = OspinPusherClient.connect(initData)

        expect(client.config.cluster).toBe('eu')
      })
    })

    describe('when initialized beforehand', () => {
      it('returns the existing client', () => {
        const env = 'dev'
        const userId = faker.datatype.uuid()
        const cluster = 'us'
        const initData = { env, userId, cluster }
        const existingClient = initDefaultClient()

        const client = OspinPusherClient.connect(initData)

        expect(client).toStrictEqual(existingClient)
      })
    })
  })

  describe('disconnect', () => {
    describe('when NOT already initialized', () => {
      it('does not call resetOspinPusherClient', () => {
        const spy = jest.spyOn(OspinPusherClient, 'resetOspinPusherClient')
        OspinPusherClient.disconnect()

        expect(spy).toHaveBeenCalledTimes(0)
      })
    })

    describe('when initialized beforehand', () => {
      it('does call resetOspinPusherClient', () => {
        initDefaultClient()
        const spy = jest.spyOn(OspinPusherClient, 'resetOspinPusherClient')

        OspinPusherClient.disconnect()

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })
  })

  describe('resetOspinPusherClient', () => {
    it('resets the client to null', () => {
      initDefaultClient()

      OspinPusherClient.resetOspinPusherClient()

      expect(OspinPusherClient.client).toBeNull()
    })
  })

  describe('registerConnectionEvent', () => {
    describe('when NOT already initialized', () => {
      it('does call console.warn', () => {
        const spy = jest.spyOn(global.console, 'warn').mockImplementation(() => {})
        const handler = () => {}
        OspinPusherClient.registerConnectionEvent('state_change', handler)

        expect(spy).toHaveBeenCalledTimes(1)
      })
    })

    describe('when initialized beforehand', () => {
      it('registers the function for the event and executes it when the event is fired', () => {
        const client = initDefaultClient()
        const handler = jest.fn()
        OspinPusherClient.registerConnectionEvent('state_change', handler)

        client.connection.emit('state_change')

        expect(handler).toHaveBeenCalledTimes(1)
      })
    })
  })
})
