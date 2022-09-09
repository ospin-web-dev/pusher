const RegexUtils = require('./utils/RegexUtils')

let queuedRequests = []

// 0 is enough for a delay to batch calls when they happen during a single event loop cycle
const QUEUEING_DELAY_IN_MS = 0
let queueingInterval = null

const stopQueueing = () => {
  clearInterval(queueingInterval)
  queueingInterval = null
}

const isDeviceProcessChannel = channelName => {
  const uuidRegString = RegexUtils.UUIDV4_REGEX_STRING
  const regex = new RegExp(`private-device_${uuidRegString}_process_${uuidRegString}(|_streaming_data)$`)
  return regex.test(channelName)
}

const getAuthTokens = async (
  channelNames,
  socketId,
  userId,
  authDeviceSubs,
  authDeviceProcessSubs,
) => {
  const nonDeviceProcessChannelNames = channelNames
    .filter(channelName => !isDeviceProcessChannel(channelName))
  const deviceProcessChannelNames = channelNames
    .filter(isDeviceProcessChannel)

  if (!nonDeviceProcessChannelNames.length) {
    const { data: { tokens } } = await authDeviceProcessSubs(
      userId,
      { channelNames: deviceProcessChannelNames, socketId },
    )
    return tokens
  }

  if (!deviceProcessChannelNames.length) {
    const { data: { tokens } } = await authDeviceSubs(
      userId,
      { channelNames: nonDeviceProcessChannelNames, socketId },
    )
    return tokens
  }

  const [
    { data: { tokens: deviceProcessChannelTokens } },
    { data: { tokens: nonDeviceProcessChannelTokens } },
  ] = await Promise.all([
    authDeviceSubs(userId, { channelNames: nonDeviceProcessChannelNames, socketId }),
    authDeviceProcessSubs(
      userId,
      { channelNames: deviceProcessChannelNames, socketId },
    ),
  ])

  return [ ...deviceProcessChannelTokens, ...nonDeviceProcessChannelTokens ]
}

const authorizeChannels = async (authDeviceSubs, authDeviceProcessSubs) => {

  const requests = [ ...queuedRequests ]
  queuedRequests = []

  const { socketId, userId } = requests[0]

  const channelNames = requests.map(req => req.channelName)

  const tokens = await getAuthTokens(channelNames, socketId, userId, authDeviceSubs, authDeviceProcessSubs)
  // eslint-disable-next-line
  for (const channelTokenResponse of tokens) {
    const { token, channelName } = channelTokenResponse
    const { callback } = requests.find(req => channelName === req.channelName)

    if (token) {
      callback(false, { auth: token })
    } else {
      callback(true, null)
    }
  }
}

const startQueingInterval = (authDeviceSubs, authDeviceProcessSubs) => setInterval(async () => {
  stopQueueing(queueingInterval)
  await authorizeChannels(authDeviceSubs, authDeviceProcessSubs)
}, QUEUEING_DELAY_IN_MS)

const createRequest = (socketId, channelName, callback, userId) => ({
  channelName,
  socketId,
  callback,
  userId,
})

const queueRequest = (req, authDeviceSubs, authDeviceProcessSubs) => {
  if (!queueingInterval) {
    queueingInterval = startQueingInterval(authDeviceSubs, authDeviceProcessSubs)
  }
  queuedRequests.push(req)
}

const batchAuthorizer = (userId, authDeviceSubs, authDeviceProcessSubs) => ({ name }) => ({
  authorize: (socketId, callback) => {
    queueRequest(
      createRequest(socketId, name, callback, userId),
      authDeviceSubs,
      authDeviceProcessSubs,
    )
  },
})

module.exports = batchAuthorizer
