const list = {
    'animate': 'animate',
    'click-outside': 'clickOutSide',
    'drag': 'drag',
    'intersect': 'intersect',
    'mask': 'mask',
    'parallax': 'parallax',
    'resize': 'resize',
    'ripple': 'ripple',
    'scroll': 'scroll',
    'sortable': 'sortable',
    'touch': 'touch',
    'title': 'title',


}
export const registers = (app, directives) => {
    directives.forEach((item) => {
        app.directive(item, require('./' + list[item]).default)
    })
}
