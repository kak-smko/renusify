class Notify {
  constructor () {
    this._config = {
      handler: (msg) => {
      },
      bus: 'renusifyBus',
      event: 'notify'
    };
  }

  show (message) {
    const config = this._config;
    setTimeout(() => {
      window[config.bus].emit(config.event, message);
    }, 100);
  }

  hide () {
    const config = this._config;
    window[config.bus].emit('hide-' + config.event);
  }

  listener () {
    window[this._config.bus].on(this._config.event, this._config.handler);
  }
}

export default new Notify();
