/* ********************************************************* */
/*                          COMMON                           */
/* ********************************************************* */
const getCommonConfig = () => ({
  Analytics: { disabled: true },
})

/* ********************************************************* */
/*                          COMMON                           */
/* ********************************************************* */

const getAPIEndPointsConfig = ({ ENV, AWS_REGION }) => ({
  API: {
    endpoints: [
      {
        name: 'user',
        endpoint: `https://api-${ENV}.ospin-services.com/users/`,
        region: AWS_REGION,
      },
    ],
  },
})

/* ********************************************************* */
/*                            AUTH                           */
/* ********************************************************* */

const ENV_CONFIGS = {
  dev: {
    userPoolId: 'eu-central-1_RZYHLQE41',
    userPoolWebClientId: '7uu1n5c3dhp2vrsknh78hos1ho',
    identityPoolId: 'eu-central-1:ee3fb1bd-13d2-4692-8cb3-e1f86ebbfa0b',
  },
  prod: {
    userPoolId: 'eu-central-1_zNHPrnTaz',
    userPoolWebClientId: '12s549a91623fitisvhd5pg8od',
    identityPoolId: 'eu-central-1:bea7c430-b2ac-4b11-b2cf-9fab7d8318ac',
  },
  staging: {
    userPoolId: 'eu-central-1_zNHPrnTaz',
    userPoolWebClientId: '12s549a91623fitisvhd5pg8od',
    identityPoolId: 'eu-central-1:bea7c430-b2ac-4b11-b2cf-9fab7d8318ac',
  },
}

const getAuthConfig = ({ ENV, AWS_REGION }) => ({
  Auth: {
    mandatorySignIn: false,
    region: AWS_REGION,
    userPoolId: ENV_CONFIGS[ENV].userPoolId,
    userPoolWebClientId: ENV_CONFIGS[ENV].userPoolWebClientId,
    identityPoolId: ENV_CONFIGS[ENV].identityPoolId,
  },
})

/* ********************************************************* */
/*                    CONFIG GENERATION                      */
/* ********************************************************* */

const createConfig = ({ ENV, AWS_REGION }) => ({
  ...getCommonConfig({ AWS_REGION }),
  ...getAuthConfig({ ENV, AWS_REGION }),
  ...getAPIEndPointsConfig({ ENV, AWS_REGION }),
  stage: ENV,
})

module.exports = { createConfig, getAuthConfig }
