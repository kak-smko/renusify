import './style.scss'
import {keys, ifHas, cleanArray} from '../../tools/helper'

let scopeObj;

function defineScope(elementArray) {
    scopeObj = [];
    const lng=elementArray.length
    for (let i = 0, max = lng; i < max; i++) {
        var newObj = {};
        const viewportOffset = elementArray[i].getBoundingClientRect();
        newObj.target = elementArray[i];
        newObj.startY = viewportOffset.top;
        newObj.endY = viewportOffset.top + elementArray[i].offsetHeight;
        scopeObj.push(newObj);
    }
}

function target(el, i = 0) {
    if (i > 10) {
        return false
    }
    if (!el.classList.contains('dragable')) {
        return target(el.parentElement, i + 1)
    }
    return el
}

function mousestart(e, wrapper) {
    e.stopPropagation()
    const event = ifHas(e, e, 'changedTouches', 0)

    let targetEl = target(event.target);
    if (!targetEl) {
        return
    }
    defineScope(wrapper.el.children);

    let holder = document.createElement('div')
    holder.classList.add('sortable-holder')
    holder.style.width = targetEl.clientWidth + "px";
    holder.style.height = targetEl.clientHeight + "px";
    wrapper.el.insertBefore(holder, targetEl);
    wrapper.holder = holder

    const y = event.y || event.pageY

    targetEl.style.top = y - targetEl.clientHeight / 2 + "px";
    targetEl.style.width = targetEl.clientWidth + "px";
    targetEl.classList.add("on-drag");

    wrapper.start && wrapper.start(lists(wrapper, wrapper.items))
    wrapper.target = targetEl;
    wrapper.startY = targetEl.offsetTop;
    wrapper.endY = targetEl.offsetTop + targetEl.offsetHeight;

    document.onmouseup = e => closeDragElement(e, wrapper);
    document.ontouchend = e => closeDragElement(e, wrapper);
    document.onmousemove = e => elementDrag(e, wrapper);
    document.ontouchmove = e => elementDrag(e, wrapper);
}

function insertAfter(newNode, referenceNode) {
    if (referenceNode && referenceNode.parentNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
    }
}

function lists(wrapper, items = undefined) {
    let children = wrapper.el.children
    let res = []
    const lng=children.length
    for(let i=0;i<lng;i++){
        let child=children[i]
        const n = child.getAttribute('sort')
        if (items) {
            res.push(items[n])
        } else {
            res.push(n)
        }
    }
    return res
}

function elementDrag(e, wrapper) {
    e.stopPropagation()
    const event = ifHas(e, e, 'changedTouches', 0)
    let targetEl = wrapper.target;
    const y = event.y || event.pageY
    targetEl.style.top = y - targetEl.clientHeight / 2 - 10 + "px";
    hit(wrapper, y, 'holder')
}

function hit(wrapper, thisY, div = 'target') {
    if (thisY < scopeObj[0].startY) {
        wrapper.el.insertBefore(wrapper[div], scopeObj[0].target);
    }
    const lng=scopeObj.length
    for (let i = 0; i < lng; i++) {
        if (thisY > scopeObj[i].startY && thisY < scopeObj[i].endY) {
            insertAfter(wrapper[div], scopeObj[i].target);
            return;
        }
    }
    if (thisY > scopeObj[scopeObj.length - 1].startY) {
        insertAfter(wrapper[div], scopeObj[scopeObj.length - 1].target);
    }
}

function closeDragElement(e, wrapper) {
    e.stopPropagation()
    const event = ifHas(e, e, 'changedTouches', 0)
    let targetEl = wrapper.target;
    const y = event.y || event.pageY
    hit(wrapper, y);

    targetEl.classList.remove("on-drag");
    targetEl.style = ''
    wrapper.el.removeChild(wrapper.holder)
    wrapper.end && wrapper.end(lists(wrapper, wrapper.items))
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
}

function mounted(el, binding) {
    const value = binding.value || {}
    let children = el.children
    let wrapper = {
        el: el,
        items: value.items && cleanArray(value.items),
        start: value.start,
        end: value.end,
        grab: value.grab
    }
    el.classList.add(`${window.app.$r.prefix}sortable`);
    el.eventsHandler = {
        mousedown: e => mousestart(e, wrapper),
        touchstart: e => mousestart(e, wrapper)
    }
    const lng=children.length
    for(let i=0;i<lng;i++){
        let child=children[i]
        child.classList.add("dragable");
        child.setAttribute('sort', i)
        let grab
        if (wrapper.grab) {
            grab = child.querySelector(wrapper.grab)
        }
        let c = child
        if (grab) {
            c = grab
        }
        c.classList.add("grab");
        keys(el.eventsHandler).forEach(eventName => {
            c.addEventListener(eventName, el.eventsHandler[eventName], {
                passive: true
            })

        })

    }
}

function unmounted(el, binding) {
    const value = binding.value || {}
    let children = el.children
    let wrapper = {
        grab: value.grab
    }
    el.classList.remove(`${window.app.$r.prefix}sortable`);
    const lng=children.length
    for(let i=0;i<lng;i++){
        let child=children[i]
        child.classList.remove("dragable");
        child.removeAttribute('sort')
        let grab
        if (wrapper.grab) {
            grab = child.querySelector(wrapper.grab)
        }
        let c = child
        if (grab) {
            c = grab
        }

        c.classList.remove("grab");
        if (!el.eventsHandler) {
            return
        }
        keys(el.eventsHandler).forEach(eventName => {
            c.removeEventListener(eventName, el.eventsHandler[eventName], {
                passive: true
            })
        })
    }
    delete el.eventsHandler
}

function updated(el, binding) {
    unmounted(el, binding)
    mounted(el, binding)
}

export const Sortable = {
    mounted,
    updated,
    unmounted
}
export default Sortable
