import Translate from './Translate';

class Currency {
  formatLocal (value) {
    try {
          return new Intl.NumberFormat(Translate._local).format(value);
    }catch (e) {
      console.error(e)
      return value
    }
  }
}

export default new Currency();
