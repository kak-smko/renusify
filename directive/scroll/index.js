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
