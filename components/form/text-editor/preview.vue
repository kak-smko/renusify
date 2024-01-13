<template>
    <div ref="editorPreview" :class="`${$r.prefix}text-editor text-editor-preview`"
         v-html="$helper.cleanXss(text)"></div>
</template>

<script>
import './style.scss'

export default {
  name: "law",
  props: {
    text: String
  },
  data() {
    return {
      id: null,
      imgs: []
    }
  },
        mounted() {
            this.id=setTimeout(() => {
                this.imgs = this.$refs.editorPreview.querySelectorAll('img')
                const lng=this.imgs.length
                for (let i = 0; i < lng; i++) {
                    this.imgs[i].addEventListener('click', this.open)
                }
            },1000)
        },
        methods: {
            open(e) {
                window.open(e.target.src.split('?')[0],'_blank')
            }
        },
        beforeUnmount(){
            clearTimeout(this.id)
            const lng=this.imgs.length
            for (let i = 0; i < lng; i++) {
                    this.imgs[i].removeEventListener('click', this.open)
                }
        }
    };
</script>
