import 'renusify/directive/animate/style.scss'

function mounted(el, binding) {
    const modifiers = binding.modifiers || {}
    const value = binding.value
    const names = (value.name || '').split('-')
    const duration = value.duration || .5
    const timing = value.timing || null
    const delay = value.delay + 50 || 50
    el.classList.add(`r-directive-animate`)
    names.forEach((name) => {
        el.classList.add(name)
    })

    const observer = new IntersectionObserver((
        entries = [],
        observer
    ) => {
        if (!el._observe) return
        if (el._observe.loading) return
        const isIntersecting = entries[0].isIntersecting
        if (isIntersecting) {
            el._observe.init = true
            el._observe.loading = true
            setTimeout(() => {
                if (timing) {
                    el.classList.add(timing)
                }
                el.classList.add('du-' + duration * 1000)
                el.classList.add('animate')
                el._observe.loading = false
            }, delay)

        } else if(!modifiers.once) {
            if(entries[0].boundingClientRect.y>=0){
            el.classList.remove('animate')
            }
        }

        if (el._observe.init && modifiers.once) {
            unmounted(el, binding)
        }
    }, {threshold: value.threshold || 0})

    el._observe = {init: false, loading: false, observer}

    setTimeout(() => {
        observer.observe(el)
    }, 100)
}

function unmounted(el,binding) {
    if (!el._observe) return
    el._observe.observer.unobserve(el)
    delete el._observe
}

export default {
    mounted,
    unmounted
}
