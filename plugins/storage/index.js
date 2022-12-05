class Storage {
    stringfy(value){
        return JSON.stringify(value)
    }
    parse(value){
        return JSON.parse(value)
    }
    set(key, value) {
        localStorage.setItem(key,this.stringfy(value))
    }

    has(key) {
        return this.get(key)!==null
    }

    get(key,def=null) {
        let i=localStorage.getItem(key)
        if(i===null){
            return def
        }
        return this.parse(i)
    }

    remove(key) {
        return localStorage.removeItem(key)
    }

    pull(key){
        const d=this.get(key)
        this.remove(key)
        return d
    }
}

export default new Storage();
