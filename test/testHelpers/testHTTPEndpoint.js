const { default: API } = require('@aws-amplify/api-rest')
const { DEFAULT_REQ_OPTS } = require('utils/defaultReqOpts')
const testDefaultHTTPResponses = require('./testDefaultHTTPResponses')

// eslint-disable-next-line
module.exports = ({
  handler,
  name,
  httpVerb,
  serviceName,
  params = [],
  expectedURLSegment = '',
  expectedPayload = {},
}) => {

  describe(`${name}`, () => {
    afterAll(() => { jest.restoreAllMocks() })

    it(`calls amplify's API.${httpVerb} method`, async () => {
      jest.spyOn(API, httpVerb).mockImplementation((args = {}) => args)

      await handler(...params)
      expect(API[httpVerb])
        .toHaveBeenCalledWith(
          serviceName,
          expectedURLSegment,
          { ...expectedPayload, ...DEFAULT_REQ_OPTS },
        )
    })

    testDefaultHTTPResponses(handler, httpVerb, params)
  })
}
