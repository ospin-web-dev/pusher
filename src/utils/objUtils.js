const removeUndefinedKeys = obj => (
  Object.keys(obj).reduce((newObj, currKey) => {
    if (obj[currKey] === undefined) return newObj
    return { ...newObj, [currKey]: obj[currKey] }
  }, {})
)

module.exports = {
  removeUndefinedKeys,
}
