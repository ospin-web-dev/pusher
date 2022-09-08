const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../../../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../../../../utils/defaultReqOpts')

/**
 * @desc authorizes a user for pusher device process channels
 * @memberof pusher.user.pusher.subscriptions.device.process
 * @function authorizeMany
 * @async
 * @param {string} userId
 * @param {Object} params
 * @param {string} params.socketId
 * @param {Array<string>} params.channelNames
 * @returns {Promise<ApiResponse>}
 */

module.exports = serializeAxiosResponse(
  (userId, params) => API.post('user', `${userId}/subscriptions/processes`, { body: params, ...DEFAULT_REQ_OPTS }),
)
