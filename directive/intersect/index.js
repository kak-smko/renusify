/**
 * @example // v-intersect usage
 * <template>
 *   <div class="intersection-container">
 *     <h1>Intersection Observer Examples</h1>
 *
 *     <div class="scroll-area">
 *       <div class="placeholder" style="height: 300px"></div>
 *
 *       <div
 *         v-intersect="handleIntersection"
 *         class="observed-box box1"
 *         :class="{ visible: box1Visible }"
 *       >
 *         Box 1 - Default
 *         <div v-if="box1Visible" class="status">IN VIEWPORT</div>
 *       </div>
 *
 *       <div class="placeholder" style="height: 400px"></div>
 *
 *       <div
 *         v-intersect.once="handleIntersectionOnce"
 *         class="observed-box box2"
 *         :class="{ visible: box2Visible }"
 *       >
 *         Box 2 - Once
 *         <div v-if="box2Visible" class="status">TRIGGERED ONCE</div>
 *       </div>
 *
 *       <div class="placeholder" style="height: 500px"></div>
 *
 *       <div
 *         v-intersect.silent="handleIntersectionSilent"
 *         class="observed-box box3"
 *         :class="{ visible: box3Visible }"
 *       >
 *         Box 3 - Silent
 *         <div v-if="box3Visible" class="status">SILENT MODE</div>
 *       </div>
 *
 *       <div class="placeholder" style="height: 400px"></div>
 *
 *       <div
 *         v-intersect.pre=""
 *         class="observed-box box4"
 *         :class="{ visible: box4Visible }"
 *       >
 *         Box 4 - Pre (No Callback)
 *         <div v-if="box4Visible" class="status">PRE MODIFIED</div>
 *       </div>
 *
 *       <div class="placeholder" style="height: 300px"></div>
 *
 *       <div
 *         v-intersect="{
 *           handler: handleIntersectionWithOptions,
 *           options: { threshold: 0.5, rootMargin: '50px' }
 *         }"
 *         class="observed-box box5"
 *         :class="{ visible: box5Visible }"
 *       >
 *         Box 5 - Custom Options
 *         <div v-if="box5Visible" class="status">50% THRESHOLD</div>
 *       </div>
 *
 *       <div class="placeholder" style="height: 600px"></div>
 *     </div>
 *
 *     <div class="info-panel">
 *       <div class="info-row">
 *         <span>Box 1 Visible:</span>
 *         <span :class="{ active: box1Visible }">{{ box1Visible ? 'YES' : 'NO' }}</span>
 *       </div>
 *       <div class="info-row">
 *         <span>Box 2 Visible:</span>
 *         <span :class="{ active: box2Visible }">{{ box2Visible ? 'YES' : 'NO' }}</span>
 *       </div>
 *       <div class="info-row">
 *         <span>Box 3 Visible:</span>
 *         <span :class="{ active: box3Visible }">{{ box3Visible ? 'YES' : 'NO' }}</span>
 *       </div>
 *       <div class="info-row">
 *         <span>Box 4 Visible:</span>
 *         <span :class="{ active: box4Visible }">{{ box4Visible ? 'YES' : 'NO' }}</span>
 *       </div>
 *       <div class="info-row">
 *         <span>Box 5 Visible:</span>
 *         <span :class="{ active: box5Visible }">{{ box5Visible ? 'YES' : 'NO' }}</span>
 *       </div>
 *       <div class="info-row">
 *         <span>Total Entries:</span>
 *         <span class="counter">{{ entryCount }}</span>
 *       </div>
 *     </div>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const box1Visible = ref(false)
 * const box2Visible = ref(false)
 * const box3Visible = ref(false)
 * const box4Visible = ref(false)
 * const box5Visible = ref(false)
 * const entryCount = ref(0)
 *
 * const handleIntersection = (isIntersecting, entries, observer) => {
 *   box1Visible.value = isIntersecting
 *   entryCount.value++
 *   console.log('Default intersection:', isIntersecting, entries)
 * }
 *
 * const handleIntersectionOnce = (isIntersecting, entries, observer) => {
 *   box2Visible.value = isIntersecting
 *   entryCount.value++
 *   console.log('Once intersection:', isIntersecting, entries)
 * }
 *
 * const handleIntersectionSilent = (isIntersecting, entries, observer) => {
 *   box3Visible.value = isIntersecting
 *   entryCount.value++
 *   console.log('Silent intersection:', isIntersecting, entries)
 * }
 *
 * const handleIntersectionWithOptions = (isIntersecting, entries, observer) => {
 *   box5Visible.value = isIntersecting
 *   entryCount.value++
 *   console.log('Custom options intersection:', isIntersecting, entries)
 * }
 * <//script>
 *
 * <style>
 * .intersection-container {
 *   font-family: Arial, sans-serif;
 * }
 *
 * h1 {
 *   text-align: center;
 *   margin-bottom: 30px;
 *   color: #333;
 * }
 *
 * .scroll-area {
 *   height: 80vh;
 *   overflow-y: auto;
 *   border: 2px solid #ddd;
 *   border-radius: 8px;
 *   padding: 20px;
 *   background: #f9f9f9;
 * }
 *
 * .placeholder {
 *   background: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);
 *   background-size: 200% 100%;
 *   animation: loading 1.5s infinite;
 *   border-radius: 4px;
 *   margin: 10px 0;
 * }
 *
 * @keyframes loading {
 *   0% { background-position: 200% 0; }
 *   100% { background-position: -200% 0; }
 * }
 *
 * .observed-box {
 *   height: 200px;
 *   display: flex;
 *   align-items: center;
 *   justify-content: center;
 *   font-size: 1.2rem;
 *   font-weight: bold;
 *   border-radius: 8px;
 *   margin: 20px 0;
 *   opacity: 0.3;
 *   transition: all 0.5s ease;
 *   position: relative;
 *   overflow: hidden;
 * }
 *
 * .observed-box.visible {
 *   opacity: 1;
 *   transform: scale(1.05);
 *   box-shadow: 0 10px 30px rgba(0,0,0,0.2);
 * }
 *
 * .box1 {
 *   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 *   color: white;
 * }
 *
 * .box2 {
 *   background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
 *   color: white;
 * }
 *
 * .box3 {
 *   background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
 *   color: white;
 * }
 *
 * .box4 {
 *   background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
 *   color: white;
 * }
 *
 * .box5 {
 *   background: linear-gradient(135deg, #fa709a 0%, #fee140 100%);
 *   color: white;
 * }
 *
 * .status {
 *   position: absolute;
 *   bottom: 10px;
 *   right: 10px;
 *   background: rgba(0,0,0,0.8);
 *   color: white;
 *   padding: 5px 10px;
 *   border-radius: 4px;
 *   font-size: 0.8rem;
 * }
 *
 * .info-panel {
 *   position: fixed;
 *   bottom: 20px;
 *   right: 20px;
 *   background: white;
 *   padding: 20px;
 *   border-radius: 8px;
 *   box-shadow: 0 4px 20px rgba(0,0,0,0.15);
 *   min-width: 250px;
 * }
 *
 * .info-row {
 *   display: flex;
 *   justify-content: space-between;
 *   align-items: center;
 *   padding: 8px 0;
 *   border-bottom: 1px solid #eee;
 * }
 *
 * .info-row:last-child {
 *   border-bottom: none;
 * }
 *
 * .info-row span:last-child {
 *   font-weight: bold;
 *   padding: 4px 12px;
 *   border-radius: 4px;
 *   background: #f0f0f0;
 * }
 *
 * .info-row span.active {
 *   background: #4CAF50;
 *   color: white;
 * }
 *
 * .counter {
 *   background: #2196F3 !important;
 *   color: white !important;
 * }
 * </style>
 * */
function mounted (el, binding) {
    const modifiers = binding.modifiers || {}
    if (modifiers.pre) {
        return
    }
    const value = binding.value
    const callback = typeof value === 'object' ? value.handler : value
    let options = binding.value.options || {}

    const observer = new IntersectionObserver((
        entries = [],
        observer
    ) => {
        if (!el._observe) return

        if (
            callback && (
                !modifiers.silent ||
                el._observe.init
            )
        ) {
            const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))

            callback(isIntersecting, entries, observer, options)
    }

    if (el._observe.init && modifiers.once) unmounted(el)
    else (el._observe.init = true)
  }, options)

  el._observe = { init: false, observer }

  observer.observe(el)
}

function unmounted (el) {
  if (!el._observe) return

  el._observe.observer.unobserve(el)
  delete el._observe
}

export default {
    mounted,
    unmounted
}
