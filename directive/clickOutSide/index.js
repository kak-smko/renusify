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

export const clickOutside = {
    mounted,
    unmounted
}
export default clickOutside