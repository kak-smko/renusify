import {reactive} from 'vue'
import * as helper from './tools/helper';
import Translate from './plugins/trans/Translate';
import Storage from './plugins/storage/index';
import DateTime from './plugins/trans/DateTime';
import Currency from './plugins/trans/Currency';
import Notify from './components/app/notify/notify.js';
import valid from './plugins/validation/Validate';
import Toast from './components/app/toast/toast.js';
import event from './plugins/event';
import {register} from './components';
import {registers} from './directive';
import {Icons} from "./tools/icons";

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
                        daylight_saving_time: true,
                        localizeName: 'en-US',
                        timeZone: 'America/Los_Angeles',
                        rtl: false
                    },
                    'fa': {
                        first_day: 6,
                        time_zone_offset: 210,//Standard timezone offset minutes +03:30
                        daylight_saving_time: false,
                        localizeName: 'fa-IR',
                        timeZone: 'Asia/Tehran',
                        calendar: 'persian',
                        rtl: true
                    },
                },
            autoAddTranslate: true,
            package: null,
            store: {},
            icons: Icons,
            breakpoint: breakpointData
        }, options))
        // renusify notify
        app.config.globalProperties.$notify = function (message = null) {
            if (message === null) {
                Notify.hide();
            } else {
                Notify.show(message);
            }
        }
        // renusify toast
        app.config.globalProperties.$toast = function (message, options) {
            Toast.show(message, options);
        }
        // renusify helper
        app.config.globalProperties.$helper = helper
        // renusify translate
        app.config.globalProperties.$translate = Translate
        DateTime.langs = app.config.globalProperties.$r.langs
        app.config.globalProperties.$dateTime = DateTime
        app.config.globalProperties.$t = (key, package_name = null, lang = null) => Translate.get(key, package_name, lang)
        app.config.globalProperties.$d = (value, key = 'long', local = null) => DateTime.formatLocal(value, key, local)
        app.config.globalProperties.$n = (value) => Currency.formatLocal(value)
        // renusify validation
        app.config.globalProperties.$v = (names) => valid.checkType(names)

        // install components
        let required_directive = register(app, options['components'] || []);
        if (options['directives']) {
            options['directives'].forEach((i) => {
                if (!required_directive.includes(i)) {
                    required_directive.push(i)
                }
            })
        }
        // install directives
        registers(app, required_directive);

        // renusify storage
        app.config.globalProperties.$storage = Storage

        // renusify breakpoint
        function resize() {
            app.config.globalProperties.$r.breakpoint = breakpoint()
        }

        window.addEventListener('resize', resize, {passive: true})

    }
};
