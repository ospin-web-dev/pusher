const HTTPError = require('utils/HTTPError')

describe('HTTPError', () => {
  it('creates a new HTTP error with default values', () => {
    const err = new HTTPError()

    expect(err).toStrictEqual(expect.objectContaining({
      message: '',
      error: null,
      status: null,
    }))
  })
})
