class Event {
  constructor () {
    this.events = {};
  }

  on (eventName, fn) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  off (eventName, fn) {
    if (this.events[eventName]) {
      const lng=this.events[eventName].length
      for (var i = 0; i < lng; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }

  emit (eventName, data) {
    if (this.events[eventName]) {
      this.events[eventName].forEach(function (fn) {
        fn(data);
      });
    }
  }
}

export default new Event();
