class HTTPError extends Error {

  constructor({ message = '', error = null, status = null } = {}) {
    super(message)
    this.error = error
    this.status = status
    this.name = 'HTTPError'
  }

}

module.exports = HTTPError
