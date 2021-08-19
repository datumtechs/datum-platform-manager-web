const target = process.env.NODE_ENV
let config: any = {}
let ipConfig
if (target === 'development') {
  ipConfig = {
    BASE_URL: 'http://dev.api.its.com/dmop',
  }
} else if (target === 'test') {
  ipConfig = {
    BASE_URL: 'http://rtm.api.its.com/dmop',
  }
} else if (target === 'production') {
  ipConfig = {
    BASE_URL: 'http://api.its.com/dmop',
  }
}
config = { ...ipConfig, ...config }

export { config }
