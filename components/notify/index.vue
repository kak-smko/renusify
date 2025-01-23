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
                  @click.prevent="handle(item.on_click)">

      <slot :data="item">
        {{ item }}
      </slot>

    </notification>
  </div>
</template>
<script>
import {defineAsyncComponent} from 'vue'

export default {
  components: {
    notification: defineAsyncComponent(() => import('./notification.vue'))
  },
  props: {
    permanent: {
      default: false
    },
    top: {
      type: Boolean,
      default: false
    },
    left: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      default: 'info'
    },
    width: {
      type: String,
      default: '350px'
    },
    timeout: {
      type: Number,
      default: 4000
    }
  },
  data() {
    return {
      list: []
    }
  },
  methods: {
    handleClose(close) {
      if (close !== null) {
        close()
      }
      this.$notify()
    },
    handle(click) {
      if (click !== null) {
        click()
      }
    },
    showMe(obj) {
      const item = {
        id: this.$helper.uniqueId(),
        permanent: obj.permanent || this.permanent,
        content: obj.data,
        status: obj.status || this.status,
        width: obj.width || this.width,
        timeout: obj.timeout || this.timeout,
        on_close_all: obj.on_close_all || null,
        on_close: obj.on_close || null,
        on_click: obj.on_click || null

      }
      this.list.push(item)
    },
    hideMe() {
      this.list = []
    },
    hideChild(id, close) {
      if (close !== null) {
        close()
      }
      for (const i in this.list) {
        if (this.$helper.hasKey(this.list, i)) {
          if (this.list[i].id === id) {
            this.list.splice(i, 1)
          }
        }
      }
    },
    registerBusMethods() {
      window.renusifyBus.on('r-notify', this.showMe)
      window.renusifyBus.on('hide-r-notify', this.hideMe)
    }
  },
  created() {
    this.registerBusMethods()
  }
}
</script>
<style lang="scss">
@use "sass:map";
@use "../../style/variables/base";


.#{base.$prefix}notify {
  display: flex;
  align-items: center;
  padding: 10px;
  position: fixed;
  width: auto;
  height: auto;
  z-index: map.get(base.$z-index, 'medium');
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

}

</style>
