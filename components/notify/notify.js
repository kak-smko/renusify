class Notify {
  constructor() {
      this._config = {
          handler: (msg) => {
          },
          bus: 'renusifyBus'
      };
  }

    show(message) {
        const config = this._config;
        setTimeout(() => {
            window[config.bus].emit('r-notify', message);
        }, 100);
    }

    hide() {
        const config = this._config;
        window[config.bus].emit('hide-r-notify');
    }

    listener() {
        window[this._config.bus].on('r-notify', this._config.handler);
    }
}

export default new Notify()
