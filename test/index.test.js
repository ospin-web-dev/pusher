const pusher = require('../index')

describe('pusher', () => {

  afterAll(() => { jest.restoreAllMocks() })

  const MODULE_STRUCTURE = {
    OspinPusherClient: 'function',
    DevicePusherChannel: 'function',
    DeviceMaintenancePusherChannel: 'function',
    DeviceProcessesPusherChannel: 'function',
    DeviceProcessPusherChannel: 'function',
    DeviceProcessStreamingDataPusherChannel: 'function',
    UserPusherChannel: 'function',
  }

  function testFunctionPresentInModule(functionName, module) {
    it(`exposes ${functionName}`, () => {
      expect(typeof module[functionName]).toBe('function')
    })
  }

  function testStringPresentInModule(stringExportName, module) {
    it(`exposes ${stringExportName}`, () => {
      expect(typeof module[stringExportName]).toBe('string')
    })
  }

  function assertValueFunctionOrObject(value) {
    // this check provides some safety on the MODULE_STRUCTURE above so it is not extended
    // with something unexpected unintentionally
    if (value !== 'function' && value !== 'string' && typeof value !== 'object') {
      throw new Error(`${value} must be string 'function', 'string' or an object`)
    }
  }

  function testExportAgainstpusher(exportName, exportValue, path) {
    assertValueFunctionOrObject(exportValue)

    switch (exportValue) {
      case 'function': {
        testFunctionPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
        break
      }
      case 'string': {
        testStringPresentInModule(exportName, eval(path.join('.'))) // eslint-disable-line
        break
      }
      default: {
        testModuleStructure(exportValue, [ ...path, exportName ]) // eslint-disable-line
      }

    }
  }

  function testModuleContainsExpectedNumberOfExports(expectedModule, pusherModule) {
    const expectedNumberExports = Object.keys(expectedModule).length
    const numberExportsPresent = Object.keys(pusherModule).length

    it(`exports ${expectedNumberExports} functions/values + modules`, () => {
      expect(numberExportsPresent).toBe(expectedNumberExports)
    })
  }

  function assertIsModule(pusherModule, path) {
    if (typeof pusherModule !== 'object') {
      throw new Error(`pusherModule at: ${path.join('.')} is not an object`)
    }
  }

  function testModuleStructure(expectedModule, path) {
    describe(`${path.join('.')}`, () => {
      const pusherModule = eval(path.join('.')) // eslint-disable-line
      assertIsModule(pusherModule, path)
      testModuleContainsExpectedNumberOfExports(expectedModule, pusherModule)

      Object.entries(expectedModule).forEach(([ exportName, exportValue ]) => {
        testExportAgainstpusher(exportName, exportValue, path)
      })
    })
  }

  testModuleStructure(MODULE_STRUCTURE, [ 'pusher' ])
})
