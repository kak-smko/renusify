<template>
  <r-btn v-bind="$attrs" @click.prevent.stop="show=true">
    <slot></slot>
  </r-btn>
  <r-confirm
      :hard="hard"
      :title="title"
      :text="body"
      :cancelText="cancelText"
      :confirmText="confirmText"
      v-model="show"
      v-on:accept="accept"
      v-on:cancel="show = false"
  />
</template>

<script>
export default {
  name: "buttonConfirm",
  props: {
    hard: Boolean,
    title: String,
    body: String,
    cancelText: String,
    confirmText: String,
  },
  emits: ['click'],
  data() {
    return {
      show: false
    }
  },
  methods: {
    accept() {
      this.$emit('click', true)
      this.show = false
    }
  }
}
</script>

<style lang="scss">

</style>