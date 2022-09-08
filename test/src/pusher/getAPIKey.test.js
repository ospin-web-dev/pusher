const getAPIKey = require('pusher/getAPIKey')

describe('getAPIKey', () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns the right key for the passed env', () => {
    const envToKeys = [
      { env: 'dev', key: 'ba587719e2ccfb6c9dd1' },
      { env: 'staging', key: '10d4f25e41dc0f09c37d' },
      { env: 'prod', key: 'ca9297d1e015925bf081' },
    ]

    envToKeys.forEach(({ env, key }) => {
      expect(getAPIKey(env)).toBe(key)
    })
  })

  it('returns the dev API key for unknown env', () => {
    const env = 'test'
    const key = 'ba587719e2ccfb6c9dd1'

    expect(getAPIKey(env)).toBe(key)
  })
})
