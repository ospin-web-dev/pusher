module.exports = env => {

  const API_KEY_DEV = 'ba587719e2ccfb6c9dd1'
  const API_KEY_STAGING = '10d4f25e41dc0f09c37d'
  const API_KEY_PROD = 'ca9297d1e015925bf081'

  const ENV_TO_API_KEY = {
    dev: API_KEY_DEV,
    staging: API_KEY_STAGING,
    prod: API_KEY_PROD,
  }

  return ENV_TO_API_KEY[env] || API_KEY_DEV
}
