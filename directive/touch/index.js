/**
 * @example // v-touch usage
 * <template>
 *   <div class="touch-container">
 *     <h1>Touch Gesture Directive</h1>
 *
 *     <div class="gesture-areas">
 *       <div class="gesture-area">
 *         <h2>Swipe Detection</h2>
 *         <div
 *           v-touch="swipeHandlers"
 *           class="swipe-box"
 *         >
 *           <div class="gesture-info">
 *             <div class="info-item">
 *               <span>Direction:</span>
 *               <span class="value direction" :class="swipeDirection">
 *                 {{ swipeDirection }}
 *               </span>
 *             </div>
 *             <div class="info-item">
 *               <span>Distance X:</span>
 *               <span class="value">{{ swipeDistanceX }}px</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Distance Y:</span>
 *               <span class="value">{{ swipeDistanceY }}px</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Swipe Count:</span>
 *               <span class="value counter">{{ swipeCount }}</span>
 *             </div>
 *           </div>
 *           <div class="instruction">
 *             Swipe in any direction
 *           </div>
 *         </div>
 *       </div>
 *
 *       <div class="gesture-area">
 *         <h2>Touch Position</h2>
 *         <div
 *           v-touch="touchHandlers"
 *           class="position-box"
 *         >
 *           <div class="gesture-info">
 *             <div class="info-item">
 *               <span>Current X:</span>
 *               <span class="value">{{ currentX }}px</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Current Y:</span>
 *               <span class="value">{{ currentY }}px</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Move Count:</span>
 *               <span class="value counter">{{ moveCount }}</span>
 *             </div>
 *           </div>
 *           <div class="touch-indicator" :style="{ left: indicatorX + 'px', top: indicatorY + 'px' }"></div>
 *           <div class="instruction">
 *             Touch and move
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const swipeDirection = ref('none')
 * const swipeDistanceX = ref(0)
 * const swipeDistanceY = ref(0)
 * const swipeCount = ref(0)
 *
 * const currentX = ref(0)
 * const currentY = ref(0)
 * const moveCount = ref(0)
 *
 * const indicatorX = ref(150)
 * const indicatorY = ref(150)
 *
 * const swipeHandlers = ref({
 *   left: (wrapper) => {
 *     swipeDirection.value = 'left'
 *     swipeDistanceX.value = Math.abs(wrapper.goX)
 *     swipeDistanceY.value = Math.abs(wrapper.goY)
 *     swipeCount.value++
 *   },
 *   right: (wrapper) => {
 *     swipeDirection.value = 'right'
 *     swipeDistanceX.value = wrapper.goX
 *     swipeDistanceY.value = Math.abs(wrapper.goY)
 *     swipeCount.value++
 *   },
 *   up: (wrapper) => {
 *     swipeDirection.value = 'up'
 *     swipeDistanceX.value = Math.abs(wrapper.goX)
 *     swipeDistanceY.value = Math.abs(wrapper.goY)
 *     swipeCount.value++
 *   },
 *   down: (wrapper) => {
 *     swipeDirection.value = 'down'
 *     swipeDistanceX.value = Math.abs(wrapper.goX)
 *     swipeDistanceY.value = wrapper.goY
 *     swipeCount.value++
 *   }
 * })
 *
 * const touchHandlers = ref({
 *   move: (wrapper) => {
 *     currentX.value = wrapper.current.x
 *     currentY.value = wrapper.current.y
 *     moveCount.value++
 *
 *     indicatorX.value = wrapper.current.x
 *     indicatorY.value = wrapper.current.y
 *   }
 * })
 * <//script>
 *
 * <style>
 * .touch-container {
 *   font-family: Arial, sans-serif;
 *   padding: 20px;
 *   max-width: 800px;
 *   margin: 0 auto;
 * }
 *
 * h1 {
 *   text-align: center;
 *   color: #333;
 *   margin-bottom: 40px;
 *   font-size: 2rem;
 * }
 *
 * .gesture-areas {
 *   display: grid;
 *   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
 *   gap: 20px;
 * }
 *
 * .gesture-area {
 *   background: white;
 *   border-radius: 8px;
 *   padding: 20px;
 *   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 * }
 *
 * .gesture-area h2 {
 *   margin-top: 0;
 *   color: #667eea;
 *   font-size: 1.2rem;
 *   margin-bottom: 15px;
 *   text-align: center;
 * }
 *
 * .swipe-box,
 * .position-box {
 *   height: 250px;
 *   border: 2px solid #dee2e6;
 *   border-radius: 6px;
 *   padding: 15px;
 *   display: flex;
 *   flex-direction: column;
 *   position: relative;
 *   overflow: hidden;
 *   cursor: pointer;
 *   user-select: none;
 * }
 *
 * .swipe-box {
 *   background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
 * }
 *
 * .position-box {
 *   background: linear-gradient(135deg, #f0f4ff 0%, #e6e9ff 100%);
 * }
 *
 * .gesture-info {
 *   background: white;
 *   border-radius: 4px;
 *   padding: 10px;
 *   margin-bottom: 15px;
 *   box-shadow: 0 1px 4px rgba(0,0,0,0.1);
 * }
 *
 * .info-item {
 *   display: flex;
 *   justify-content: space-between;
 *   align-items: center;
 *   margin-bottom: 8px;
 *   padding: 6px 0;
 *   border-bottom: 1px solid #eee;
 * }
 *
 * .info-item:last-child {
 *   margin-bottom: 0;
 *   border-bottom: none;
 * }
 *
 * .info-item span:first-child {
 *   color: #555;
 *   font-weight: bold;
 *   font-size: 14px;
 * }
 *
 * .value {
 *   font-family: monospace;
 *   font-weight: bold;
 *   padding: 3px 8px;
 *   border-radius: 3px;
 *   background: #f8f9fa;
 *   min-width: 60px;
 *   text-align: center;
 *   font-size: 13px;
 * }
 *
 * .counter {
 *   background: #667eea;
 *   color: white;
 * }
 *
 * .direction {
 *   background: #ff6b6b;
 *   color: white;
 * }
 *
 * .direction.left {
 *   background: #4ecdc4;
 * }
 *
 * .direction.right {
 *   background: #ffa726;
 * }
 *
 * .direction.up {
 *   background: #43e97b;
 * }
 *
 * .direction.down {
 *   background: #f093fb;
 * }
 *
 * .instruction {
 *   text-align: center;
 *   color: #666;
 *   font-size: 1rem;
 *   margin-top: auto;
 *   padding: 15px;
 *   background: rgba(255,255,255,0.8);
 *   border-radius: 4px;
 * }
 *
 * .touch-indicator {
 *   position: absolute;
 *   width: 20px;
 *   height: 20px;
 *   background: #667eea;
 *   border-radius: 50%;
 *   transform: translate(-50%, -50%);
 *   pointer-events: none;
 *   box-shadow: 0 0 6px rgba(102, 126, 234, 0.5);
 * }
 * </style>
 * */
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
    wrapper.current = {x: touch.clientX - wrapper.clientRect['left'], y: touch.clientY - wrapper.clientRect['top']}
    event['touch'] = wrapper
    wrapper.start && wrapper.start(wrapper)

    document.ontouchmove = e => touchmove(e, wrapper)
    document.ontouchend = e => touchend(e, wrapper)
}

