const { default: Amplify } = require('@aws-amplify/core')
const { createConfig } = require('./src/amplify/configGenerator')
const pusher = require('./src')

const DEFAULT_OPTS = {
  ENV: 'dev',
  AWS_REGION: 'eu-central-1',
}

/**
 * @desc sets the environement and region for the API
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
  ...pusher,
  configure,
}
