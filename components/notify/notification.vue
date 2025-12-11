<template>
    <transition
            :name="`slide-fade-${pos}`"
    >
        <div v-if="show" :class="[status, 'notify-msg']" :style="{ width: width }">
            <slot>
              <div>
                <h3 class="title-1"><b>{{ content.title }}</b></h3>
                <p class="title-2 ma-0">{{ content.text }}</p>
              </div>
            </slot>
          <r-btn class="h-end" icon text @click.prevent.stop="hideMe">
            <r-icon v-html="$r.icons.close"></r-icon>
          </r-btn>
        </div>
    </transition>
</template>
<script setup>
import {ref, onMounted, nextTick} from 'vue'

const props = defineProps({
  pos: {
    default: 'right'
  },
  permanent: {
    default: false
  },
  content: {},
  status: {
    type: String,
    default: 'alert-success'
  },
  width: {
    type: String,
    default: '350px'
  },
  timeout: {
    type: Number,
    default: 4000
  }
})

const emit = defineEmits(['hide'])

const show = ref(false)

const hideMe = () => {
  emit('hide', true)
}

onMounted(() => {
  nextTick(() => {
    show.value = true
  })

  if (!props.permanent) {
    setTimeout(() => {
      hideMe()
    }, props.timeout)
  }
})
</script>
