const list = {
    'r-app': {'p': 'app/index.vue', 'c': ['r-btn', 'r-icon', 'r-spacer'], 'd': []},
    'r-avatar': {'p': 'avatar/index.vue', 'c': ['r-btn', 'r-icon'], 'd': []},
    'r-toolbar': {
        'p': 'bar/toolbar/index.vue',
        'c': ['r-container', 'r-spacer', 'r-search-box', 'r-img', 'r-icon', 'r-btn', 'r-divider'],
        'd': []
    },
    'r-bottom-navigation': {'p': 'bar/bottomNav.vue', 'c': [], 'd': []},
    'r-bottom-navigation-circle': {'p': 'bar/bottomNavigationCircle.vue', 'c': ['r-icon'], 'd': []},
    'r-breadcrumbs': {'p': 'breadcrumb/index.vue', 'c': ['r-icon'], 'd': []},
    'r-btn': {'p': 'button/index.vue', 'c': ['r-progress-circle'], 'd': ['ripple']},
    'r-btn-confirm': {'p': 'button/buttonConfirm.vue', 'c': ['r-btn', 'r-confirm'], 'd': []},
    'r-btn-group': {
        'p': 'button/buttonGroup.vue',
        'c': ['r-btn', 'r-icon', 'r-card', 'r-list'],
        'd': ['click-outside']
    },
    'r-calendar': {
        'p': 'calendar/index.vue',
        'c': ['r-container', 'r-row', 'r-col', 'r-btn', 'r-icon', 'r-modal', 'r-card'],
        'd': []
    },
    'r-card': {'p': 'card/index.vue', 'c': [], 'd': ['ripple']},
    'r-chart': {'p': 'chart/chart.vue', 'c': [], 'd': []},
    'r-world-map': {'p': 'chart/worldMap.vue', 'c': ['r-float'], 'd': []},
    'r-chat': {
        'p': 'chat/index.vue',
        'c': ['r-btn', 'r-icon', 'r-progress-circle', 'r-img'],
        'd': ['intersect', 'scroll']
    },
    'r-chip': {'p': 'chip/index.vue', 'c': ['r-btn', 'r-icon'], 'd': []},
    'r-code-editor': {'p': 'codeEditor/index.vue', 'c': ['r-btn', 'r-icon'], 'd': []},
    'r-confirm': {
        'p': 'confirm/index.vue',
        'c': ['r-modal', 'r-card', 'r-container', 'r-row', 'r-col', 'r-divider', 'r-form', 'r-text-input', 'r-btn'],
        'd': []
    },
    'r-container': {'p': 'container/index.vue', 'c': [], 'd': []},
    'r-row': {'p': 'container/row.vue', 'c': [], 'd': []},
    'r-col': {'p': 'container/col.vue', 'c': [], 'd': []},
    'r-spacer': {'p': 'container/spacer.vue', 'c': [], 'd': []},
    'r-divider': {'p': 'container/divider.vue', 'c': [], 'd': []},
    'r-content': {'p': 'content/index.vue', 'c': [], 'd': []},
    'r-count-down': {'p': 'countdown/index.vue', 'c': [], 'd': []},
    'r-cropper': {'p': 'cropper/index.vue', 'c': [], 'd': ['touch']},
    'r-float': {'p': 'float/index.vue', 'c': [], 'd': []},
    'r-form': {'p': 'form/form.vue', 'c': [], 'd': []},
    'r-color-input': {
        'p': 'form/colorPicker/index.vue',
        'c': ['r-input', 'r-modal', 'r-btn', 'r-icon'],
        'd': ['touch']
    },
    'r-date-input': {
        'p': 'form/datePicker/index.vue',
        'c': ['r-input', 'r-modal', 'r-container', 'r-row', 'r-col', 'r-btn', 'r-icon'],
        'd': []
    },
    'r-file-input': {
        'p': 'form/fileUploader/index.vue',
        'c': ['r-input', 'r-row', 'r-btn', 'r-icon', 'r-progress-circle', 'r-text-input', 'r-cropper'],
        'd': []
    },
    'r-tel-input': {
        'p': 'form/inputTel/index.vue',
        'c': ['r-modal', 'r-card', 'r-text-input', 'r-list', 'r-spacer', 'r-btn'],
        'd': []
    },
    'r-json-input': {
        'p': 'form/json/index.vue',
        'c': ['r-btn', 'r-icon', 'r-text-input', 'r-select-input', 'r-number-input', 'r-switch-input'],
        'd': []
    },
    'r-text-editor': {
        'p': 'form/text-editor/index.vue',
        'c': ['r-container', 'r-row', 'r-col', 'r-btn-group', 'r-btn',
            'r-icon', 'r-select-input', 'r-input', 'r-img', 'r-modal',
            'r-form', 'r-file-input', 'r-text-input', 'r-switch-input', 'r-number-input'],
        'd': []
    },
    'r-text-editor-preview': {'p': 'form/text-editor/preview.vue', 'c': [], 'd': []},
    'r-time-input': {'p': 'form/timepicker/index.vue', 'c': ['r-input', 'r-modal', 'r-card', 'r-btn'], 'd': []},
    'r-time-range-input': {'p': 'form/timepicker/range.vue', 'c': ['r-input', 'r-modal', 'r-card', 'r-btn'], 'd': []},
    'r-unique-input': {'p': 'form/unique/index.vue', 'c': ['r-text-input'], 'd': []},
    'r-address-input': {'p': 'form/address.vue', 'c': ['r-select-input', 'r-text-area', 'r-text-input'], 'd': []},
    'r-cam-input': {'p': 'form/camInput', 'c': ['r-input', 'r-btn', 'r-icon'], 'd': []},
    'r-check-input': {'p': 'form/check-input.vue', 'c': ['r-input', 'r-btn', 'r-icon'], 'd': []},
    'r-checkbox-input': {'p': 'form/checkbox.vue', 'c': ['r-input', 'r-icon'], 'd': []},
    'r-group-input': {
        'p': 'form/group-input.vue',
        'c': ['r-btn', 'r-icon'],
        'd': []
    },
    'r-input': {'p': 'form/input.vue', 'c': ['r-icon'], 'd': []},
    'r-mask-input': {'p': 'form/mask-input.vue', 'c': ['r-input'], 'd': ['mask']},
    'r-number-input': {'p': 'form/number.vue', 'c': ['r-input', 'r-btn', 'r-icon'], 'd': []},
    'r-password-input': {'p': 'form/password.vue', 'c': ['r-input', 'r-icon'], 'd': []},
    'r-radio-input': {'p': 'form/radioInput.vue', 'c': ['r-input', 'r-icon'], 'd': []},
    'r-range-input': {'p': 'form/range.vue', 'c': ['r-input'], 'd': ['touch']},
    'r-rating-input': {'p': 'form/rating.vue', 'c': ['r-btn', 'r-icon'], 'd': []},
    'r-select-input': {
        'p': 'form/select.vue',
        'c': ['r-input', 'r-chip', 'r-progress-line', 'r-card', 'r-list', 'r-icon'],
        'd': ['click-outside']
    },
    'r-switch-input': {'p': 'form/switch.vue', 'c': ['r-input'], 'd': []},
    'r-text-area': {'p': 'form/text-area.vue', 'c': ['r-input'], 'd': []},
    'r-text-input': {'p': 'form/text-input.vue', 'c': ['r-input'], 'd': []},
    'r-unit-input': {'p': 'form/unit-input.vue', 'c': ['r-input', 'r-select-input'], 'd': []},
    'r-form-creator': {
        'p': 'formCreator/index.vue',
        'c': ['r-card', 'r-container', 'r-message', 'r-form', 'r-row', 'r-col', 'r-btn'],
        'd': []
    },
    'r-html2pdf': {'p': 'html2pdf/index.vue', 'c': ['r-btn', 'r-icon', 'r-html2pdf-page-break'], 'd': []},
    'r-html2pdf-page-break': {'p': 'html2pdf/pageBreak.vue', 'c': [], 'd': []},
    'r-icon': {'p': 'icon/index.vue', 'c': [], 'd': []},
    'r-img': {'p': 'img/index.vue', 'c': [], 'd': ['intersect']},
    'r-infinite-div': {
        'p': 'infinite/div.vue',
        'c': ['r-container', 'r-row', 'r-col', 'r-progress-line'],
        'd': ['scroll']
    },
    'r-infinite-page': {'p': 'infinite/page.vue', 'c': ['r-progress-line'], 'd': ['scroll']},
    'r-infinite-box': {
        'p': 'infinite/index.vue',
        'c': ['r-card', 'r-container', 'r-row', 'r-col', 'r-switch-input', 'r-infinite-div'],
        'd': []
    },
    'r-list': {'p': 'list/index.vue', 'c': ['r-icon'], 'd': ['ripple']},
    'r-map': {'p': 'map/index.vue', 'c': ['r-search-box', 'r-btn', 'r-icon', 'r-confirm'], 'd': []},
    'r-map-select': {'p': 'map/select.vue', 'c': ['r-map'], 'd': []},
    'r-map-route': {
        'p': 'map/route.vue',
        'c': ['r-container', 'r-row', 'r-col', 'r-map', 'r-divider', 'r-spacer', 'r-btn', 'r-icon'],
        'd': []
    },
    'r-menu': {'p': 'menu/index.vue', 'c': ['r-btn', 'r-icon', 'r-card'], 'd': ['click-outside']},
    'r-message': {'p': 'message/index.vue', 'c': ['r-container', 'r-row', 'r-col'], 'd': []},
    'r-meta': {'p': 'meta/index.js', 'c': [], 'd': []},
    'r-modal': {'p': 'modal/index.vue', 'c': ['r-btn', 'r-icon'], 'd': []},
    'r-progress-circle': {'p': 'progress/circle.vue', 'c': [], 'd': []},
    'r-progress-line': {'p': 'progress/line.vue', 'c': [], 'd': []},
    'r-search-box': {
        'p': 'searchBox/index.vue',
        'c': ['r-progress-line', 'r-card', 'r-list', 'r-btn', 'r-icon', 'r-select-input'],
        'd': ['click-outside']
    },
    'r-skeleton': {'p': 'skeleton/index.vue', 'c': [], 'd': []},
    'r-slider': {'p': 'slider/index.vue', 'c': ['r-progress-line', 'r-btn', 'r-icon'], 'd': ['touch']},
    'r-swiper': {'p': 'swiper/index.vue', 'c': [], 'd': ['touch']},
    'r-table': {
        'p': 'table/index.vue',
        'c': ['r-btn', 'r-icon', 'r-switch-input', 'r-progress-line', 'r-modal', 'r-card', 'r-container', 'r-row', 'r-col'],
        'd': ['sortable']
    },
    'r-table-crud': {
        'p': 'table/crud/index.vue',
        'c': ['r-card', 'r-modal', 'r-form-creator', 'r-json-input', 'r-divider', 'r-number-input', 'r-btn', 'r-table', 'r-icon',
            'r-time-ago', 'r-switch-input', 'r-confirm', 'r-container', 'r-row', 'r-col', 'r-text-input', 'r-select-input', 'r-date-input',
            'r-progress-line'],
        'd': []
    },
    'r-tabs': {'p': 'tabs/index.vue', 'c': ['r-btn', 'r-icon'], 'd': []},
    'r-time-ago': {'p': 'timeAgo/index.vue', 'c': [], 'd': []},
    'r-timeline': {'p': 'timeline/index.vue', 'c': ['r-container', 'r-row', 'r-col'], 'd': []},
    'r-tour': {'p': 'tour/index.vue', 'c': ['r-container', 'r-spacer', 'r-btn'], 'd': []},
    'r-tree': {
        'p': 'tree/index.vue',
        'c': ['r-container', 'r-row', 'r-col', 'r-select-input', 'r-float', 'r-tree-element'],
        'd': []
    },
    'r-tree-element': {'p': 'tree/tree-element.vue', 'c': ['r-container', 'r-row', 'r-col', 'r-btn', 'r-icon'], 'd': []}
}

export const register = (app, components) => {
    let d = {}
    let s = {}
    const setup = (ls) => {
        ls.forEach((c) => {
            try {
                if (!s[c]) {
                    app.component(c, require('./' + list[c]['p']).default)
                    list[c]['d'].forEach((i) => {
                        d[i] = true
                    })
                    setup(list[c]['c'])
                    s[c] = true
                }
            } catch (e) {
                console.error('component not found', c, e)
            }
        })
    }
    if (components.length === 0) {
        setup(Object.keys(list))
    } else {
        if (!components.includes('r-app')) {
            setup(['r-app'])
        }
        setup(components)
    }
    return Object.keys(d)
}