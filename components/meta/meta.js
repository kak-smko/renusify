/**
 * @example // Basic usage
 * <template>
 * <r-meta
 *   title="pageTitle"
 *   description="pageDescription"
 *   keywords="test,test2"
 * />
 * </template>
 *
 * @example // Advanced usage with HTML and HEAD attributes
 * <template>
 * <r-meta
 *   :html="{ body: { id: 'page-id', class: 'home-page' } }"
 *   :head="{ 'meta[charset]': { charset: 'utf-8' } }"
 *   title="Dynamic Page Title"
 *   description="Dynamic page description for SEO"
 *   image="https://example.com/og-image.jpg"
 *   url="https://example.com/current-page"
 *   lang="en-US"
 * />
 *</template>
 */
//https://github.com/troxler/headful/blob/master/src/headful.js
export default {
    name: "r-meta",
    created(){
        this.build()
    },
    watch: {
        '$attrs': {
            handler() {
                this.build()
            },
            deep: true
        },
    },
    activated() {
        this.build()
    },
    deactivated() {
        this.removeAll()
    },
    methods: {
        build() {
            for (let i in this.$attrs) {
                if (this.$helper.hasKey(this.$attrs, i)) {
                    this[i](this.$attrs[i]);
                }
            }
        },
        html(obj) {
            /*
            :html="{
                body: {id: 'aPageId'},
                h1: {'data-foo': 'bar'},
                }"
            */
            Object.keys(obj).forEach(selector =>
                this.setRootElementAttributes(selector, obj[selector])
            );
        },
        head(obj) {
            /*
            :head="{
                'meta[charset]': {charset: 'utf-8'},
                }"
             */
            Object.keys(obj).forEach(selector =>
                this.setHeadElementAttributes(selector, obj[selector])
            );
        },
        title(val) {
            document.title = this.isRemoveValue(val) ? "" : val;
            this.setMetaContent('itemprop="name"', val);
            this.setMetaContent('property="og:title"', val);
            this.setMetaContent('name="twitter:title"', val);
        },
        description(val) {
            this.setMetaContent('name="description"', val);
            this.setMetaContent('itemprop="description"', val);
            this.setMetaContent('property="og:description"', val);
            this.setMetaContent('name="twitter:description"', val);
        },
        keywords(val) {
            this.setMetaContent('name="keywords"',val);
        },
        image(val) {
            this.setMetaContent('itemprop="image"', val);
            this.setMetaContent('property="og:image"', val);
            this.setMetaContent('name="twitter:image"', val);
        },
        lang(val) {
            this.setRootElementAttributes("html", {lang: val});
            this.ogLocaleTag && this.setOgLocaleIfValid(val);
        },
        ogLocale(val) {
            this.setMetaContent('property="og:locale"', val);
        },
        url(val) {
            this.setHeadElementAttributes('link[rel="canonical"]', {href: val});
            this.setMetaContent('property="og:url"', val);
            this.setMetaContent('name="twitter:url"', val);
        },
        createChild(parent, selector) {
            if (!this.getElement(parent, selector)) {
                let property = selector;
                property = property.split("[");
                const name = property[0];
                property = property[1].replaceAll("]", "");
                property = property.replaceAll('"', "");
                property = property.replaceAll("'", "");
                property = property.trim(" ");
                property = property.split("=");
                let meta = document.createElement(name);
                meta.setAttribute("c", "renusify");
                meta.setAttribute(property[0], property[1]);
                parent.appendChild(meta);
            }
        },
        setMetaContent(attr, val) {
            this.createChild(document.head, `meta[${attr}]`);
            this.setHeadElementAttributes(`meta[${attr}]`, {content: val});
        },
        setRootElementAttributes(selector, attributes) {
            this.createChild(document, selector);
            this.setElementAttributes(
                this.getElement(document, selector),
                attributes
            );
        },
        setHeadElementAttributes(selector, attributes) {
            this.createChild(document.head, selector);
            this.setElementAttributes(
                this.getElement(document.head, selector),
                attributes
            );
        },
        setElementAttributes(element, attributes) {
            if (element) {
                Object.keys(attributes).forEach(attrName => {
                    if (this.isRemoveValue(attributes[attrName])) {
                        element.removeAttribute(attrName);
                    } else {
                        element.setAttribute(attrName, attributes[attrName]);
                    }
                });
            }
        },
        getElement(parent, selector) {
            return parent.querySelector(selector);
        },
        setOgLocaleIfValid(locale) {
            if (this.isRemoveValue(locale)) {
                this.ogLocale(locale);
            } else if (locale.match(/^[a-z]{2}-[a-z]{2}$/i)) {
                const [language, region] = locale.split("-");
                const ogLocale = `${language}_${region.toUpperCase()}`;
                this.ogLocale(ogLocale);
            }
        },
        isRemoveValue(val) {
            return val === undefined || val === null;
        },
        removeAll() {
            let children = document.querySelectorAll("[c='renusify']");
            if (children) {
                let childArray = Array.prototype.slice.call(children);

                childArray.forEach(function (child) {
                    child.parentNode.removeChild(child);
                });
            }
        }
    },
    render() {
    }
};
