export default class DateTime {
    constructor($r, langs) {
        this.$r = $r
        this.format = {
            narrow: {
                weekday: 'narrow'
            },
            day: {
                day: 'numeric'
            },
            month: {
                month: 'short'
            },
            year: {
            year: 'numeric'
        },
        short: {
            year: 'numeric', month: 'short', day: 'numeric'
        },
        medium: {
            year: 'numeric', month: 'numeric', day: 'numeric'
        },
        weekday: {
            weekday: 'short'
        },
        long: {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric'
        }
        }

        this.langs = langs;
    }

    set_lang(name, lang) {
        if (!lang['localizeName']) {
            console.error('new Lang Must contain localizeName and timeZone (en: {\n' +
                '            first_day:0,\n' +
                '            time_zone_offset:-480,//Standard timezone offset minutes -07:00\n' +
                '            localizeName: \'en-US\',\n' +
                '            timeZone: \'America/Los_Angeles\'\n' +
                '        })')
            return
        }
        this.langs[name] = lang
    };

    set_format(value) {
        Object.assign(this.format, this.format, value)
    };

    formatLocal(value, type = 'long', local = null) {
        if (local === null) {
            local = this.$r.lang
        }
        if (!(local in this.langs)) {
            console.warn('set local:' + local + ' with this.$dateTime.set_lang("' + local + '",{\n' +
                '            localizeName: "en-US",\n' +
                '            first_day:0\n' +
                '        })')
            this.langs[local] = {
                localizeName: local
            }
        }
        let opt = Object.assign({}, this.format[type], this.langs[local]);
        if (!opt.hour12) {
            opt.hour12 = false;
        }
        try {
            return new Intl.DateTimeFormat(this.langs[local].localizeName, opt).format(value);
        } catch (e) {
            console.error(e, value)
            return value
        }
    };
}

