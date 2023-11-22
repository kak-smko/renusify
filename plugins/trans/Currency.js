export default class Currency {
    constructor($r) {
        this.$r = $r
    }

    formatLocal(value) {
        try {
            return new Intl.NumberFormat(this.$r.lang).format(value);
        } catch (e) {
            console.error(e)
            return value
        }
    }
}
