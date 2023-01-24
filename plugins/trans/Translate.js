import Axios from 'axios';

class Translate {
    constructor() {
        this._count = 0;
        this._messages = {};
        this._local = 'en';
        this._package = null;
        this._store = []
    }

    get messages() {
        return this._messages;
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
        this._messages[local||this._local] = Object.assign({}, this._messages[local||this._local], obj);
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

    get(key, package_name = null,lang = null) {
        if(key===undefined||key===null){
            return ''
        }
        let variable=[]
        if (typeof key ==='object'){
            variable=key[1]
            key=key[0]
            if(!variable){
                console.error(
                'object key must have variables. key:'+key+' variable:'+variable
            )
                return key
            }
        }

        if (package_name && typeof package_name !== 'string') {
            console.error(
                'package name must be string. key:' + key + ' package_name:' + package_name
            )
            return key
        }
        if (typeof key !== 'string') {
            return key
        }
        key = key.toLowerCase()

        const local = lang !== null ? lang : this._local
        const pack = package_name !== null ? package_name : this._package
        if (!local) {
            return key;
        }
        if (!this._messages[local]) {
            return key;
        }
        if (this._messages[local][key]) {
            let val = this._messages[local][key];
            const lng = variable.length
            for (let i = 0; i < lng; i++) {
                val = this.replaceAll(val, '{' + i + '}', variable[i]);
            }
            if (val === null || val === '') {
                return key;
            }
            return val;
        } else if (window.app.$r && window.app.$r.autoAddTranslate && pack && this._count < 100 && /^([a-z_.])*$/.test(key)) {
            if (!this._store.includes(key)) {
                let url = '/translate/' + pack + '/' + key + '?v=';
                const lng = variable.length
                for (let i = 0; i < lng; i++) {
                    url += '{' + i + '}';
                }
                Axios.post(url);
                this._count++;
                this._store.push(key)
            }

            return key;
        } else {
            return key;
        }
    }

    loads(packages=[]){
        packages.forEach((p)=>{
            this.load(p)
        })
    }
    load(p) {
        if(!window.app||!window.app.$r){
            console.error('need define window.app=vue Application')
            return
        }
        const pack = p||window.app.$r.package;
        if(!p){
            this.package = pack;
        }
        if(!window.app.$r.store['langs_loaded']){
                window.app.$r.store['langs_loaded']={}
            }
        window.app.$r.store['langs_loaded'][pack] = false;
        let locale = window.app.$r.lang;
        if (window.app.$storage.get("lang")) {
            locale = window.app.$storage.get("lang");
        }
        Axios.get(`/translate/${pack}/${locale}`).then(
            res => {
                if (res.data.length !== 0) {
                    const lang = {};
                    const lng=res.data.length
                    for (let i = 0; i < lng; i++) {
                        lang[res.data[i].key] = res.data[i][locale];
                    }
                    this.local = locale;
                    this.setMessages(lang);
                } else {
                    this.local = locale;
                    this.setMessages({});
                }
                window.app.$r.store['langs_loaded'][pack] = true;
            },
            () => {
                window.app.$r.store['langs_loaded'][pack] = true;
            }
        );
    }
}

export default new Translate();
