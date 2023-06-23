[![codecov](https://codecov.io/gh/ospin-web-dev/pusher/branch/main/graph/badge.svg?token=C8290ABS0S)](https://codecov.io/gh/ospin-web-dev/pusher)

Documentation can be found [here](https://ospin-web-dev.github.io/pusher/).

---

## Table of Contents

- [Use Overview](#Overview)
  - [Configuration](#Configuration)
- [Use Examples](#Use-Examples)
- [Contributing](#Contributing)
---

## <a name="Overview">Overview</a>

@ospin/pusher is a JavaScript SDK to communicate to Ospin's pusher channel for real time information on devices and processes. It is build on top of pusher-js. To use it the user has to be registered at OSPIN.

  - [configure pusher for the environment](#Configuration)
  - [Authentication](#Authenticating-as-a-User)

#### <a name="Configuration">Configuration</a>
```js
// connect to the client

const userId = "a3339d89-345b-4baf-9859-46a4542a505a"
pusher.OspinClient.connect({
  env: 'prod',
  userId,
  /* using the default auth methods provided in the @ospin/nexus package */
  authDeviceSubscriptions: nexus.user.pusher.subscriptions.device.authorizeMany,
  authDeviceProcessSubscriptions: nexus.user.pusher.subscriptions.device.process.authorizeMany,
})

```

## <a name="Use-Examples">Use Example</a>
```js

// subscribe

const deviceId = "b3249d89-345b-4baf-9859-46a4542a505a"
const handlers = {
  "device-state-update": data => console.log(data)
}

pusher.DevicePusherChannel.subscribe({ deviceId }, handlers)

// unsubscribe

pusher.DevicePusherChannel.unsubscribe({ deviceId })

// disconnect

pusher.OspinClient.disconnect()

```

## <a name="Contributing">Contributing</a>

This repo employs the github action [semantic-release](https://semantic-release.gitbook.io/semantic-release/), which, on approved PRs to `main`, sniffs the PR title/commit message to automatically bump the semantic versioning and publish the package to NPM.

All PRs to the `main` branch should indicate the semantic version change via the following options:

Available types:
 - feat: A new feature
 - fix: A bug fix
 - docs: Documentation only changes (unclear if this bumps version)
 - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
 - refactor: A code change that neither fixes a bug nor adds a feature
 - perf: A code change that improves performance
 - test: Adding missing tests or correcting existing tests
 - build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
 - ci: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
 - chore: Other changes that don't modify src or test files
 - revert: Reverts a previous commit

Add BREAKING CHANGE into the commit message body (!) to indicate a major version release.
