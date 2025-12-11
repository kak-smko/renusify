import {ifHas} from '../../tools/helper.js'

/**
 * @example // v-drag usage
 * <template>
 *   <div class="drag-container">
 *     <h2>Draggable Elements</h2>
 *
 *     <div
 *       v-drag="{
 *         start: onDragStart,
 *         move: onDragMove,
 *         end: onDragEnd
 *       }"
 *       class="draggable-box box1"
 *       :style="{ top: box1Top + 'px', left: box1Left + 'px' }"
 *     >
 *       Box 1<br>
 *       X: {{ box1Left }}<br>
 *       Y: {{ box1Top }}
 *     </div>
 *
 *
 *     <div class="info-panel">
 *       <div class="info-item">
 *         <strong>Active Box:</strong> {{ activeBox }}
 *       </div>
 *       <div class="info-item">
 *         <strong>Total Distance:</strong> {{ totalDistance }}px
 *       </div>
 *       <button @click="resetPositions" class="reset-btn">
 *         Reset Positions
 *       </button>
 *     </div>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const box1Top = ref(50)
 * const box1Left = ref(50)
 *
 * const activeBox = ref('None')
 * const totalDistance = ref(0)
 *
 * const onDragStart = (data) => {
 *   activeBox.value = 'Box 1'
 *   console.log('Box 1 drag started:', data)
 * }
 *
 * const onDragMove = (data) => {
 *   box1Top.value = data.top
 *   box1Left.value = data.left
 *
 *   const dx = data.endX - data.startX
 *   const dy = data.endY - data.startY
 *   totalDistance.value = Math.sqrt(dx * dx + dy * dy).toFixed(2)
 * }
 *
 * const onDragEnd = (data) => {
 *   console.log('Box 1 drag ended:', data)
 *   activeBox.value = 'None'
 * }
 *
 *
 *
 * const resetPositions = () => {
 *   box1Top.value = 50
 *   box1Left.value = 50
 *   totalDistance.value = 0
 *   activeBox.value = 'None'
 * }
 * <//script>
 *
 * <style>
 * .drag-container {
 *   position: relative;
 *   width: 100%;
 *   height: 600px;
 *   border: 2px solid #333;
 *   border-radius: 8px;
 *   padding: 20px;
 *   background: #f8f9fa;
 * }
 *
 * h2 {
 *   text-align: center;
 *   margin-bottom: 30px;
 *   color: #333;
 * }
 *
 * .draggable-box {
 *   position: absolute;
 *   width: 120px;
 *   height: 120px;
 *   border-radius: 8px;
 *   cursor: move;
 *   user-select: none;
 *   display: flex;
 *   align-items: center;
 *   justify-content: center;
 *   text-align: center;
 *   font-size: 14px;
 *   font-weight: bold;
 *   box-shadow: 0 4px 12px rgba(0,0,0,0.15);
 *   transition: box-shadow 0.3s;
 * }
 *
 * .draggable-box:hover {
 *   box-shadow: 0 6px 16px rgba(0,0,0,0.2);
 * }
 *
 * .box1 {
 *   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 *   color: white;
 * }
 *
 *
 * .info-panel {
 *   position: absolute;
 *   bottom: 20px;
 *   left: 20px;
 *   background: white;
 *   padding: 15px;
 *   border-radius: 8px;
 *   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 *   min-width: 200px;
 * }
 *
 * .info-item {
 *   margin-bottom: 10px;
 *   padding: 8px;
 *   background: #f8f9fa;
 *   border-radius: 4px;
 * }
 *
 * .reset-btn {
 *   width: 100%;
 *   padding: 10px;
 *   background: #dc3545;
 *   color: white;
 *   border: none;
 *   border-radius: 4px;
 *   cursor: pointer;
 *   font-weight: bold;
 *   transition: background 0.3s;
 * }
 *
 * .reset-btn:hover {
 *   background: #c82333;
 * }
 * </style>
 * */

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

    Object.keys(el.eventsHandler).forEach(eventName => {
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
    Object.keys(el.eventsHandler).forEach(eventName => {
        el.removeEventListener(eventName, el.eventsHandler[eventName]), options
    })
    wrapper[uid] = {}
    delete el.eventsHandler
}

export default {
    mounted,
    unmounted
}