function mousestart(event, wrapper) {
    const touch = event
    wrapper.selected = true
    wrapper.startX = touch.clientX
    wrapper.startY = touch.clientY
    wrapper.moveX = touch.clientX
    wrapper.moveY = touch.clientY
    wrapper.current = {x: touch.clientX - wrapper.clientRect['left'], y: touch.clientY - wrapper.clientRect['top']}
    event['touch'] = wrapper
    wrapper.start && wrapper.start(wrapper)
    document.onmousemove = e => mousemove(e, wrapper)
    document.onmouseup = e => mouseend(e, wrapper)
}

function touchend(event, wrapper) {
    if (!wrapper.selected) {
        return null
    }
    wrapper.selected = false
    const touch = event.changedTouches[0]
    wrapper.current = {x: touch.clientX - wrapper.clientRect['left'], y: touch.clientY - wrapper.clientRect['top']}
    event['touch'] = wrapper
    wrapper.end && wrapper.end(wrapper)
    handleGesture(wrapper)
    wrapper.startX = 0
    wrapper.startY = 0
    wrapper.moveX = 0
    wrapper.moveY = 0

    document.ontouchmove = null
    document.ontouchend = null
}

function mouseend(event, wrapper) {
    if (!wrapper.selected) {
        return null
    }

    wrapper.selected = false
    wrapper.current = {x: event.clientX - wrapper.clientRect['left'], y: event.clientY - wrapper.clientRect['top']}
    event['touch'] = wrapper
    wrapper.end && wrapper.end(wrapper)
    handleGesture(wrapper)

    wrapper.startX = 0
    wrapper.startY = 0
    wrapper.moveX = 0
    wrapper.moveY = 0

    document.onmousemove = null
    document.onmouseup = null
}

function touchmove(event, wrapper) {
    if (!wrapper.selected) {
        wrapper.moveX = 0
        wrapper.moveY = 0
        return null
    }
    const touch = event.changedTouches[0]
    wrapper.current = {x: touch.clientX - wrapper.clientRect['left'], y: touch.clientY - wrapper.clientRect['top']}
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
    wrapper.current = {x: event.clientX - wrapper.clientRect['left'], y: event.clientY - wrapper.clientRect['top']}
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
        clientRect: value['clientRect'],
        current: {x: 0, y: 0},
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
    el.timeout_touch = setTimeout(() => {
        value['clientRect'] = el.getBoundingClientRect()
        const options = value.options || {
            passive: true
        }

        el.eventsHandler = createHandlers(value)
        Object.keys(el.eventsHandler).forEach(eventName => {
            el.addEventListener(eventName, el.eventsHandler[eventName], options)
        })
    }, 1000)

}

function unmounted(el, binding) {
    clearTimeout(el.timeout_touch)
    if (!el.eventsHandler) {
        return
    }
    Object.keys(el.eventsHandler).forEach(eventName => {
        el.removeEventListener(eventName, el.eventsHandler[eventName])
    })
    delete el.eventsHandler
}

export default {
    mounted,
    unmounted
}
