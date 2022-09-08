const DeviceProcessSpecificPusherChannel = require('./DeviceProcessSpecificPusherChannel')

/**
 * @namespace pusher.pusher.DeviceProcessPusherChannel
 */

class DeviceProcessPusherChannel extends DeviceProcessSpecificPusherChannel {

  /**
   * @desc subscribes to the channel
   * @memberof pusher.pusher.DeviceProcessPusherChannel
   * @function subscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {string} channelParams.processId
   * @param {Object} eventHandlers a map that maps event names to their handlers.
   * Current events: `process-update`
   */

  /**
   * @desc unsubscribe from the channel
   * @memberof pusher.pusher.DeviceProcessPusherChannel
   * @function unsubscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {string} channelParams.processId
   */

  static get CHANNEL_NAME_SUFFIX() { return '' }

  static get EVENTS() {
    return {
      PROCESS_UPDATE: 'process-update',
    }
  }

}

module.exports = DeviceProcessPusherChannel
