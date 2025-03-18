import {reactive} from 'vue'
import * as helper from './tools/helper.js';
import Translate from './plugins/trans/Translate.js';
import Storage from './plugins/storage/index.js';
import DateTime from './plugins/trans/DateTime.js';
import Currency from './plugins/trans/Currency.js';
import Notify from './components/notify/notify.js';
import valid from './plugins/validation/Validate.js';
import Toast from './components/app/toast/toast.js';
import event from './plugins/event.js';
import {_register} from './components/index.js';
import {_registers} from './directive/index.js';
import {Icons} from "./tools/icons.js";

window.renusifyBus = event;

function breakpoint() {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
    const points = {
        'xs': 0,
        'sm': 600,
        'md': 960,
        'lg': 1280,
        'xl': 1620
    }
    let data = {
        points: points,
        xsOnly: width < points.sm,
        smOnly: points.sm <= width && width < points.md,
        smAndDown: width < points.md,
        smAndUp: width >= points.sm,
        mdOnly: points.md <= width && width < points.lg,
        mdAndDown: width < points.lg,
        mdAndUp: width >= points.md,
        lgOnly: points.lg <= width && width < points.xl,
        lgAndDown: width < points.xl,
        lgAndUp: width >= points.lg,
        xlOnly: points.xl <= width,
        width: width,
        height: height
    }
    if (data.xsOnly) {
        data.name = 'xs'
    } else if (data.smOnly) {
        data.name = 'sm'
    } else if (data.mdOnly) {
        data.name = 'md'
    } else if (data.lgOnly) {
        data.name = 'lg'
    } else if (data.xlOnly) {
        data.name = 'xl'
    }
    return data
}

export default {
    install: (app, options = {}) => {
        let breakpointData = breakpoint()
        // renusify application
        app.config.globalProperties.$r = reactive(Object.assign({}, {
            prefix: 'r-',
            rtl: false,
            inputs: {tile: false},
            lang: 'en',
            langs:
                {
                    'en': {
                        first_day: 0,
                        time_zone_offset: -480,/*Standard timezone offset minutes -07:00*/
                        localizeName: 'en-US',
                        timeZone: 'America/Los_Angeles',
                        rtl: false
                    },
                    'fa': {
                        first_day: 6,
                        time_zone_offset: 210,//Standard timezone offset minutes +03:30
                        localizeName: 'fa-IR',
                        timeZone: 'Asia/Tehran',
                        calendar: 'persian',
                        rtl: true
                    },
                },
            autoAddTranslate: true,
            useNotify: false,
            package: null,
            store: {},
            icons: Icons
        }, options))
        app.config.globalProperties.$r.breakpoint = breakpointData
        if (app.config.globalProperties.$r.useNotify) {
            // renusify notify
            app.config.globalProperties.$notify = function (message = null, settings = {}) {
                if (message === null) {
                    Notify.hide();
                } else {
                    settings['data'] = message
                    Notify.show(settings);
                }
            }
        }
        // renusify toast
        app.config.globalProperties.$toast = function (message, options) {
            Toast.show(message, options);
        }
        // renusify storage
        app.config.globalProperties.$storage = Storage

        // renusify helper
        app.config.globalProperties.$helper = helper
        // renusify translate
        app.config.globalProperties.$translate = new Translate(app.config.globalProperties.$r, app.config.globalProperties.$storage)
        app.config.globalProperties.$dateTime = new DateTime(app.config.globalProperties.$r, app.config.globalProperties.$r.langs)
        app.config.globalProperties.$t = (key, package_name = null, lang = null) => app.config.globalProperties.$translate.get(key, package_name, lang)
        app.config.globalProperties.$d = (value, key = 'long', local = null) => app.config.globalProperties.$dateTime.formatLocal(value, key, local)
        const c = new Currency(app.config.globalProperties.$r)
        app.config.globalProperties.$n = (value) => c.formatLocal(value)
        // renusify validation
        const v = new valid(app.config.globalProperties.$t)
        app.config.globalProperties.$v = (names) => v.checkType(names)

        app.provide('renusify', {
            $r: app.config.globalProperties.$r,
            $toast: app.config.globalProperties.$toast,
            $storage: app.config.globalProperties.$storage,
            $helper: app.config.globalProperties.$helper,
            $translate: app.config.globalProperties.$translate,
            $dateTime: app.config.globalProperties.$dateTime,
            $t: app.config.globalProperties.$t,
            $d: app.config.globalProperties.$d,
            $n: app.config.globalProperties.$n,
            $v: app.config.globalProperties.$v,
        })

        // install components
        let required_directive = _register(app, options['components'] || {});
        if (options['directives']) {
            Object.assign(required_directive, options['directives'])
        }
        // install directives
        _registers(app, required_directive);


        // renusify breakpoint
        function resize() {
            app.config.globalProperties.$r.breakpoint = breakpoint()
        }

        window.addEventListener('resize', resize, {passive: true})

    }
};
