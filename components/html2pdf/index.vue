<template>
    <div :class="`${this.$r.prefix}html2pdf`" v-if="show">
        <section
                class="html2pdf-content"
                :style="`width: ${pdfContentWidth};`"
                ref="html2pdfContent"
        >
            <slot/>
        </section>
        <transition name="fade">
            <section class="preview" v-if="pdfFile">
                <r-btn icon tile @click.prevent="closePreview()" class="color-error">
                    <r-icon v-html="$r.icons.close"></r-icon>
                </r-btn>

                <iframe :src="pdfFile" width="100%" height="100%"/>
            </section>
        </transition>
    </div>
</template>
<script>
    export default {
        props: {
            enableDownload: {
                type: Boolean,
                default: true
            },
            enableLinks: {
                type: Boolean,
                default: true
            },
            previewModal: {
                type: Boolean,
                default: false
            },
            filename: {
                type: String,
                default: `${new Date().getTime()}`
            },
            pdfQuality: {
                type: Number,
                default: 2
            },
            pdfFormat: {
                default: "a4"
            },
            pdfOrientation: {
                type: String,
                default: "portrait"
            },
            pdfContentWidth: {
                default: "800px"
            },
            htmlToPdfOptions: {
                type: Object
            },
            pageBreakAuto: Number,
            toInlineCss: Boolean,
            avoidClass: String,
            beforeClass: String,
            afterClass: String
        },
      emits:['progress','has-downloaded','before-download'],
        data() {
            return {
                show: true,
                loaded: false,
                progress: 0,
                pdfFile: null
            };
        },

        mounted() {
            this.add();
            /*
            * var winPrint = window.open('', '', 'left=0,top=0,width=800,height=600,toolbar=0,scrollbars=0,status=0');
winPrint.document.write('<title>Print  Report</title><br /><br /> Hellow World');
winPrint.document.close();
winPrint.focus();
winPrint.print();
winPrint.close();
* */
        },
        watch: {
            progress(val) {
                this.$emit("progress", val);
            }
        },
        methods: {
            add() {
                if (document.querySelector(`[c="${this.$r.prefix}html2pdf"]`)) {
                    setTimeout(() => {
                        try {
                            //eslint-disable-next-line
                            if (html2pdf) {
                                this.loaded = true;
                                this.progress = 10;
                            } else {
                                this.add();
                            }
                        } catch (e) {
                            this.add();
                        }
                    }, 500);
                    return;
                }
                let meta = document.createElement("script");
                meta.setAttribute("c", `${this.$r.prefix}html2pdf`);
                meta.setAttribute(
                    "src",
                    "https://raw.githack.com/eKoopmans/html2pdf/master/dist/html2pdf.bundle.js"
                );
                meta.setAttribute("crossorigin", "anonymous");
                meta.onload = () => {
                    this.loaded = true;
                    this.progress = 10;
                };
                document.head.appendChild(meta);
            },
            computedStyleToInlineStyle(element, options = [], first = true) {
                if (!element) {
                    return;
                }
                if (element.className === "html2pdf__page-break") {
                    return;
                }
                element.children.forEach(child => {
                    this.computedStyleToInlineStyle(child, options, false);
                });
                const computedStyle = window.getComputedStyle(element);
                (options.properties || computedStyle).forEach(property => {
                    element.style[property] =
                        property === "letter-spacing"
                            ? 0
                            : computedStyle.getPropertyValue(property);
                });
                if (first) {
                    element.style.height = "auto";
                }
                element.classList = [];
            },
            paginate() {
                const parentElement = this.$refs.html2pdfContent
                const ArrOfContentChildren = Array.from(parentElement.children)
                let childrenHeight = 0
                for (let childElement of ArrOfContentChildren) {
                    const elementFirstClass = childElement.classList[0]
                    const isPageBreakClass = elementFirstClass === 'html2pdf__page-break'
                    if (isPageBreakClass) {
                        childrenHeight = 0
                    } else {
                        const elementHeight = childElement.clientHeight
                        const elementComputedStyle = childElement.currentStyle || window.getComputedStyle(childElement)
                        const elementMarginTopBottom = parseInt(elementComputedStyle.marginTop) + parseInt(elementComputedStyle.marginBottom)
                        const elementHeightWithMargin = elementHeight + elementMarginTopBottom
                        if ((childrenHeight + elementHeight) < this.pageBreakAuto) {
                            childrenHeight += elementHeightWithMargin
                        } else {
                            const section = document.createElement('div')
                            section.classList.add('html2pdf__page-break')
                            parentElement.insertBefore(section, childElement)
                            childrenHeight = elementHeightWithMargin
                        }
                    }
                }
            },
            buildPdf() {
                if (!this.loaded) {
                    console.error("html2pdf.js not loaded");
                    return;
                }
                this.progress = 25;
                if (this.toInlineCss) {
                    this.computedStyleToInlineStyle(this.$refs.html2pdfContent);
                }
                if (this.pageBreakAuto) {
                    this.paginate()
                }
                this.progress = 70;
                this.downloadPdf();
            },
            async downloadPdf() {
                if (!this.loaded) {
                    console.error("html2pdf.js not loaded");
                    return;
                }
                const html2pdfContent = this.$refs.html2pdfContent;

                let options = this.getOptions();
                //eslint-disable-next-line
                this.$emit("before-download", {html2pdf, options, html2pdfContent});
                //eslint-disable-next-line
                const html2PdfSetup = html2pdf()
                    .set(options)
                    .from(html2pdfContent);
                let pdfBlobUrl = null;
                if (this.previewModal) {
                    this.pdfFile = await html2PdfSetup.output("bloburl");
                    pdfBlobUrl = this.pdfFile;
                }
                if (this.enableDownload) {
                    pdfBlobUrl = await html2PdfSetup.save().output("bloburl");
                }
                if (pdfBlobUrl) {
                    const res = await fetch(pdfBlobUrl);
                    const blobFile = await res.blob();
                    this.$emit("has-downloaded", blobFile);
                }
                this.progress = 100;
            },
            getOptions() {
                if (this.htmlToPdfOptions) {
                    return this.htmlToPdfOptions;
                }
                let pagebreak = {}
                if (this.beforeClass && !this.pageBreakAuto) {
                    pagebreak.mode = 'css'
                    pagebreak.before = this.beforeClass
                }
                if (this.afterClass && !this.pageBreakAuto) {
                    pagebreak.mode = 'css'
                    pagebreak.after = this.afterClass
                }
                if (this.avoidClass && !this.pageBreakAuto) {
                    pagebreak.mode = 'css'
                    pagebreak.avoid = this.avoidClass
                }
                let d = {
                    margin: 0,
                    filename: `${this.filename}.pdf`,
                    image: {
                        type: "jpeg",
                        quality: 1
                    },
                    enableLinks: this.enableLinks,
                    html2canvas: {
                        scale: this.pdfQuality
                    },
                    jsPDF: {
                        unit: "mm",
                        format: this.pdfFormat,
                        orientation: this.pdfOrientation,
                        compression: true
                    }
                };
                if (pagebreak.mode) {
                    console.log(pagebreak)
                    d.pagebrak = pagebreak
                }
                return d
            },
            closePreview() {
                this.pdfFile = null;
            }
        }
    };
</script>

<style lang="scss">
    @import "../../style/include";

    .#{$prefix}html2pdf {
        .preview {
          position: fixed;
          width: 65%;
          min-width: 600px;
          height: 80vh;
          top: 100px;
          z-index: 9999999;
          left: 50%;
          transform: translateX(-50%);
          border-radius: map-get($borders, 'sm');
          box-shadow: 0px 0px 10px #00000048;

          iframe {
            border: 0;
          }
        }
    }
</style>
