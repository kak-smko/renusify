/**
 * @example // v-scroll usage
 * <template>
 *   <div class="scroll-container">
 *     <div class="scroll-areas">
 *       <div class="scroll-area">
 *         <h3>Window Scroll</h3>
 *         <div v-scroll.window="handleWindowScroll" class="scroll-content window-scroll">
 *           <div class="scroll-info">
 *             <div class="info-item">
 *               <span>Scroll Top:</span>
 *               <span class="value">{{ windowScrollTop }}px</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Scroll %:</span>
 *               <span class="value">{{ windowScrollPercent }}%</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Events:</span>
 *               <span class="value counter">{{ windowScrollCount }}</span>
 *             </div>
 *           </div>
 *           <div class="scroll-indicator">
 *             <div class="indicator-bar" :style="{ height: windowScrollPercent + '%' }"></div>
 *           </div>
 *         </div>
 *       </div>
 *
 *       <div class="scroll-area">
 *         <h3>Element Scroll</h3>
 *         <div ref="elementScroll" v-scroll="handleElementScroll" class="scroll-content element-scroll">
 *           <div class="scroll-info">
 *             <div class="info-item">
 *               <span>Scroll Top:</span>
 *               <span class="value">{{ elementScrollTop }}px</span>
 *             </div>
 *             <div class="info-item">
 *               <span>Direction:</span>
 *               <span class="value direction" :class="elementScrollDirection">
 *                 {{ elementScrollDirection }}
 *               </span>
 *             </div>
 *             <div class="info-item">
 *               <span>Events:</span>
 *               <span class="value counter">{{ elementScrollCount }}</span>
 *             </div>
 *           </div>
 *           <div class="scroll-content-placeholder">
 *             <div v-for="n in 10" :key="n" class="content-item">
 *               Item {{ n }}
 *             </div>
 *           </div>
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref, computed } from 'vue'
 *
 * const windowScrollTop = ref(0)
 * const windowScrollCount = ref(0)
 * const elementScrollTop = ref(0)
 * const elementScrollCount = ref(0)
 * const elementScrollDirection = ref('none')
 * const targetScrollTop = ref(0)
 * const lastElementScroll = ref(0)
 *
 * const elementScroll = ref(null)
 * const targetElement = ref(null)
 *
 * const windowScrollPercent = computed(() => {
 *   const docHeight = document.documentElement.scrollHeight - window.innerHeight
 *   return docHeight > 0 ? Math.round((windowScrollTop.value / docHeight) * 100) : 0
 * })
 *
 * const handleWindowScroll = () => {
 *   windowScrollTop.value = window.pageYOffset || document.documentElement.scrollTop
 *   windowScrollCount.value++
 * }
 *
 * const handleElementScroll = (event) => {
 *   elementScrollTop.value = event.target.scrollTop
 *   elementScrollCount.value++
 *
 *   if (lastElementScroll.value < elementScrollTop.value) {
 *     elementScrollDirection.value = 'down'
 *   } else if (lastElementScroll.value > elementScrollTop.value) {
 *     elementScrollDirection.value = 'up'
 *   }
 *   lastElementScroll.value = elementScrollTop.value
 * }
 * <//script>
 *
 * <style>
 *     body{height:200vh}
 * .scroll-container {
 *   font-family: Arial, sans-serif;
 *   padding: 20px;
 *   max-width: 1200px;
 *   margin: 0 auto;
 * }
 *
 * .scroll-areas {
 *   display: grid;
 *   grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
 *   gap: 25px;
 * }
 *
 * .scroll-area {
 *   background: white;
 *   border-radius: 12px;
 *   padding: 20px;
 *   box-shadow: 0 4px 20px rgba(0,0,0,0.1);
 * }
 *
 * .scroll-area h3 {
 *   margin-top: 0;
 *   color: #667eea;
 *   font-size: 1.3rem;
 *   margin-bottom: 15px;
 * }
 *
 * .scroll-content {
 *   height: 250px;
 *   overflow-y: auto;
 *   border: 2px solid #e9ecef;
 *   border-radius: 8px;
 *   padding: 15px;
 *   position: relative;
 * }
 *
 * .window-scroll {
 *   background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
 * }
 *
 * .element-scroll {
 *   background: linear-gradient(135deg, #f0f4ff 0%, #e6e9ff 100%);
 * }
 *
 * .scroll-info {
 *   position: sticky;
 *   top: 0;
 *   background: white;
 *   padding: 10px;
 *   border-radius: 6px;
 *   margin-bottom: 15px;
 *   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 *   z-index: 1;
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
 * }
 *
 * .value {
 *   font-family: monospace;
 *   font-weight: bold;
 *   padding: 4px 10px;
 *   border-radius: 4px;
 *   background: #f8f9fa;
 *   min-width: 70px;
 *   text-align: center;
 * }
 *
 * .counter {
 *   background: #667eea !important;
 *   color: white !important;
 * }
 *
 * .direction {
 *   background: #ff6b6b !important;
 *   color: white !important;
 * }
 *
 * .direction.up {
 *   background: #4ecdc4 !important;
 * }
 *
 * .direction.down {
 *   background: #ffa726 !important;
 * }
 *
 * .scroll-indicator {
 *   position: absolute;
 *   right: 20px;
 *   top: 100px;
 *   width: 10px;
 *   height: 100px;
 *   background: #e9ecef;
 *   border-radius: 5px;
 *   overflow: hidden;
 * }
 *
 * .indicator-bar {
 *   position: absolute;
 *   bottom: 0;
 *   width: 100%;
 *   background: linear-gradient(to top, #667eea, #764ba2);
 *   border-radius: 5px;
 *   transition: height 0.1s;
 * }
 *
 * .scroll-content-placeholder {
 *   padding: 20px;
 * }
 *
 * .content-item {
 *   padding: 15px;
 *   margin: 10px 0;
 *   background: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);
 *   color: white;
 *   border-radius: 6px;
 *   text-align: center;
 *   font-weight: bold;
 *   box-shadow: 0 2px 4px rgba(0,0,0,0.1);
 * }
 *
 *
 * .monitoring-panel {
 *   background: rgba(102, 126, 234, 0.1);
 *   border: 2px dashed #667eea;
 *   border-radius: 8px;
 *   padding: 15px;
 *   color: #667eea;
 * }
 * </style>
 * */
function mounted (el, binding) {
  const callback = binding.value
  const options = binding.options || {
    passive: true
  }
    let target = el
    if (binding.modifiers.window) {
        target = window
    } else if (binding.arg) {
        target = document.querySelector(binding.arg)
    }
  if (!target) return
  target.addEventListener('scroll', callback, options)
  el._onScroll = {
    callback,
    options,
    target
  }
}

function unmounted (el) {
  if (!el._onScroll) return
  const {
    callback,
    options,
    target
  } = el._onScroll
  target.removeEventListener('scroll', callback, options)
  delete el._onScroll
}

export default {
    mounted,
    unmounted
}
