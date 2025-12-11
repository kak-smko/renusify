import 'renusify/directive/animate/style.scss'

/**
 * @example // v-animate usage
 * <template>
 *   <div class="container">
 *     <h1>Scroll to see animations</h1>
 *
 *     <div v-animate="{ name: 'fade-up', duration: 0.5 }" class="box">
 *       Fade Up
 *     </div>
 *
 *     <div v-animate="{ name: 'scaleIn', duration: 0.7, delay: 100 }" class="box">
 *       Scale In
 *     </div>
 *
 *     <div v-animate.once="{ name: 'right', duration: 0.6, threshold: 0.2 }" class="box">
 *       Right (once)
 *     </div>
 *
 *     <div v-animate="{ name: 'flipLeft', duration: 1, timing: 'ease-in-out' }" class="box">
 *       Flip Left
 *     </div>
 *
 *     <div v-animate="{ name: 'down', duration: 0.4 }" class="box">
 *       Down
 *     </div>
 *
 *     <div v-animate="{ name: 'left-fade', duration: 0.8 }" class="box">
 *       Left Fade
 *     </div>
 *
 *     <div v-animate="{ name: 'scaleOut', duration: 0.9, delay: 200 }" class="box">
 *       Scale Out
 *     </div>
 *
 *     <div v-animate.once="{ name: 'flipUp', duration: 1.2, threshold: 0.3 }" class="box">
 *       Flip Up (once)
 *     </div>
 *
 *     <div v-animate="{ name: 'up', duration: 0.5 }" class="box">
 *       Up
 *     </div>
 *
 *     <div v-animate="{ name: 'flipRight', duration: 1 }" class="box">
 *       Flip Right
 *     </div>
 *   </div>
 * </template>
 *
 *
 * <style>
 * .container {
 *   padding: 2rem;
 *   min-height: 200vh;
 * }
 *
 * h1 {
 *   text-align: center;
 *   margin-bottom: 3rem;
 *   font-size: 2.5rem;
 * }
 *
 * .box {
 *   width: 300px;
 *   height: 150px;
 *   margin: 2rem auto;
 *   background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
 *   color: white;
 *   display: flex;
 *   align-items: center;
 *   justify-content: center;
 *   font-size: 1.5rem;
 *   font-weight: bold;
 *   border-radius: 12px;
 *   box-shadow: 0 10px 20px rgba(0,0,0,0.1);
 * }
 * </style>
 * */
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
