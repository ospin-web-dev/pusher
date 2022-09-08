const { default: API } = require('@aws-amplify/api-rest')

// eslint-disable-next-line
module.exports = (fn, httpVerb, fnParams = []) => {

  describe(`on API.${httpVerb} success`, () => {
    beforeAll(() => {
      jest.spyOn(API, httpVerb)
        .mockImplementation((() => ({ data: 'success!', status: 200 })))
    })

    it('returns the serialized result', async () => {
      const resp = await fn(...fnParams)

      expect(resp).toStrictEqual(expect.objectContaining({
        data: 'success!',
        status: 200,
      }))
    })
  })

  describe(`on API.${httpVerb} error`, () => {
    const ERROR_TEXT = 'BAM HTTP ERROR'
    const error = new Error(ERROR_TEXT)

    beforeAll(() => {
      jest.spyOn(API, httpVerb)
        .mockImplementation(() => { throw error })
    })

    it('returns a serialized error response', async () => {
      await expect(fn(...fnParams)).rejects.toThrow(ERROR_TEXT)
    })
  })

}
