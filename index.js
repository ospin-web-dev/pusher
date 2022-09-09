const { default: Amplify } = require('@aws-amplify/core')
const { createConfig } = require('./src/amplify/configGenerator')
const OspinPusherClient = require('./src/OspinPusherClient')
const DevicePusherChannel = require('./src/channels/DevicePusherChannel')
const DeviceMaintenancePusherChannel = require('./src/channels/DeviceMaintenancePusherChannel')
const DeviceProcessesPusherChannel = require('./src/channels/DeviceProcessesPusherChannel')
const DeviceProcessPusherChannel = require('./src/channels/DeviceProcessPusherChannel')
const DeviceProcessStreamingDataPusherChannel = require('./src/channels/DeviceProcessStreamingDataPusherChannel')

const DEFAULT_OPTS = {
  ENV: 'dev',
  AWS_REGION: 'eu-central-1',
}

/**
 * @desc sets the environment and region for the API (required for the authorization)
 * @memberof pusher
 * @function configure
 * @param {Object} [customOptions]
 * @param {string} [customOptions.ENV = 'dev']
 * @param {string} [customOptions.AWS_REGION = 'eu-central-1']
 * @returns {Object} the generated configuration for the given options
 */

const configure = customOptions => {
  const connectionOpts = {
    ...DEFAULT_OPTS,
    ...customOptions,
  }
  const config = createConfig(connectionOpts)
  Amplify.configure(config)

  return config
}

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
  configure,
}
