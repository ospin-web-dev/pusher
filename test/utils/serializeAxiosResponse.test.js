/* eslint-disable max-classes-per-file */
const serializeAxiosResponse = require('utils/serializeAxiosResponse')

describe('serializeAxiosResponse', () => {

  it('returns a function that, when invoked, calls the function with the passed args', async () => {
    const fn = jest.fn(() => Promise.resolve({}))
    const res = serializeAxiosResponse(fn)

    const args = [ 'a', 'b' ]
    res(...args)

    expect(fn).toHaveBeenCalledWith(...args)
  })

  it('awaits async functions', async () => {
    const data = '<3 u angelo M.'
    const fn = serializeAxiosResponse(() => Promise.resolve({ data }))

    const res = await fn()
    expect(res.data).toBe(data)
  })

  describe('when calling its wrapped method', () => {
    const endpointMock = jest.fn(() => Promise.resolve({}))
    const wrappedMock = serializeAxiosResponse(endpointMock)
    const expectedRessource = 'user'
    const expectedPath = '/'

    it('should by default set requestOpts to have "response: true"', async () => {
      wrappedMock(expectedRessource, expectedPath)

      expect(endpointMock).toHaveBeenCalledWith(expectedRessource, expectedPath)

    })

    it('should merge requestOpts when additional opts are passed in', async () => {
      const additionalRequestOpts = { parameter: 'value' }
      wrappedMock(expectedRessource, expectedPath, additionalRequestOpts)

      expect(endpointMock).toHaveBeenCalledWith(
        expectedRessource,
        expectedPath,
        { ...additionalRequestOpts },
      )
    })

    it('should always override requestOpts.response to true', async () => {
      const additionalRequestOpts = { response: false }
      wrappedMock(expectedRessource, expectedPath, additionalRequestOpts)

      expect(endpointMock).toHaveBeenCalledWith(
        expectedRessource,
        expectedPath,
      )
    })
  })

  describe('when the async function returns successfully', () => {
    it('should respond with the status code of the response', async () => {
      const data = { status: 201 }
      const fn = serializeAxiosResponse(() => Promise.resolve(data))
      const res = await fn()

      expect(res.status).toBe(data.status)
    })

    it('returns a serialized object with the response set to \'data\'', async () => {
      const response = { data: 'data' }

      const fn = serializeAxiosResponse(() => Promise.resolve(response))
      const res = await fn()

      expect(res).toStrictEqual(expect.objectContaining({
        data: response.data,
      }))
    })
  })

  describe('when the async function throws error', () => {

    class ServerError extends Error {

      constructor(...args) {
        super(...args)
        this.response = {
          status: 500,
          data: { message: 'server error' },
        }
      }

    }

    class NotFoundError extends Error {

      constructor(...args) {
        super(...args)
        this.response = {
          status: 400,
          data: { message: 'auth error' },
        }
      }

    }

    it('throws the error with the correct message and status', async () => {
      const serverError = new ServerError()
      const fnA = serializeAxiosResponse(() => Promise.reject(serverError))
      await expect(fnA()).rejects.toThrow(expect.objectContaining({
        message: serverError.response.data.message,
        status: serverError.response.status,
        error: serverError,
      }))

      const notFoundError = new NotFoundError()
      const fnB = serializeAxiosResponse(() => Promise.reject(notFoundError))
      await expect(fnB()).rejects.toThrow(expect.objectContaining({
        message: notFoundError.response.data.message,
        status: notFoundError.response.status,
        error: notFoundError,
      }))
    })

    describe('when the async function throws the special nonsense auth error that has a different message structure', () => {

      class AuthError extends Error {

        constructor(...args) {
          super(...args)
          this.response = {
            status: 401,
            message: 'auth error',
          }
        }

      }

      it('returns a serialized object with the error message and status fields parsed out to reflect and auth error', async () => {
        const authError = new AuthError()
        const fn = serializeAxiosResponse(() => Promise.reject(authError))
        await expect(fn()).rejects.toThrow(expect.objectContaining({
          message: authError.message,
          status: 401,
          error: authError,
        }))
      })
    })
  })
})
