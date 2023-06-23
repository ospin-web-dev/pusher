const RegexUtils = require('./utils/RegexUtils')

let queuedRequests = []

// 0 is enough for a delay to batch calls when they happen during a single event loop cycle
const QUEUEING_DELAY_IN_MS = 0
let queueingInterval = null

const stopQueueing = () => {
  clearInterval(queueingInterval)
  queueingInterval = null
}

const uuidRegString = RegexUtils.UUIDV4_REGEX_STRING

const isDeviceChannel = channelName => {
  const regex = new RegExp(`private-device_${uuidRegString}$`)
  return regex.test(channelName)
}

const isDeviceProcessChannel = channelName => {
  const regex = new RegExp(`private-device_${uuidRegString}_process_${uuidRegString}(|_streaming_data)$`)
  return regex.test(channelName)
}

const isUserChannel = channelName => {
  const regex = new RegExp(`private-user_${uuidRegString}$`)
  return regex.test(channelName)
}

const getAuthTokens = async ({
  channelNames,
  socketId,
  userId,
  authUserSubs,
  authDeviceSubs,
  authDeviceProcessSubs,
}) => {

  const requests = []

  const userChannelNames = channelNames
    .filter(isUserChannel)

  if (userChannelNames.length) {
    requests.push(authUserSubs(
      userId,
      { channelNames: userChannelNames, socketId },
    ))
  }

  const deviceChannelNames = channelNames
    .filter(isDeviceChannel)

  if (deviceChannelNames.length) {
    requests.push(authDeviceSubs(
      userId,
      { channelNames: deviceChannelNames, socketId },
    ))
  }

  const deviceProcessChannelNames = channelNames
    .filter(isDeviceProcessChannel)

  if (deviceProcessChannelNames.length) {
    requests.push(authDeviceProcessSubs(
      userId,
      { channelNames: deviceProcessChannelNames, socketId },
    ))
  }

  const res = await Promise.all(requests)
  return res.flatMap(({ data: { tokens } }) => tokens)
}

const authorizeChannels = async (
  authUserSubs,
  authDeviceSubs,
  authDeviceProcessSubs,
) => {

  const requests = [ ...queuedRequests ]
  queuedRequests = []

  const { socketId, userId } = requests[0]

  const channelNames = requests.map(req => req.channelName)

  const tokens = await getAuthTokens({
    channelNames,
    socketId,
    userId,
    authUserSubs,
    authDeviceSubs,
    authDeviceProcessSubs,
  })
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

const startQueingInterval = (
  authUserSubs,
  authDeviceSubs,
  authDeviceProcessSubs,
) => setInterval(async () => {
  stopQueueing(queueingInterval)
  await authorizeChannels(authUserSubs, authDeviceSubs, authDeviceProcessSubs)
}, QUEUEING_DELAY_IN_MS)

const createRequest = (socketId, channelName, callback, userId) => ({
  channelName,
  socketId,
  callback,
  userId,
})

const queueRequest = (
  req,
  authUserSubs,
  authDeviceSubs,
  authDeviceProcessSubs,
) => {
  if (!queueingInterval) {
    queueingInterval = startQueingInterval(
      authUserSubs,
      authDeviceSubs,
      authDeviceProcessSubs,
    )
  }
  queuedRequests.push(req)
}

const batchAuthorizer = (
  userId,
  authUserSubs,
  authDeviceSubs,
  authDeviceProcessSubs,
) => ({ name }) => ({
  authorize: (socketId, callback) => {
    queueRequest(
      createRequest(socketId, name, callback, userId),
      authUserSubs,
      authDeviceSubs,
      authDeviceProcessSubs,
    )
  },
})

module.exports = batchAuthorizer
