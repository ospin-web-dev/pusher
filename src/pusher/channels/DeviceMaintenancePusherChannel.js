const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

/**
 * @namespace pusher.pusher.DeviceMaintenancePusherChannel
 */

class DeviceMaintenancePusherChannel extends DeviceSpecificPusherChannel {

  /**
   * @desc subscribes to the channel
   * @memberof pusher.pusher.DeviceMaintenancePusherChannel
   * @function subscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {Object} eventHandlers a map that maps event names to their handlers.
   * Current events: `device-ssh-connection-opened`
   */

  /**
   * @desc unsubscribe from the channel
   * @memberof pusher.pusher.DeviceMaintenancePusherChannel
   * @function unsubscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   */

  static get CHANNEL_NAME_SUFFIX() { return '_maintenance' }

  static get EVENTS() {
    return {
      DEVICE_SSH_CONNECTION_OPENED: 'device-ssh-connection-opened',
    }
  }

}

module.exports = DeviceMaintenancePusherChannel
