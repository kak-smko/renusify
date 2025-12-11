import {computed, ref} from 'vue'

export function useRootable(props, attrs) {
    const isActive = ref(false)

    const classes = computed(() => {
        const classes = {}
        if (props.to) return classes
        if (props.activeClass) classes[props.activeClass] = isActive.value
        return classes
    })

    const isClickable = computed(() => {
        if (props.disabled) return false
        return Boolean(isLink.value || 'tabindex' in attrs)
    })

    const isLink = computed(() => {
        return props.to || props.href || props.link
    })

    const route = computed(() => {
        return generateRouteLink()
    })

    const generateRouteLink = () => {
        let tag
        const data = {
            attrs: {
                tabindex: 'tabindex' in attrs ? attrs.tabindex : undefined
            },
            props: {},
            class: classes.value,
            ref: 'link'
        }

        if (isClickable.value) {
            if (props.to) {
                const activeClass = props.activeClass
                const exactActiveClass = props.exactActiveClass || activeClass

                tag = 'router-link'
                Object.assign(data.props, {
                    to: props.to,
                    activeClass,
                    exactActiveClass
                })
            } else {
                tag = (props.href && 'a') || props.tag || 'span'
                if (tag === 'a' && props.href) data.attrs.href = props.href
            }
            if (props.target) data.attrs.target = props.target
        } else {
            tag = props.tag || 'span'
        }

        return {
            tag,
            data
        }
    }

    return {
        isActive,
        classes,
        isClickable,
        isLink,
        route,
        generateRouteLink
    }
}