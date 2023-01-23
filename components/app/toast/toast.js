class Toast {
  constructor () {
    this._config = {
      handler: (m) => alert(m),
      extract: 'msg',
      bus: 'renusifyBus',
      event: 'toast'
    };
  }

  setConfig (customConfig) {
    Object.assign(this._config, customConfig);
  }

  show (message, options = null) {
    this.emitter(message, options);
  }

  interceptor (data, options = null) {
    if (data !== null && Object.prototype.hasOwnProperty.call(data, this._config.extract)) {
      const message = data[this._config.extract];
      this.emitter(message, options);
    }
  }

  emitter (message, options) {
    const config = this._config;
    setTimeout(() => {
      window[config.bus].emit(config.event, {msg:message, options:options});
    }, 100);
  }

  listener () {
    window[this._config.bus].on(this._config.event, this._config.handler);
  }
}

export default new Toast();
