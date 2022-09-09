const { createConfig, getAuthConfig } = require('amplify/configGenerator')

describe('createConfig', () => {

  const ENVS = [ 'dev', 'prod', 'staging' ]
  const AWS_REGION = 'eu-central-1'

  ENVS.forEach(ENV => {
    it(`returns a config object with values that reflect the ${ENV} ENV`, () => {
      const expected = {
        Analytics: { disabled: true },
        ...getAuthConfig({ ENV, AWS_REGION }),
        API: {
          endpoints: [
            {
              endpoint: `https://api-${ENV}.ospin-services.com/users/`,
              name: 'user',
              region: AWS_REGION,
            },
          ],
        },
        stage: ENV,
      }

      const returnedConfig = createConfig({ ENV, AWS_REGION })
      expect(returnedConfig).toStrictEqual(expect.objectContaining(expected))
    })
  })
})
