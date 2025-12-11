<template>
  <div :class="{
        [$r.prefix+'notify']:true,
        'top-pos':top,
        'bottom-pos':!top,
        'left-pos':left,
        'right-pos':!left,
        'flex-column-reverse':!top,
        'flex-column':top,
    }" :style="{ 'min-width': width }">
    <r-btn v-if="list.length>0" class="color-error" rounded
           @click.prevent="handleClose(list[list.length-1].on_close_all)">
      {{ $t('clear', 'renusify') }}
    </r-btn>
    <notification v-for="item in list" :key="item.id"
                  :content="item.content"
                  :permanent="item.permanent"
                  :pos="left?'left':'right'"
                  :status="`color-${item.status}`"
                  :timeout="item.timeout"
                  :width="item.width"
                  @hide="hideChild(item.id,item.on_close)"
                  @click.prevent="handleClick(item.on_click)">
      <!-- Default slot for custom notification content -->
      <!-- provide data prop. The notification item object -->
      <slot :data="item">
        {{ item }}
      </slot>

    </notification>
  </div>
</template>
<script setup>
import {ref, onUnmounted, inject} from 'vue'
import Notification from "./notification.vue";

/**
 * @example // Notify usage
 * <template>
 * <r-notify>
 *   <template v-slot="{data}">
 *     <div>
 *       <div class="title">{{data.content.head}}</div>
 *       <div>{{data.content.body}}</div>
 *     </div>
 *   </template>
 * </r-notify>
 * <r-btn @click="notify(`info`)">show info</r-btn>
 * <r-btn @click="notify(`error`)">show error</r-btn>
 * <r-btn @click="notify(`success`)">show success</r-btn>
 * <r-btn @click="notify(`warning`)">show warning</r-btn>
 * </template>
 * <script>
 * const msg={"head":"title msg","body":"this is a message."}
 * const {$notify} = inject('renusify')
 * const notify=(status)=>{
 *     $notify(msg,{
 *     "timeout":5000,
 *       "status":status,
 *       "permanent":false,
 *       width:"300px",
 *       on_close_all:()=>{
 *         console.log("close all")
 *       },
 *       on_close:()=>{
 *         console.log("close")
 *       },
 *       on_click:()=>{
 *         console.log("click")
 *       }
 *     });
 *   }
 * <//script>
 *
 * */

const props = defineProps({
  /**
   * Makes notifications permanent (no auto-dismiss)
   * @type {Boolean}
   * @default false
   */
  permanent: {
    default: false
  },
  /**
   * Positions notifications at the top of the screen
   * @type {Boolean}
   * @default false
   */
  top: {
    type: Boolean,
    default: false
  },
  /**
   * Positions notifications at the left side of the screen
   * @type {Boolean}
   * @default false
   */
  left: {
    type: Boolean,
    default: false
  },
  /**
   * Default status/color for notifications
   * @type {String}
   * @default 'info'
   */
  status: {
    type: String,
    default: 'info'
  },
  /**
   * Minimum width of the notifications container
   * @type {String}
   * @default '350px'
   */
  width: {
    type: String,
    default: '350px'
  },
  /**
   * Default auto-dismiss timeout in milliseconds
   * @type {Number}
   * @default 4000
   */
  timeout: {
    type: Number,
    default: 4000
  }
})

const {$helper, $notify} = inject('renusify')

const list = ref([])

/**
 * Handles the "Clear All" button click
 * @param {Function|null} close - Custom close function from notification
 */
const handleClose = (close) => {
  if (close !== null) {
    close()
  }
  $notify()
}

/**
 * Handles notification click events
 * @param {Function|null} click - Custom click function from notification
 */
const handleClick = (click) => {
  if (click !== null) {
    click()
  }
}

/**
 * Displays a new notification
 * @param {Object} obj - Notification configuration object
 * @param {*} obj.data - Notification content/data
 * @param {String} [obj.status] - Status/color of the notification
 * @param {Boolean} [obj.permanent] - Whether notification is permanent
 * @param {String} [obj.width] - Width of the notification
 * @param {Number} [obj.timeout] - Auto-dismiss timeout
 * @param {Function} [obj.on_close_all] - Callback when "Clear All" is clicked
 * @param {Function} [obj.on_close] - Callback when notification is closed
 * @param {Function} [obj.on_click] - Callback when notification is clicked
 */
const showMe = (obj) => {
  const item = {
    id: $helper.uniqueId(),
    permanent: obj.permanent || props.permanent,
    content: obj.data,
    status: obj.status || props.status,
    width: obj.width || props.width,
    timeout: obj.timeout || props.timeout,
    on_close_all: obj.on_close_all || null,
    on_close: obj.on_close || null,
    on_click: obj.on_click || null
  }
  list.value.push(item)
}

/**
 * Clears all notifications
 */
const hideMe = () => {
  list.value = []
}

/**
 * Hides a specific notification
 * @param {String} id - ID of the notification to hide
 * @param {Function|null} close - Custom close function from notification
 */
const hideChild = (id, close) => {
  if (close !== null) {
    close()
  }
  const index = list.value.findIndex(item => item.id === id)
  if (index !== -1) {
    list.value.splice(index, 1)
  }
}

const registerBusMethods = () => {
  if (window.renusifyBus) {
    window.renusifyBus.on('r-notify', showMe)
    window.renusifyBus.on('hide-r-notify', hideMe)
  }
}

const unregisterBusMethods = () => {
  if (window.renusifyBus) {
    window.renusifyBus.off('r-notify', showMe)
    window.renusifyBus.off('hide-r-notify', hideMe)
  }
}

registerBusMethods()

onUnmounted(() => {
  unregisterBusMethods()
})

</script>

<style lang="scss">
@use "sass:map";
@use "../../style" as *;


.#{$prefix}notify {
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  width: auto;
  height: auto;
  z-index: map.get($z-index, 'high');
  overflow-y: auto;
  max-height: 100%;

  &.bottom-pos {
    bottom: 0;
  }

  &.top-pos {
    top: 0;
  }

  &.right-pos {
    right: 0;
  }

  &.left-pos {
    left: 0;
  }

  .notify-msg {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px;
    border-radius: map.get($borders, 'md');
    position: relative;
    z-index: map.get($z-index, 'important');
    margin: 0.3rem 0;
  }
}

</style>
