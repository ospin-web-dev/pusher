const { faker } = require('@faker-js/faker')
const OspinPusherClient = require('OspinPusherClient')
const UserPusherChannel = require('channels/UserPusherChannel')

jest.mock('pusher-js', () => {
  // eslint-disable-next-line
  const { PusherMock } = require('pusher-js-mock')
  PusherMock.prototype.disconnect = () => {}
  return PusherMock
})

describe('the UserPusherChannel', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  const connectClient = () => OspinPusherClient.connect({ env: 'dev', userId: faker.string.uuid() })

  describe('the getter for EVENTS', () => {

    it('returns the map of user events', () => {
      const map = UserPusherChannel.EVENTS

      expect(map).toStrictEqual({
        USER_ADD_NOTIFICATIONS: 'user-add-notifications',
      })
    })
  })

  describe('subscribe', () => {
    it('calls client.subscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'subscribe').mockImplementation(() => ({
        bind: () => {},
      }))
      const userId = faker.string.uuid()
      const eventHandler = { 'user-add-notifications': () => {} }

      UserPusherChannel.subscribe({ userId }, eventHandler)

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-user_${userId}`)
    })
  })

  describe('unsubscribe', () => {
    it('calls client.unsubscribe with the correct parameters', () => {
      const client = connectClient()
      const spy = jest.spyOn(client, 'unsubscribe').mockImplementation()
      const userId = faker.string.uuid()

      UserPusherChannel.unsubscribe({ userId })

      expect(spy).toHaveBeenCalledTimes(1)
      expect(spy).toHaveBeenCalledWith(`private-user_${userId}`)
    })
  })
})
