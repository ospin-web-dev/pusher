const DeviceSpecificPusherChannel = require('./DeviceSpecificPusherChannel')

class DeviceProcessSpecificPusherChannel extends DeviceSpecificPusherChannel {

  static generateCommonChannelNameSegment({ deviceId, processId }) {
    return `${super.generateCommonChannelNameSegment({ deviceId })}_process_${processId}`
  }

}

module.exports = DeviceProcessSpecificPusherChannel
