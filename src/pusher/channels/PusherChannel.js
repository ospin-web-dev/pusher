const OspinPusherClient = require('../OspinPusherClient')

class PusherChannel {

  static generateChannelName(channelParams) {
    return `${this.generateCommonChannelNameSegment(channelParams)}${this.CHANNEL_NAME_SUFFIX}`
  }

  static subscribe(channelParams, eventHandlers) {
    if (!OspinPusherClient.client) {
      // eslint-disable-next-line
      console.warn('Connect OspinPusherClient before trying to subscribe')
      return
    }

    const channelName = this.generateChannelName(channelParams)
    const channel = OspinPusherClient.client.subscribe(channelName)
    const events = this.EVENTS

    Object.entries(eventHandlers).forEach(([eventName, eventHandler]) => {

      if (!(Object.values(events).includes(eventName))) {
        // eslint-disable-next-line
        console.warn(`event ${eventName} for channel ${channelName} does not exist`)
        return
      }

      if (typeof eventHandler !== 'function') {
        // eslint-disable-next-line
        console.warn(`event handler for pusher event ${eventName} for channel ${channelName} is not a function`)
        return
      }

      channel.bind(eventName, eventHandler)
    })
  }

  static unsubscribe(channelParams) {
    if (!OspinPusherClient.client) {
      // eslint-disable-next-line
      console.warn('Connect OspinPusherClient before trying to unsubscribe')
      return
    }
    OspinPusherClient.client.unsubscribe(this.generateChannelName(channelParams))
  }

}

module.exports = PusherChannel
