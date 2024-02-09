const PrivatePusherChannel = require('./PrivatePusherChannel')

class UserSpecificPusherChannel extends PrivatePusherChannel {

  static generateCommonChannelNameSegment({ userId }) {
    return `${super.PRIVATE_PREFIX}user_${userId}`
  }

}

module.exports = UserSpecificPusherChannel
