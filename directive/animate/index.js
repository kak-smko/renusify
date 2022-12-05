import './style.scss'

function mounted(el, binding) {
    const modifiers = binding.modifiers || {}
    const value = binding.value
    const names = (value.name || '').split('-')
    const duration = value.duration || .5
    const timing = value.timing || null
    const delay = value.delay + 50 || 50
    el.classList.add(`${window.app.$r.prefix}animate`)
    names.forEach((name) => {
        el.classList.add(name)
    })

    const observer = new IntersectionObserver((
        entries = [],
        observer
    ) => {
        if (!el._observe) return
        const isIntersecting = Boolean(entries.find(entry => entry.isIntersecting))

        if (isIntersecting) {
            setTimeout(() => {
                if (timing) {
                    el.classList.add(timing)
                }
                el.classList.add('du-' + duration * 1000)
                el.classList.add('animate')
            }, delay)

        } else if(!modifiers.once) {
            if(entries[0].boundingClientRect.y>=0){
            el.classList.remove('animate')
            }
        }

        if (el._observe.init && modifiers.once) {
            unmounted(el, binding)
        }
        else (el._observe.init = true)
    }, {threshold: 0})

    el._observe = {init: false, observer}

    observer.observe(el)
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
