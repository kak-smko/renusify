const list = {
    'r-app': {'p': 'app/index.vue', 'c': [], 'd': []},
    'r-content': {'p': 'content/index.vue', 'c': [], 'd': []},
    'r-meta': {'p': 'meta/index.js', 'c': [], 'd': []},
    'r-container': {'p': 'container/index.vue', 'c': [], 'd': []},
    'r-row': {'p': 'container/row.vue', 'c': [], 'd': []},
    'r-col': {'p': 'container/col.vue', 'c': [], 'd': []},
    'r-spacer': {'p': 'container/spacer.vue', 'c': [], 'd': []},
    'r-divider': {'p': 'container/divider.vue', 'c': [], 'd': []},
    'r-btn': {'p': 'button/index.vue', 'c': [], 'd': ['ripple']},
    'r-icon': {'p': 'icon/index.vue', 'c': [], 'd': []},
    'r-form-creator': {'p': 'formCreator/index.vue', 'c': [], 'd': []},
    'r-card': {'p': 'card/index.vue', 'c': [], 'd': ['ripple']},
    'r-modal': {'p': 'modal/index.vue', 'c': [], 'd': []},
    'r-form': {'p': 'form/form.vue', 'c': [], 'd': []},
    'r-input': {'p': 'form/input.vue', 'c': [], 'd': []},
    'r-text-input': {'p': 'form/text-input.vue', 'c': [], 'd': []},
    'r-unit-input': {'p': 'form/unit-input.vue', 'c': [], 'd': []},
    'r-tel': {'p': 'form/inputTel/index.vue', 'c': [], 'd': []},
    'r-switch': {'p': 'form/switch.vue', 'c': [], 'd': []},
    'r-checkbox': {'p': 'form/checkbox.vue', 'c': [], 'd': []},
    'r-radio-input': {'p': 'form/radioInput.vue', 'c': [], 'd': []},
    'r-chip': {'p': 'chip/index.vue', 'c': [], 'd': []},
    'r-list': {'p': 'list/index.vue', 'c': [], 'd': ['ripple']},
    'r-table': {'p': 'table/index.vue', 'c': [], 'd': ['sortable']},
    'r-table-crud': {'p': 'table/crud/index.vue', 'c': [], 'd': []},
    'r-message': {'p': 'message/index.vue', 'c': [], 'd': []},
    'r-time-ago': {'p': 'timeAgo/index.vue', 'c': [], 'd': []},
    'r-confirm': {'p': 'confirm/index.vue', 'c': [], 'd': []},
    'r-mask-input': {'p': 'form/mask-input.vue', 'c': [], 'd': ['mask']},
    'r-progress-circular': {'p': 'progress/circular.vue', 'c': [], 'd': []},
    'r-progress-liner': {'p': 'progress/liner.vue', 'c': [], 'd': []},
    'r-img': {'p': 'img/index.vue', 'c': [], 'd': []},
    'r-chart': {'p': 'chart/chart.vue', 'c': [], 'd': []},
    'r-date-picker': {'p': 'form/datePicker/index.vue', 'c': [], 'd': []},
    'r-btn-group': {'p': 'button/buttonGroup.vue', 'c': [], 'd': ['click-outside']},
    'r-group-input': {'p': 'form/group-input.vue', 'c': [], 'd': []},
    'r-text-area': {'p': 'form/text-area.vue', 'c': [], 'd': []},
    'r-address': {'p': 'form/address.vue', 'c': [], 'd': []},
    'r-check-input': {'p': 'form/check-input.vue', 'c': [], 'd': []},
    'r-unique-feild': {'p': 'form/uniqueFeild/index.vue', 'c': [], 'd': []},
    'r-file-uploader': {'p': 'form/fileUploader/index.vue', 'c': [], 'd': []},
    'r-select': {'p': 'form/select.vue', 'c': [], 'd': ['click-outside']},
    'r-range': {'p': 'form/range.vue', 'c': [], 'd': ['touch']},
    'r-number': {'p': 'form/number.vue', 'c': [], 'd': []},
    'r-rating': {'p': 'form/rating.vue', 'c': [], 'd': []},
    'r-text-editor': {'p': 'form/text-editor/index.vue', 'c': [], 'd': []},
    'r-text-editor-preview': {'p': 'form/text-editor/preview.vue', 'c': [], 'd': []},
    'r-avatar': {'p': 'avatar/index.vue', 'c': [], 'd': []},
    'r-toolbar': {'p': 'bar/toolbar/index.vue', 'c': [], 'd': []},
    'r-bottom-navigation': {'p': 'bar/bottomNav.vue', 'c': [], 'd': []},
    'r-bottom-navigation-circle': {'p': 'bar/bottomNavigationCircle.vue', 'c': [], 'd': []},
    'r-breadcrumbs': {'p': 'breadcrumb/index.vue', 'c': [], 'd': []},
    'r-breadcrumbs-item': {'p': 'breadcrumb/bredcrumbItem.vue', 'c': [], 'd': []},
    'r-count-down': {'p': 'countdown/index.vue', 'c': [], 'd': []},
    'r-slider': {'p': 'slider/index.vue', 'c': [], 'd': ['touch']},
    'r-swiper': {'p': 'swiper/index.vue', 'c': [], 'd': ['touch']},
    'r-tabs': {'p': 'tabs/index.vue', 'c': [], 'd': []},
    'r-infinite-div': {'p': 'infinite/div.vue', 'c': [], 'd': ['scroll']},
    'r-infinite-page': {'p': 'infinite/page.vue', 'c': [], 'd': ['scroll']},
    'r-infinite-box': {'p': 'infinite/index.vue', 'c': [], 'd': []},
    'r-iframe': {'p': 'iframe/index.vue', 'c': [], 'd': []},
    'r-menu': {'p': 'menu/index.vue', 'c': [], 'd': ['click-outside']},
    'r-tree': {'p': 'tree/index.vue', 'c': [], 'd': []},
    'r-tree-element': {'p': 'tree/tree-element.vue', 'c': [], 'd': []},
    'r-float': {'p': 'float/index.vue', 'c': [], 'd': []},
    'r-timeline': {'p': 'timeline/index.vue', 'c': [], 'd': []},
    'r-password': {'p': 'form/password.vue', 'c': [], 'd': []},
    'r-color-picker': {'p': 'form/colorPicker/index.vue', 'c': [], 'd': ['touch']},
    'r-html2pdf': {'p': 'html2pdf/index.vue', 'c': [], 'd': []},
    'r-html2pdf-page-break': {'p': 'html2pdf/pageBreak.vue', 'c': [], 'd': []},
    'r-code-editor': {'p': 'codeEditor/index.vue', 'c': [], 'd': []},
    'r-map': {'p': 'map/index.vue', 'c': [], 'd': []},
    'r-map-select': {'p': 'map/select.vue', 'c': [], 'd': []},
    'r-map-route': {'p': 'map/route.vue', 'c': [], 'd': []},
    'r-tour': {'p': 'tour/index.vue', 'c': [], 'd': []},
    'r-chat': {'p': 'chat/index.vue', 'c': [], 'd': ['intersect', 'scroll']},
    'r-time-picker': {'p': 'form/timepicker/index.vue', 'c': [], 'd': []},
    'r-cam-input': {'p': 'form/camInput', 'c': [], 'd': []},
    'r-json': {'p': 'form/json/index.vue', 'c': [], 'd': []},
    'r-calendar': {'p': 'calendar/index.vue', 'c': [], 'd': []},
    'r-search-box': {'p': 'searchBox/index.vue', 'c': [], 'd': ['click-outside']},
}

export const register = (app, components) => {
    let d = {}
    if (components.length === 0) {
        for (let c in list) {
            if (list.hasOwnProperty(c)) {
                app.component(c, require('./' + list[c]['p']).default)
                list[c]['d'].forEach((i) => {
                    d[i] = true
                })
            }
        }
    } else {
        components.forEach((c) => {
            try {
                app.component(c, require('./' + list[c]['p']).default)
                list[c]['d'].forEach((i) => {
                    d[i] = true
                })
            } catch (e) {
                console.error('component not found', c, e)
            }

        })
    }
    return Object.keys(d)
}