<template>
    <div class="manage-footer">
        <r-container class="container-fluid">
            <r-row class="v-baseline h-end">
                <r-col class="col-auto">
                    <r-select-input class="per-page" open-to-top disableSearch :items="[
                      {name: '10', value: 10},
                      {name: '20', value: 20},
                      {name: '50', value: 50},
                      {name: '100', value: 100},
                      {name: '200', value: 200},
              ]"
                                    disable-search
                                    @update:modelValue="perPageE"
                                    :modelValue="perPage"></r-select-input>
                </r-col>
                <r-col class="col-auto ms-1">{{totalSetup}}</r-col>
                <r-col class="col-auto">
                    <div class="btn-page">
                        <r-btn :disabled="page===1" @click.prevent="pageBtn('prev')" class="btn-shaped"
                               icon
                               text>
                          <r-icon v-html="$r.icons.chevron_left"></r-icon>

                        </r-btn>
                      <input name="input-page" type="text" :value="page" @input="pageN" class="input-page text-center">
                        <r-btn :disabled="endPage" @click.prevent="pageBtn('next')" class="btn-shaped"
                               icon
                               text>
                          <r-icon v-html="$r.icons.chevron_right"></r-icon>

                        </r-btn>
                    </div>
                </r-col>
            </r-row>
        </r-container>
    </div>
</template>
<script setup>
import {computed, inject} from 'vue'

const props = defineProps({
  page: {type: Number, default: 1},
  total: {},
  perPage: {
    type: Object,
    default: () => ({name: '10', value: 10})
  }
})

const emit = defineEmits(['update:per-page', 'update:page'])

const {$t} = inject('renusify')

const totalSetup = computed(() => {
  let to = props.page * props.perPage.value
  const from = to - props.perPage.value

  if (to > props.total) {
    to = props.total
  }

  return $t(['from_to_manage', [from, to, props.total]], 'renusify')
})

const endPage = computed(() => {
  let to = props.page * props.perPage.value
  if (to > props.total) {
    to = props.total
  }

  return to === props.total
})


const totalPages = computed(() => {
  if (!props.total || !props.perPage.value) return 1
  return Math.ceil(props.total / props.perPage.value)
})

const perPageE = (e) => {
  emit('update:per-page', e)
}

const pageN = (e) => {
  let value = parseInt(e.target.value)

  if (isNaN(value) || value < 1) {
    value = 1
  }

  if (value > totalPages.value) {
    value = totalPages.value
  }

  emit('update:page', value)
}

const pageBtn = (direction) => {
  let newPage = props.page

  if (direction === 'prev') {
    newPage = Math.max(1, props.page - 1)
  } else if (direction === 'next') {
    newPage = Math.min(totalPages.value, props.page + 1)
  } else if (direction === 'first') {
    newPage = 1
  } else if (direction === 'last') {
    newPage = totalPages.value
  }

  emit('update:page', newPage)
}
</script>