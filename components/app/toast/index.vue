<template>
  <toast v-model="show"
         :action="action"
         :actionName="actionName"
         :closable="closable"
         :time="time"
         :type="type">
    {{ msg }}
  </toast>
</template>

<script setup>
import {ref, onMounted, onBeforeUnmount, inject} from 'vue'
import Toast from './toast.vue'

const EVENTS = ['online', 'offline', 'load']

const props = defineProps({
  /**
   * Whether to show online/offline status notifications
   */
  showOnlineStatus: {type: Boolean, default: true}
})

const msg = ref('')
const time = ref(3000)
const closable = ref(true)
const show = ref(false)
const type = ref('info')
const setTimeout_id = ref(null)
const action = ref(undefined)
const actionName = ref(undefined)

const renusify = inject('renusify')
const $helper = renusify.$helper
const $toast = renusify.$toast
const $t = renusify.$t

// Methods
const build = (data) => {
  const option = data.options || {}
  msg.value = data.msg
  action.value = option.action
  actionName.value = option.action_name
  closable.value = $helper.ifHas(option, true, 'closable')
  time.value = $helper.ifHas(option, 3000, 'time')
  type.value = $helper.ifHas(option, 'info', 'type')
  show.value = true
}

const updateOnlineStatus = () => {
  if (!navigator.onLine) {
    $toast($t('no_internet', 'renusify'), {type: 'warning', time: -1})
  } else {
    $toast($t('no_internet', 'renusify'), {type: 'warning', time: 0})
  }
}

const handleToastEvent = (data) => {
  if (show.value) {
    show.value = false
    clearTimeout(setTimeout_id.value)
    setTimeout_id.value = setTimeout(() => {
      build(data)
    }, 300)
  } else {
    build(data)
  }
}

onMounted(() => {
  window.renusifyBus.on('toast', handleToastEvent)

  if (props.showOnlineStatus) {
    EVENTS.forEach(event => window.addEventListener(event, updateOnlineStatus))
  }
})

onBeforeUnmount(() => {
  EVENTS.forEach(event => window.removeEventListener(event, updateOnlineStatus))
})
</script>