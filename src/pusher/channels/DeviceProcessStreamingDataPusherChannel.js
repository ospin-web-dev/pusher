const DeviceProcessSpecificPusherChannel = require('./DeviceProcessSpecificPusherChannel')

/**
 * @namespace pusher.pusher.DeviceProcessStreamingDataPusherChannel
 */

class DeviceProcessStreamingDataPusherChannel extends DeviceProcessSpecificPusherChannel {

  /**
   * @desc subscribes to the channel
   * @memberof pusher.pusher.DeviceProcessStreamingDataPusherChannel
   * @function subscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {string} channelParams.processId
   * @param {Object} eventHandlers a map that maps event names to their handlers
   * Current events: `process-image-created, process-sensor-data-generated`
   */

  /**
   * @desc unsubscribe from the channel
   * @memberof pusher.pusher.DeviceProcessStreamingDataPusherChannel
   * @function unsubscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {string} channelParams.processId
   */

  static get CHANNEL_NAME_SUFFIX() { return '_streaming_data' }

  static get EVENTS() {
    return {
      PROCESS_IMAGE_GENERATED: 'process-image-created',
      PROCESS_SENSOR_DATA_GENERATED: 'process-sensor-data-generated',
    }
  }

}

module.exports = DeviceProcessStreamingDataPusherChannel
