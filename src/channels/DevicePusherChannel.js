const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

/**
 * @namespace pusher.DevicePusherChannel
 */

class DevicePusherChannel extends DeviceSpecificPusherChannel {

  /**
   * @desc subscribes to the channel
   * @memberof pusher.DevicePusherChannel
   * @function subscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   * @param {Object} eventHandlers a map that maps event names to their handlers.
   * Current events: `device-description-updated, device-connection-updated,
   * device-state-updated, device-default-fct-graph-updated, device-event-created,
   * device-firmware-updated, device-functionalities-updated`
   */

  /**
   * @desc unsubscribe from the channel
   * @memberof pusher.DevicePusherChannel
   * @function unsubscribe
   * @param {Object} channelParams
   * @param {string} channelParams.deviceId
   */

  static get CHANNEL_NAME_SUFFIX() { return '' }

  static get EVENTS() {
    return {
      DEVICE_DESCRIPTION_UPDATED: 'device-description-updated',
      DEVICE_CONNECTION_UPDATED: 'device-connection-updated',
      DEVICE_STATE_UPDATED: 'device-state-updated',
      DEVICE_DEFAULT_FCT_GRAPH_UPDATED: 'device-default-fct-graph-updated',
      DEVICE_EVENT_CREATED: 'device-event-created',
      DEVICE_FIRMWARE_UPDATED: 'device-firmware-updated',
      DEVICE_FUNCTIONALITIES_UPDATED: 'device-functionalities-updated',
    }
  }

}

module.exports = DevicePusherChannel
