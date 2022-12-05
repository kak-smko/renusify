export const roots = {
    props: {
        activeClass: String,
        disabled: Boolean,
        exactActiveClass: String,
        link: Boolean,
        href: [String, Object],
        to: [String, Object],
        tag: String,
        target: String
    },
    data: () => ({
        isActive: false
    }),
    computed: {
        classes() {
            const classes = {};
            if (this.to) return classes;
            if (this.activeClass) classes[this.activeClass] = this.isActive;
            return classes;
        },

        isClickable() {
            if (this.disabled) return false;
            return Boolean(this.isLink || this.$attrs.tabindex);
        },

        isLink() {
            return this.to || this.href || this.link;
        },

        route() {
            return this.generateRouteLink()
        }
    },
    methods: {
        generateRouteLink() {
            let tag;
            const data = {
                attrs: {
                    tabindex: 'tabindex' in this.$attrs ? this.$attrs.tabindex : undefined
                },
                props: {},
                class: this.classes,
                ref: 'link'
            };
            if (this.isClickable) {
                if (this.to) {
                    const activeClass = this.activeClass;
                    const exactActiveClass = this.exactActiveClass || activeClass;

                    tag = 'router-link';
                    Object.assign(data.props, {
                        to: this.to,
                        activeClass,
                        exactActiveClass
                    });
                } else {
                    tag = (this.href && 'a') || this.tag || 'span';
                    if (tag === 'a' && this.href) data.attrs.href = this.href;
                }
                if (this.target) data.attrs.target = this.target;
            } else {
                tag = this.tag || 'span'
            }


            return {
                tag,
                data
            };
        },

    }
};
