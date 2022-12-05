import {keys,ifHas} from '../../tools/helper'

let wrapper = {}
let current=null
function mousestart(e,uid) {
    e.stopPropagation()
    const event=ifHas(e,e,'changedTouches',0)
    wrapper[uid].startX = event.clientX
    wrapper[uid].pos3 = event.clientX
    wrapper[uid].startY = event.clientY
    wrapper[uid].pos4 = event.clientY
    current=uid
    document.onmouseup = closeDragElement;
    document.ontouchend = closeDragElement;
    document.onmousemove = elementDrag;
    document.ontouchmove = elementDrag;
    wrapper[uid].start && wrapper[uid].start(wrapper[uid])
}

function elementDrag(e) {
    e.stopPropagation()
    const event=ifHas(e,e,'changedTouches',0)
    wrapper[current].pos1 = wrapper[current].pos3 - event.clientX;
    wrapper[current].pos2 = wrapper[current].pos4 - event.clientY;
    wrapper[current].pos3 = event.clientX;
    wrapper[current].pos4 = event.clientY;
    wrapper[current].endX= event.clientX;
    wrapper[current].endY = event.clientY;
    wrapper[current].top = wrapper[current].el.offsetTop - wrapper[current].pos2 ;
    wrapper[current].left = wrapper[current].el.offsetLeft - wrapper[current].pos1 ;
    wrapper[current].move && wrapper[current].move(wrapper[current])
}

function closeDragElement(e) {
    e.stopPropagation()
    const event=ifHas(e,e,'changedTouches',0)
    wrapper[current].pos1 = wrapper[current].pos3 - event.clientX;
    wrapper[current].pos2 = wrapper[current].pos4 - event.clientY;
    wrapper[current].pos3 = event.clientX;
    wrapper[current].pos4 = event.clientY;
    wrapper[current].endX= event.clientX;
    wrapper[current].endY = event.clientY;
    wrapper[current].top = wrapper[current].el.offsetTop - wrapper.pos2 ;
    wrapper[current].left = wrapper[current].el.offsetLeft - wrapper.pos1 ;
    wrapper[current].end && wrapper[current].end(wrapper[current])
    document.onmouseup = null;
    document.ontouchend = null;
    document.onmousemove = null;
    document.ontouchmove = null;
}

function createHandlers(el, value,uid) {
    wrapper[uid].start = value.start
    wrapper[uid].move = value.move
    wrapper[uid].end = value.end
    wrapper[uid].el = el

    return {
        mousedown: e => mousestart(e, uid),
        touchstart: e => mousestart(e, uid)
    }
}

function mounted(el, binding) {
    const uid=binding.instance.$.uid
    wrapper[uid]={
    top: 0,
    left: 0,
    startX: 0,
    startY: 0,
    endX: 0,
    endY: 0,
    pos1: 0,
    pos2: 0,
    pos3: 0,
    pos4: 0
}
    const value = binding.value
    const options = value.options || {
        passive: true
    } // Needed to pass unit tests

    el.eventsHandler = createHandlers(el, value,uid)

    keys(el.eventsHandler).forEach(eventName => {
        el.addEventListener(eventName, el.eventsHandler[eventName], options)
    })
}


function unmounted(el, binding) {
    const uid=binding.instance.$.uid
    const value = binding.value
    const options = value.options || {
        passive: true
    }

    if (!el.eventsHandler){
            return
        }
    keys(el.eventsHandler).forEach(eventName => {
        el.removeEventListener(eventName, el.eventsHandler[eventName]),options
    })
    wrapper[uid]={}
    delete el.eventsHandler
}

export const Drag = {
    mounted,
    unmounted
}
export default Drag
