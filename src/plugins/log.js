import logdown from 'logdown'

const Log = {
  install (Vue, options) {
    const logger = logdown('vue')
    logger.state.isEnabled = true
    Vue.prototype.$log = logger
  }
}

export default Log
