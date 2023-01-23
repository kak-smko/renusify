function mounted (el, binding) {
  const modifiers = binding.modifiers ||  {}
  const value = binding.value
  const callback = typeof value === 'object' ? value.handler : value
  let options = binding.value.options||{}

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

      callback(isIntersecting,entries, observer,options)
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
