const PrivatePusherChannel = require('./PrivatePusherChannel')

class DeviceSpecificPusherChannel extends PrivatePusherChannel {

  static generateCommonChannelNameSegment({ deviceId }) {
    return `${super.PRIVATE_PREFIX}device_${deviceId}`
  }

}

module.exports = DeviceSpecificPusherChannel
