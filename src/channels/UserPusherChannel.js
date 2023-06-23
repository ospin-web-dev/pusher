const UserSpecificPusherChannel = require('./UserSpecificPusherChannel')

/**
 * @namespace pusher.UserPusherChannel
 */

class UserPusherChannel extends UserSpecificPusherChannel {

  /**
   * @desc subscribes to the channel
   * @memberof pusher.UserPusherChannel
   * @function subscribe
   * @param {Object} channelParams
   * @param {string} channelParams.userId
   * @param {Object} eventHandlers a map that maps event names to their handlers.
   * Current events: `user-add-notifications`
   */

  /**
   * @desc unsubscribe from the channel
   * @memberof pusher.UserPusherChannel
   * @function unsubscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   */

  static get CHANNEL_NAME_SUFFIX() { return '' }

  static get EVENTS() {
    return {
      USER_ADD_NOTIFICATIONS: 'user-add-notifications',
    }
  }

}

module.exports = UserPusherChannel
