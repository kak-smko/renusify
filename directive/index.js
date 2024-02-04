export * as animate from './animate/index'
export * as clickOutside from './clickOutSide/index'
export * as drag from './drag/index'
export * as intersect from './intersect/index'
export * as mask from './mask/index'
export * as parallax from './parallax/index'
export * as resize from './resize/index'
export * as ripple from './ripple/index'
export * as scroll from './scroll/index'
export * as sortable from './sortable/index'
export * as touch from './touch/index'
export * as title from './title/index'
export * as skeleton from './skeleton/index'

export const _registers = (app, directives) => {
    for (const arrayKey in directives) {
        app.directive(arrayKey,directives[arrayKey].default)
    }
}
