<template>
  <div class="color-type">
    <span class="name">
      {{ name }}
    </span>
    <input v-model="modelColor" class="value" />
  </div>
</template>

<script >
import { computed } from 'vue'

export default
        {
  props: {
    name: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  emits: ['inputColor'],
  setup(props, { emit }) {
    const modelColor = computed({
      get() {
        return props.color || ''
      },
      set(val) {
        emit('inputColor', val)
      },
    })
    return {
      modelColor,
    }
  },
}
</script>

<style lang="scss">
  @import "../../../style/include";
.color-type {
  display: flex;
  margin-top: 8px;
  font-size: 12px;
  .name {
    width: 60px;
    height: 30px;
    float: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .value {
    flex: 1;
    height: 30px;
    min-width: 100px;
    padding: 0 12px;
    border: 0;
    box-sizing: border-box;
  }
  @include light(){
    .name {
    color: #999;
    background: #e7e8e9;
  }
  .value {
    color: #666;
    background: #eceef0;
  }
  }
  @include dark(){
    .name {
    color: #999;
    background: #252930;
  }
  .value {
    color: #fff;
    background: #2e333a;
  }
  }
}
</style>
