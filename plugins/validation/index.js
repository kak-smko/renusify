import valid from './Validate'

export default {

  // The install method will be called with the Vue constructor as the first argument, along with possible options
  install (app, options) {
    // Add $plugin instance method directly to Vue components
    app.config.globalProperties.$v = (names) => valid.checkType(names)
  }
}
