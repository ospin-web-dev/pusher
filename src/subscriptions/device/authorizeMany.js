const { default: API } = require('@aws-amplify/api-rest')

const serializeAxiosResponse = require('../../utils/serializeAxiosResponse')
const { DEFAULT_REQ_OPTS } = require('../../utils/defaultReqOpts')

module.exports = serializeAxiosResponse(
  (id, params) => API.post('user', `${id}/subscriptions/devices`, { body: params, ...DEFAULT_REQ_OPTS }),
)
