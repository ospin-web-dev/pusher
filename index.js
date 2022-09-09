const OspinPusherClient = require('./src/OspinPusherClient')
const DevicePusherChannel = require('./src/channels/DevicePusherChannel')
const DeviceMaintenancePusherChannel = require('./src/channels/DeviceMaintenancePusherChannel')
const DeviceProcessesPusherChannel = require('./src/channels/DeviceProcessesPusherChannel')
const DeviceProcessPusherChannel = require('./src/channels/DeviceProcessPusherChannel')
const DeviceProcessStreamingDataPusherChannel = require('./src/channels/DeviceProcessStreamingDataPusherChannel')

/**
 * @namespace pusher
 */

module.exports = {
  OspinPusherClient,
  DevicePusherChannel,
  DeviceMaintenancePusherChannel,
  DeviceProcessesPusherChannel,
  DeviceProcessPusherChannel,
  DeviceProcessStreamingDataPusherChannel,
}
