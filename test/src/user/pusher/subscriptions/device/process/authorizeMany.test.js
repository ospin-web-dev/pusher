const { default: API } = require('@aws-amplify/api-rest')
const uuidv4 = require('uuid').v4

const authorizeMany = require('user/pusher/subscriptions/device/process/authorizeMany')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('../../../../../../testHelpers/testDefaultHTTPResponses')

describe('authorizeMany', () => {

  it('calls amplify\'s API.post method', async () => {
    jest.spyOn(API, 'post').mockImplementation(args => args)
    const userId = uuidv4()
    const payload = { socketId: '12345-54321', channelName: 'channelName' }

    await authorizeMany(userId, payload)
    expect(API.post).toHaveBeenCalledWith('user', `${userId}/subscriptions/processes`, { body: payload, ...DEFAULT_REQ_OPTS })
  })

  testDefaultHTTPResponses(authorizeMany, 'post')
})
