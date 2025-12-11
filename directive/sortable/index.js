import './style.scss'
import {cleanArray, ifHas} from '../../tools/helper.js'

/**
 * @example // v-sortable usage
 *
 * <template>
 *   <div class="sortable-container">
 *     <div class="sortable-lists">
 *       <div class="sortable-list">
 *         <h3>Task List</h3>
 *         <div v-sortable="{ items: tasks, end: onTaskReorder }" class="sortable-area">
 *           <div v-for="task in tasks" :key="task.id" class="sortable-item">
 *             <div class="task-content">
 *               <div class="task-icon">📋</div>
 *               <div class="task-info">
 *                 <div class="task-title">{{ task.title }}</div>
 *                 <div class="task-desc">{{ task.description }}</div>
 *               </div>
 *             </div>
 *             <div class="task-drag-handle">
 *               ⋮⋮
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *
 *
 *     <div class="sortable-info">
 *       <div class="info-item">
 *         <span>Task Order:</span>
 *         <span class="order-value">{{ taskOrder }}</span>
 *       </div>
 *     </div>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref, computed } from 'vue'
 *
 * const tasks = ref([
 *   { id: 1, title: 'Design Homepage', description: 'Create wireframes and mockups' },
 *   { id: 2, title: 'Implement Login', description: 'Build authentication system' },
 *   { id: 3, title: 'Write Documentation', description: 'Document API endpoints' },
 *   { id: 4, title: 'Fix Mobile Bugs', description: 'Resolve responsive issues' },
 *   { id: 5, title: 'Add Analytics', description: 'Integrate tracking tools' }
 * ])
 *
 * const taskOrder = computed(() => tasks.value.map(t => t.id).join(', '))
 *
 * const onTaskReorder = (newOrder) => {
 *  console.log(newOrder)
 * }
 *
 * const onDragStart = () => {
 *   console.log('Drag started')
 * }
 *
 * <//script>
 *
 * <style>
 * .sortable-container {
 *   font-family: Arial, sans-serif;
 *   padding: 20px;
 *   max-width: 1400px;
 *   margin: 0 auto;
 * }
 *
 * .sortable-lists {
 *   display: grid;
 *   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
 *   gap: 30px;
 *   margin-bottom: 30px;
 * }
 *
 * .sortable-list {
 *   background: white;
 *   border-radius: 12px;
 *   padding: 25px;
 *   box-shadow: 0 4px 20px rgba(0,0,0,0.1);
 * }
 *
 * .sortable-list h3 {
 *   margin-top: 0;
 *   color: #667eea;
 *   font-size: 1.4rem;
 *   margin-bottom: 20px;
 *   text-align: center;
 * }
 *
 * .sortable-area {
 *   min-height: 400px;
 *   border: 2px dashed #e9ecef;
 *   border-radius: 8px;
 *   padding: 10px;
 * }
 *
 * .sortable-item {
 *   background: white;
 *   border: 2px solid #dee2e6;
 *   border-radius: 8px;
 *   padding: 15px;
 *   margin-bottom: 10px;
 *   display: flex;
 *   align-items: center;
 *   justify-content: space-between;
 *   cursor: move;
 *   user-select: none;
 *   transition: all 0.3s;
 *   position: relative;
 * }
 *
 * .sortable-item:hover {
 *   border-color: #667eea;
 *   box-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);
 * }
 *
 * .sortable-item.on-drag {
 *   position: absolute;
 *   z-index: 1000;
 *   opacity: 0.9;
 *   transform: scale(1.05);
 *   box-shadow: 0 10px 30px rgba(0,0,0,0.3);
 * }
 *
 * .task-content {
 *   display: flex;
 *   align-items: center;
 *   gap: 15px;
 *   flex: 1;
 * }
 *
 * .task-icon {
 *   font-size: 1.5rem;
 * }
 *
 * .task-info {
 *   flex: 1;
 * }
 *
 * .task-title {
 *   font-weight: bold;
 *   color: #333;
 *   margin-bottom: 4px;
 * }
 *
 * .task-desc {
 *   color: #666;
 *   font-size: 0.9rem;
 * }
 *
 * .task-drag-handle {
 *   color: #adb5bd;
 *   font-size: 1.2rem;
 *   padding: 0 10px;
 *   cursor: grab;
 *   user-select: none;
 * }
 *
 * .image-item {
 *   flex-direction: column;
 *   align-items: stretch;
 *   gap: 15px;
 * }
 *
 * .image-content {
 *   display: flex;
 *   align-items: center;
 *   gap: 15px;
 * }
 *
 * .image-preview {
 *   width: 60px;
 *   height: 60px;
 *   border-radius: 6px;
 *   object-fit: cover;
 * }
 *
 * .image-info {
 *   flex: 1;
 * }
 *
 * .image-title {
 *   font-weight: bold;
 *   color: #333;
 *   margin-bottom: 4px;
 * }
 *
 * .image-size {
 *   color: #666;
 *   font-size: 0.9rem;
 * }
 *
 * .image-drag {
 *   align-self: flex-end;
 *   color: #adb5bd;
 *   font-size: 1.2rem;
 *   padding: 5px 10px;
 *   background: #f8f9fa;
 *   border-radius: 4px;
 *   cursor: grab;
 *   user-select: none;
 * }
 *
 * .user-content {
 *   display: flex;
 *   align-items: center;
 *   gap: 15px;
 *   flex: 1;
 * }
 *
 * .user-avatar {
 *   width: 50px;
 *   height: 50px;
 *   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 *   color: white;
 *   border-radius: 50%;
 *   display: flex;
 *   align-items: center;
 *   justify-content: center;
 *   font-weight: bold;
 *   font-size: 1.2rem;
 * }
 *
 * .user-info {
 *   flex: 1;
 * }
 *
 * .user-name {
 *   font-weight: bold;
 *   color: #333;
 *   margin-bottom: 4px;
 * }
 *
 * .user-email {
 *   color: #666;
 *   font-size: 0.9rem;
 * }
 *
 * .sortable-info {
 *   background: white;
 *   border-radius: 12px;
 *   padding: 25px;
 *   box-shadow: 0 4px 20px rgba(0,0,0,0.1);
 * }
 *
 * .sortable-info .info-item {
 *   display: flex;
 *   justify-content: space-between;
 *   align-items: center;
 *   padding: 12px;
 *   margin-bottom: 10px;
 *   background: #f8f9fa;
 *   border-radius: 8px;
 *   border-left: 4px solid #667eea;
 * }
 *
 * .sortable-info .info-item:last-child {
 *   margin-bottom: 0;
 * }
 *
 * .sortable-info .info-item span:first-child {
 *   font-weight: bold;
 *   color: #555;
 * }
 *
 * .order-value {
 *   font-family: monospace;
 *   font-weight: bold;
 *   background: #e9ecef;
 *   padding: 6px 12px;
 *   border-radius: 4px;
 *   min-width: 150px;
 *   text-align: center;
 * }
 * </style>
 * */
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

    targetEl.style.top = targetEl.offsetTop - targetEl.clientHeight / 2 + "px";
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
    el.classList.add(`r-directive-sortable`);
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
        Object.keys(el.eventsHandler).forEach(eventName => {
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
    el.classList.remove(`r-directive-sortable`);
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
        Object.keys(el.eventsHandler).forEach(eventName => {
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

export default {
    mounted,
    updated,
    unmounted
}
