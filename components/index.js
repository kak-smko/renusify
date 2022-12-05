import {defineAsyncComponent} from "vue";

const list = {
    'r-app': 'app/index.vue',
    'r-content': 'content/index.vue',
    'r-meta': 'meta/index.js',
    'r-container': 'container/index.vue',
    'r-row': 'container/row.vue',
    'r-col': 'container/col.vue',
    'r-spacer': 'container/spacer.vue',
    'r-divider': 'container/divider.vue',
    'r-btn': 'button/index.vue',
    'r-icon': 'icon/index.vue',
    'r-form-creator': 'formCreator/index.vue',
    'r-card': 'card/index.vue',
    'r-modal': 'modal/index.vue',
    'r-form': 'form/form.vue',
    'r-input': 'form/input.vue',
    'r-text-input': 'form/text-input.vue',
    'r-unit-input': 'form/unit-input.vue',
    'r-tel': 'form/inputTel/index.vue',
    'r-switch': 'form/switch.vue',
    'r-checkbox': 'form/checkbox.vue',
    'r-radio-input': 'form/radioInput.vue',
    'r-chip': 'chip/index.vue',
    'r-list': 'list/index.vue',
    'r-table': 'table/index.vue',
    'r-table-crud': 'table/crud/index.vue',
    'r-message': 'message/index.vue',
    'r-time-ago': 'timeAgo/index.vue',
    'r-confirm': 'confirm/index.vue',
    'r-mask-input': 'form/mask-input.vue',
    'r-progress-circular': 'progress/circular.vue',
    'r-progress-liner': 'progress/liner.vue',
    'r-img': 'img/index.vue',
    'r-chart': "chart/chart.vue",
    'r-date-picker': 'form/datePicker/index.vue',
    'r-btn-group': 'button/buttonGroup.vue',
    'r-group-input': "form/group-input.vue",
    'r-text-area': 'form/text-area.vue',
    'r-address': 'form/address.vue',
    'r-check-input': 'form/check-input.vue',
    'r-unique-feild': 'form/uniqueFeild/index.vue',
    'r-file-uploader': 'form/fileUploader/index.vue',
    'r-select': 'form/select.vue',
    'r-range': 'form/range.vue',
    'r-number': 'form/number.vue',
    'r-rating': 'form/rating.vue',
    'r-text-editor': 'form/text-editor/index.vue',
    'r-text-editor-preview': 'form/text-editor/preview.vue',
    'r-avatar': 'avatar/index.vue',
    'r-toolbar': 'bar/toolbar/index.vue',
    'r-bottom-navigation': 'bar/bottomNav.vue',
    'r-bottom-navigation-circle': "bar/bottomNavigationCircle.vue",
    'r-breadcrumbs': 'breadcrumb/index.vue',
    'r-breadcrumbs-item': 'breadcrumb/bredcrumbItem.vue',
    'r-count-down': 'countdown/index.vue',
    'r-slider': 'slider/index.vue',
    'r-swiper': 'swiper/index.vue',
    'r-tabs': 'tabs/index.vue',
    'r-infinite-div': 'infinite/div.vue',
    'r-infinite-page': 'infinite/page.vue',
    'r-infinite-box': 'infinite/index.vue',
    'r-iframe': 'iframe/index.vue',
    'r-menu': 'menu/index.vue',
    'r-tree': 'tree/index.vue',
    'r-tree-element': 'tree/tree-element.vue',
    'r-float': 'float/index.vue',
    'r-timeline': 'timeline/index.vue',
    'r-password': "form/password.vue",
    'r-color-picker': "form/colorPicker/index.vue",
    'r-html2pdf': "html2pdf/index.vue",
    'r-html2pdf-page-break': "html2pdf/pageBreak.vue",
    'r-code-editor': "codeEditor/index.vue",
    'r-map': "map/index.vue",
    'r-map-select': "map/select.vue",
    'r-map-route': "map/route.vue",
    'r-tour': "tour/index.vue",
    'r-chat': "chat/index.vue",
    'r-time-picker': "form/timepicker/index.vue",
    'r-cam-input': "form/camInput",
    'r-json': 'form/json/index.vue',
    'r-calendar': 'calendar/index.vue',
    'r-search-box': 'searchBox/index.vue',
}

export const register = (app, components) => {
    if (components.length === 0) {
        for (let c in list) {
            if (list.hasOwnProperty(c)) {
                app.component(c, require('./' + list[c]).default)
            }
        }
    } else {
        components.forEach((c) => {
            try {
                app.component(c, require('./' + list[c]).default)
            } catch (e) {
                console.error('component not found', c, e)
            }

        })
    }
}