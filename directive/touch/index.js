import {keys} from '../../tools/helper'

const handleGesture = wrapper => {
    const {
        startX,
        startY,
        moveX,
        moveY
    } = wrapper
    const dirRatio = 0.5
    const minDistance = 16

    wrapper.goX = moveX - startX
    wrapper.goY = moveY - startY
    if (Math.abs(wrapper.goX) > minDistance && Math.abs(wrapper.goY) < dirRatio * Math.abs(wrapper.goX)) {
        wrapper.left && wrapper.goX < 0 && wrapper.left(wrapper)
        wrapper.right && wrapper.goX > 0 && wrapper.right(wrapper)
    }

    if (Math.abs(wrapper.goX) > minDistance && Math.abs(wrapper.goX) < dirRatio * Math.abs(wrapper.goY)) {
        wrapper.up && wrapper.goY < 0 && wrapper.up(wrapper)
        wrapper.down && wrapper.goY > 0 && wrapper.down(wrapper)
    }
}

function touchstart(event, wrapper) {
    const touch = event.changedTouches[0]
    wrapper.selected = true
    wrapper.startX = touch.clientX
    wrapper.startY = touch.clientY
    wrapper.moveX = touch.clientX
    wrapper.moveY = touch.clientY
    event['touch'] = wrapper
    wrapper.start && wrapper.start(wrapper)

    document.ontouchmove= e => touchmove(e, wrapper)
    document.ontouchend= e => touchend( e, wrapper)
}

function mousestart(event, wrapper) {
    const touch = event
    wrapper.selected = true
    wrapper.startX = touch.clientX
    wrapper.startY = touch.clientY
    wrapper.moveX = touch.clientX
    wrapper.moveY = touch.clientY
    event['touch'] = wrapper
    wrapper.start && wrapper.start(wrapper)
    document.onmousemove= e => mousemove(e, wrapper)
    document.onmouseup= e => mouseend( e, wrapper)
}

function touchend(event, wrapper) {
    if (!wrapper.selected) {
        return null
    }
    wrapper.selected = false
    event['touch'] = wrapper
    wrapper.end && wrapper.end(wrapper)
    handleGesture(wrapper)
    wrapper.startX = 0
    wrapper.startY = 0
    wrapper.moveX = 0
    wrapper.moveY = 0

    document.ontouchmove=null
    document.ontouchend=null
}

function mouseend(event, wrapper) {
    if (!wrapper.selected) {
        return null
    }

    wrapper.selected = false
    event['touch'] = wrapper
    wrapper.end && wrapper.end(wrapper)
    handleGesture(wrapper)

    wrapper.startX = 0
    wrapper.startY = 0
    wrapper.moveX = 0
    wrapper.moveY = 0

    document.onmousemove=null
    document.onmouseup=null
}

function touchmove(event, wrapper) {
    if (!wrapper.selected) {
        wrapper.moveX = 0
        wrapper.moveY = 0
        return null
    }
    const touch = event.changedTouches[0]
    wrapper.moveX = touch.clientX
    wrapper.moveY = touch.clientY
    event['touch'] = wrapper
    if (wrapper.move) {
        wrapper.move(wrapper)
        handleGesture(wrapper)
    }
}

function mousemove(event, wrapper) {
    if (!wrapper.selected) {
        wrapper.moveX = 0
        wrapper.moveY = 0
        return null
    }
    const touch = event
    wrapper.moveX = touch.clientX
    wrapper.moveY = touch.clientY
    event['touch'] = wrapper
    if (wrapper.move) {
        wrapper.move(wrapper)
        handleGesture(wrapper)
    }
}

function createHandlers(value) {
    const wrapper = {
        selected: false,
        startX: 0,
        startY: 0,
        goX: 0,
        goY: 0,
        moveX: 0,
        moveY: 0,
        left: value.left,
        right: value.right,
        up: value.up,
        down: value.down,
        start: value.start,
        move: value.move,
        end: value.end
    }
    return {
        touchstart: e => touchstart(e, wrapper),
        mousedown: e => mousestart(e, wrapper),
    }
}

function mounted(el, binding) {
    const value = binding.value

    const options = value.options || {
        passive: true
    }

    el.eventsHandler= createHandlers(value)
    keys(el.eventsHandler).forEach(eventName => {
        el.addEventListener(eventName, el.eventsHandler[eventName], options)
    })
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

export const Touch = {
    mounted,
    unmounted
}
export default Touch
