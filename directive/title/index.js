import './style.scss'
import {keys} from '../../tools/helper'

function mousestart(el, binding) {
    let d = 'top'

    if (['left', 'right', 'top', 'bottom'].includes(binding.arg)) {
        d = binding.arg
    }

    let $title = document.getElementById(`${window.app.$r.prefix}title`)
    if (!$title) {
        $title = document.createElement('div')
        $title.setAttribute('id', `${window.app.$r.prefix}title`)
    } else {
        mouseleave(el, binding)
        mousestart(el, binding)
        return null
    }

    var $titleDimension = el.getBoundingClientRect()
    $title.innerHTML = binding.value
    $title.style.opacity = 1
    const app=document.getElementsByClassName(`${window.app.$r.prefix}app`)
    app[0].appendChild($title)
    const h = $title.getBoundingClientRect().height + 5
    const w = $title.getBoundingClientRect().width + 5

    if (d === 'top') {
        $title.style.left = $titleDimension.left + ($titleDimension.width / 2) + 'px'
        $title.style.top = $titleDimension.top - h + 'px'
    } else if (d === 'bottom') {
        $title.style.left = $titleDimension.left + ($titleDimension.width / 2) + 'px'
        $title.style.top = $titleDimension.top + $titleDimension.height + 5 + 'px'
    } else if (d === 'left') {
        $title.style.left = $titleDimension.left - 5 - w / 2 + 'px'
        $title.style.top = $titleDimension.top + ($titleDimension.height / 2)-(h-5)/2 + 'px'
    } else if (d === 'right') {
        $title.style.left = $titleDimension.left + $titleDimension.width + 5 + w / 2 + 'px'
        $title.style.top = $titleDimension.top + ($titleDimension.height / 2)-(h-5)/2 + 'px'
    }
}


function mouseleave(el, binding) {
    let d = 'top'

    if (['left', 'right', 'top', 'bottom'].includes(binding.arg)) {
        d = binding.arg
    }
    let elm = document.getElementById(`${window.app.$r.prefix}title`)

    if (elm === null) {
        return null
    }
    elm.style.opacity = 0
    const $titleDimension = el.getBoundingClientRect()
    if (d === 'top') {
        elm.style.top = $titleDimension.top - 10 + 'px'
    } else if (d === 'bottom') {
        elm.style.top = $titleDimension.top + $titleDimension.height - 10 + 'px'
    } else if (d === 'left') {
        elm.style.left = $titleDimension.left + 'px'
    } else if (d === 'right') {
        elm.style.left = $titleDimension.left + $titleDimension.width + 'px'
    }

    elm = document.getElementById(`${window.app.$r.prefix}title`)
    if (elm === null) {
        return null
    }
    const app=document.getElementsByClassName(`${window.app.$r.prefix}app`)
    app[0].removeChild(elm)
}

function createHandlers(el, binding) {
    return {
        mouseenter: e => mousestart(el, binding),
        mouseleave: e => mouseleave(el, binding),
        touchstart: e => mousestart(el, binding),
        touchend: e => mouseleave(el, binding)
    }
}

function mounted(el, binding) {
    const value = binding.value
    if (!value) {
        return;
    }
    const options = value.options || {
        passive: true
    } // Needed to pass unit tests

    el.eventsHandler= createHandlers(el, binding)

    keys(el.eventsHandler).forEach(eventName => {
        el.addEventListener(eventName, el.eventsHandler[eventName], options)
    })
}

function updated(el, binding) {
    if (binding.value === binding.oldValue) {
        return null
    }

    unmounted(el, binding)
    mounted(el, binding)

}

function unmounted(el, binding) {
    if (!el.eventsHandler){
            return
        }
    keys(el.eventsHandler).forEach(eventName => {
        el.removeEventListener(eventName, el.eventsHandler[eventName])
    })
    delete el.eventsHandler
}


export const Title = {
    mounted,
    updated,
    unmounted
}
export default Title