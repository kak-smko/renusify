export default class Translate {
    constructor($r, $storage) {
        this.$r = $r
        this.$storage = $storage
        this._count = 0;
        this._failed_messages = {};
        this._messages = {};
        this._local = 'en';
        this._package = $r.package;
        this._store = []
    }

    get messages() {
        return this._messages;
    }

    get failed_messages() {
        return Object.keys(this._failed_messages);
    }

    get local() {
        return this._local;
    }

    set local(value) {
        this._local = value;
    }

    set package(value) {
        this._package = value;
    }

    setMessages(obj, local) {
        this._messages[local || this._local] = Object.assign({}, this._messages[local || this._local], obj);
    }

    add(key, value) {
        if (!this._messages[this._local]) {
            this._messages[this._local] = {}
        }
        this._messages[this._local][key] = value;
    }

    replaceAll(string, search, replace) {
        return string.split(search).join(replace);
    }

    get(key, package_name = null, lang = null) {
        if (key === undefined || key === null) {
            return ''
        }
        let variable = []
        if (typeof key === 'object') {
            variable = key[1]
            key = key[0]
            if (!variable) {
                console.error(
                    'object key must have variables. key:' + key + ' variable:' + variable
                )
                this._failed_messages[key] = true
                return key
            }
        }

        if (package_name && typeof package_name !== 'string') {
            console.error(
                'package name must be string. key:' + key + ' package_name:' + package_name
            )
            this._failed_messages[key] = true
            return key
        }
        if (typeof key !== 'string') {
            this._failed_messages[key] = true
            return key
        }
        key = key.toLowerCase()

        const local = lang !== null ? lang : this._local
        const pack = package_name !== null ? package_name : this._package
        if (!local) {
            this._failed_messages[key] = true
            return key;
        }
        if (!this._messages[local]) {
            this._failed_messages[key] = true
            return key;
        }
        if (this._messages[local][key]) {
            let val = this._messages[local][key];
            const lng = variable.length
            for (let i = 0; i < lng; i++) {
                val = this.replaceAll(val, '{' + i + '}', variable[i]);
            }

            if (val === null || val === '') {
                this._failed_messages[key] = true
                return key;
            }
            return val;
        } else if (this.$r && this.$r.autoAddTranslate && pack && this._count < 100 && /^([0-9a-z_.])*$/.test(key)) {
            if (!this._store.includes(key)) {
                let url = '/api/translate/' + pack + '/' + key + '?v=';
                const lng = variable.length
                for (let i = 0; i < lng; i++) {
                    url += '{' + i + '}';
                }
                fetch(url, {
                    method: 'POST'
                });
                this._count++;
                this._store.push(key)
            }
            this._failed_messages[key] = true
            return key;
        } else {
            this._failed_messages[key] = true
            return key;
        }
    }
}
