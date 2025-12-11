/**
 * @example // v-click-outside usage
 * <template>
 *   <div>
 *     <div class="dropdown-container">
 *       <button @click="toggleDropdown">
 *         {{ selectedOption || 'Select an option' }}
 *       </button>
 *
 *       <div v-if="isOpen" v-click-outside="closeDropdown" class="dropdown-menu">
 *         <div
 *           v-for="option in options"
 *           :key="option"
 *           @click="selectOption(option)"
 *           class="dropdown-item"
 *         >
 *           {{ option }}
 *         </div>
 *       </div>
 *     </div>
 *   </div>
 * </template>
 *
 * <script>
 * import { ref } from 'vue'
 *
 * const isOpen = ref(false)
 * const selectedOption = ref('')
 * const isModalOpen = ref(false)
 *
 * const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']
 *
 * const toggleDropdown = () => {
 *   isOpen.value = !isOpen.value
 * }
 *
 * const closeDropdown = () => {
 *   isOpen.value = false
 * }
 *
 * const selectOption = (option) => {
 *   selectedOption.value = option
 *   isOpen.value = false
 * }
 *
 * const onClickOutside = () => {
 *   console.log('Clicked outside the box')
 * }
 *
 * const handleOutsideClick = () => {
 *   isModalOpen.value = false
 * }
 *
 * const toggleModal = () => {
 *   isModalOpen.value = !isModalOpen.value
 * }
 * <//script>
 *
 * <style>
 * .dropdown-container {
 *   position: relative;
 *   display: inline-block;
 *   margin: 2rem;
 * }
 *
 * .dropdown-container button {
 *   padding: 0.5rem 1rem;
 *   background: #007bff;
 *   color: white;
 *   border: none;
 *   border-radius: 4px;
 *   cursor: pointer;
 * }
 *
 * .dropdown-menu {
 *   position: absolute;
 *   top: 100%;
 *   left: 0;
 *   background: white;
 *   border: 1px solid #ddd;
 *   border-radius: 4px;
 *   box-shadow: 0 2px 8px rgba(0,0,0,0.1);
 *   z-index: 1000;
 *   margin-top: 0.5rem;
 *   min-width: 200px;
 * }
 *
 * .dropdown-item {
 *   padding: 0.75rem 1rem;
 *   cursor: pointer;
 * }
 *
 * .dropdown-item:hover {
 *   background: #f5f5f5;
 * }
 *
 * </style>
 * */
const IS_TOUCH =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window ||
    (typeof navigator !== 'undefined' && navigator.msMaxTouchPoints > 0))
const EVENT = IS_TOUCH ? 'touchstart' : 'click'

function on_event(el, event, handler) {
  const path = event.composedPath()
  const isClickOutside = path
    ? path.indexOf(el) < 0
    : !el.contains(event.target)

  if (!isClickOutside) {
    return
  }

  handler(event)
}

function mounted(el, binding) {
    el['click_outside'] = {
    srcTarget: document.documentElement,
    handler: (event) => on_event(el, event, binding.value)
  }

  setTimeout(() => {
      if (!el['click_outside']) {
        return
      }
      el['click_outside'].srcTarget.addEventListener(EVENT, el['click_outside'].handler, {
        passive: true
    })
    }, 0)
}
function unmounted(el, binding) {
    if (!el['click_outside']){
      return
    }
  el['click_outside'].srcTarget.removeEventListener(EVENT, el['click_outside'].handler)
  delete el['click_outside']
}

export default {
    mounted,
    unmounted
}