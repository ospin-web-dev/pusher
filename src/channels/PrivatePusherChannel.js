const PusherChannel = require('./PusherChannel')

class PrivatePusherChannel extends PusherChannel {

  static get PRIVATE_PREFIX() {
    return 'private-'
  }

}

module.exports = PrivatePusherChannel
