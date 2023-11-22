export default class Validate {
    constructor($t) {
        this.$t = $t
    }

    required() {
        let msg = this.$t('required_error', 'renusify');
        return (v) => !!(v !== undefined && v !== null && v !== '') || msg
    }

    requiredArray() {
        return (v) => (v !== undefined && v !== null && v.length > 0) || this.$t('required_error', 'renusify');
    }

    email() {
        return (v) => (v && v.length > 0 ? /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) : true) || this.$t('validate_email', 'renusify');
  }

  url() {
      return (v) => (v && v.length > 0 ? /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(v) : true) || this.$t('validate_url', 'renusify');
  }

  match(val) {
    return (v) => {
      if (v == val) {
        return true
      } else {
          return this.$t(['validate_match', [val]], 'renusify');
      }
    }
  }

  phone() {
      return (v) => (v && v.length > 0 ? /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4}$/.test(v) : true) || this.$t('validate_phone', 'renusify');
  }

  number() {
      return (v) => (v && v.length > 0 ? /^([0-9.])*$/.test(v) : true) || this.$t('numeric_error', 'renusify');
  }

  english() {
      return (v) => (v && v.length > 0 ? /^([0-9a-zA-Z])*$/.test(v) : true) || this.$t('english_error', 'renusify');
  }

  min_len(num) {
      return v => (v && v.length > 0 ? v.length >= parseInt(num) ? true : this.$t(['min_len_error', [num, v.length]], 'renusify') : true)
  }

  max_len(num) {
      return v => (v && v.length > 0 ? v.length <= parseInt(num) ? true : this.$t(['max_len_error', [num, v.length]], 'renusify') : true)
  }

  len(num) {
      return v => (v && v.length > 0 ? v.length === parseInt(num) ? true : this.$t(['len_error', [num, v.length]], 'renusify') : true) || msg
  }

  min(num) {
      return v => (v ? parseFloat(v) >= parseFloat(num) ? true : this.$t(['min_error', [num, parseFloat(v)]], 'renusify') : true)
  }

  max(num) {
      return v => (v ? parseFloat(v) <= parseFloat(num) ? true : this.$t(['max_error', [num, parseFloat(v)]], 'renusify') : true)
  }

  eq(num) {
      return v => (v ? parseFloat(v) === parseFloat(num) : true) || this.$t(['validate_eq', [num]], 'renusify');
  }

  notDefined(name) {
      return v => this.$t(['validate_notDefined', [name]], 'renusify');
  }

  checkType(names) {
    let filters = [];
    if (typeof names === 'object') {
      names.forEach((name) => {
        let res = name.split(':');
        let par1 = res[1] ? res[1] : null;
        let par2 = res[2] ? res[2] : null;
        let par3 = res[3] ? res[3] : null;
        if (this[res[0]]) {
          if (par3 === null && par2 === null) {
            filters.push(this[res[0]](par1))
          } else if (par3 === null) {
            filters.push(this[res[0]](par1, par2))
          } else {
            filters.push(this[res[0]](par1, par2, par3))
          }
        } else {
          filters.push(this.notDefined(name))
        }
      })
    }
    return filters
  }
}