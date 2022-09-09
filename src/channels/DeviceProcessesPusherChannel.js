const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

/**
 * @namespace pusher.DeviceProcessesPusherChannel
 */

class DeviceProcessesPusherChannel extends DeviceSpecificPusherChannel {

  /**
   * @desc subscribes to the channel
   * @memberof pusher.DeviceProcessesPusherChannel
   * @function subscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {Object} eventHandlers a map that maps event names to their handlers.
   * Current events: `running-process-state-update, process-download-request-updated`
   */

  /**
   * @desc unsubscribe from the channel
   * @memberof pusher.DeviceProcessesPusherChannel
   * @function unsubscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   */

  static get CHANNEL_NAME_SUFFIX() { return '_processes' }

  static get EVENTS() {
    return {
      RUNNING_PROCESS_STATE_UPDATE: 'running-process-state-update',
      PROCESS_DOWNLOAD_REQUEST_UPDATED: 'process-download-request-updated',
    }
  }

}

module.exports = DeviceProcessesPusherChannel
