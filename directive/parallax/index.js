//https://github.com/gerasimvol/vue-prlx
/**
 * @example // v-parallax usage
 * <template>
 *   <div class="parallax-container">
 *
 *     <div class="scroll-content">
 *       <div class="placeholder" style="height: 100vh"></div>
 *
 *       <div
 *         v-parallax="{ speed: 0.3 }"
 *         class="parallax-box box1"
 *       >
 *         <h2>Default Parallax</h2>
 *         <p>Speed: 0.3, Direction: Y</p>
 *       </div>
 *
 *
 *     </div>
 *
 *   </div>
 * </template>
 *
 * <script>
 *
 * </script>
 *
 * <style>
 *
 * .scroll-content {
 *   position: relative;
 *   background: #f0f2f5;
 * }
 *
 * .placeholder {
 *   background: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);
 *   background-size: 200% 100%;
 *   animation: loading 2s infinite;
 *   border-radius: 4px;
 *   margin: 10px 0;
 * }
 *
 * @keyframes loading {
 *   0% { background-position: 200% 0; }
 *   100% { background-position: -200% 0; }
 * }
 *
 * .parallax-box {
 *   width: 80%;
 *   max-width: 600px;
 *   height: 300px;
 *   margin: 0 auto 40px;
 *   border-radius: 12px;
 *   display: flex;
 *   flex-direction: column;
 *   justify-content: center;
 *   align-items: center;
 *   text-align: center;
 *   padding: 30px;
 *   color: white;
 *   box-shadow: 0 10px 30px rgba(0,0,0,0.15);
 *   overflow: hidden;
 * }
 *
 * .parallax-box h2 {
 *   font-size: 2rem;
 *   margin-bottom: 10px;
 * }
 *
 * .parallax-box p {
 *   font-size: 1rem;
 *   opacity: 0.9;
 * }
 *
 * .box1 {
 *   background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
 * }
 * </style>
 * */
function mounted (el, { modifiers = {}, value = {} }) {
  // SETUP SETTING
  const settings = {
    // {boolean} – enable parallax on mobile
    isParallaxOnMobile: modifiers.mobile || false,

    // {boolean} – animate background-position instead of translate
    background: modifiers.background || false,

    // {boolean} – start parallax from very bottom of the page instead of middle
    startParallaxFromBottom: value.fromBottom || false,

    // {boolean} – just add '--parallax-value' css variable to element for your custom animations
    // so add css for example: transform: scale(calc(var(--parallax-value) / 50 ))
    justAddParallaxValue: value.custom || false,

    // {boolean} – reverse direction
    reverse: value.reverse || false,

    // {number} – parallax power
    speed: value.speed || 0.15,

    // {boolean} – can parallax to negative values
    preserveInitialPosition: value.preserveInitialPosition === false
      ? value.preserveInitialPosition
      : true,

    // {string} – 'x' - horizontal parallax, 'y' - vertical
    direction: value.direction || 'y',

    // {object} – limit.min, limit.max offset
    limit: value.limit || null,

    // {number} – mobile max width
    mobileMaxWidth: value.mobileMaxWidth || 768,

    // {boolean} – is parallax disabled
    isDisabled: value.disabled || false
  }

  // DEFAULT SETTINGS FOR BACKGROUND-POSITION
  if (settings.background) {
    settings.speed = value.speed || 0.02
    settings.limit = {
      min: 0,
      max: 100
    }
  }

  // REVERSE DIRECTION
  if (settings.reverse) {
    settings.speed = -settings.speed
  }

  if (!settings.isDisabled) {
    const isMobile = window.innerWidth < settings.mobileMaxWidth
    const shouldParallax = isMobile
      ? settings.isParallaxOnMobile
      : true
    if (shouldParallax) {
      window.addEventListener('scroll',init.bind(null, el, settings),{passive:true})
    }
  }
}

function init (el, settings) {
  // START PARALLAX FROM MIDDLE OR BOTTOM OF THE SCREEN
  const startingPoint = settings.startParallaxFromBottom
    ? window.innerHeight
    : (window.innerHeight / 2)

  const pageYOffset = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop)
  let scrollPosition = pageYOffset - offsetTopFromWindow(el) + startingPoint

  // DON'T PARALLAX TO NEGATIVE VALUES (START PARALLAX FROM INITIAL DOM POSITION)
  if (settings.preserveInitialPosition) {
    if (scrollPosition < 0) scrollPosition = 0
  }

  // PARALLAX ONLY IN VIEWPORT
  if (isInViewport(el)) {
    animate(el, scrollPosition, settings)
  }
  }

function animate (el, scrollPosition, settings) {
  let offset = scrollPosition * settings.speed

  // NORMALIZE OFFSET
  if (settings.limit) {
    if (offset > settings.limit.max) offset = settings.limit.max
    if (offset < settings.limit.min) offset = settings.limit.min
  }

  // RUN PARALLAX
  let parallaxType

  if (settings.background) {
    parallaxType = parallaxBackgroundPosition
  } else if (settings.justAddParallaxValue) {
    parallaxType = addParallaxValueAsCssVariable
  } else {
    parallaxType = parallaxTransform
  }

  parallaxType(el, offset, settings.direction)
}

function parallaxBackgroundPosition (el, offset, direction) {
  el.style.transition = `background-position 0.1s ease-out`

  if (direction === 'y') {
    el.style.backgroundPosition = `50% ${offset}%`
  } else {
    el.style.backgroundPosition = `${offset}% 50%`
  }
}

function parallaxTransform (el, offset, direction) {
  el.style.transition = `transform 0.1s ease-out`
  el.style.transform = `translate${direction.toUpperCase()}(${Math.round(offset)}px)`
}

function addParallaxValueAsCssVariable (el, offset) {
  el.style.setProperty('--parallax-value', offset)
  el.style.setProperty('--parallax-value-px', offset+'px')
}

const isInViewport = (el, { top: t, height: h } = el.getBoundingClientRect()) => t <= innerHeight && t + h > 0

const offsetTopFromWindow = element => {
  let top = 0
  do {
    top += element.offsetTop || 0
    element = element.offsetParent
  } while (element)

  return top
}

function unmounted (el) {
  window.removeEventListener('scroll',init)
}

export default {
  mounted: mounted,

  updated: mounted,

  unmounted: unmounted
}