export * as animate from './animate/index.js'
export * as clickOutside from './clickOutSide/index.js'
export * as drag from './drag/index.js'
export * as intersect from './intersect/index.js'
export * as mask from './mask/index.js'
export * as parallax from './parallax/index.js'
export * as ripple from './ripple/index.js'
export * as scroll from './scroll/index.js'
export * as sortable from './sortable/index.js'
export * as touch from './touch/index.js'
export * as title from './title/index.js'

export const _registers = (app, directives) => {
    for (const arrayKey in directives) {
        app.directive(arrayKey,directives[arrayKey].default)
    }
}
