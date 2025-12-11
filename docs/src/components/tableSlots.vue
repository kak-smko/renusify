<template>
  <div v-if="items&&items.length>0" class="mt-5">
    <div class="headline-3">{{$t('table_slots')}}</div>
    <r-table :items="data" borderd>
      <template #row="{ item, th, key, opened, open, show }">
        <td v-for="(value, k) in th" :key="`${key}- ${k}`">
          <div
              :class="{
              'color-info-text font-weight-bold': value.value === 'name',
              'color-secondary-text': value.value === 'description',
            }"
          >
            <r-btn v-if="show(k)" icon text @click.prevent="open(key)">
              <r-icon v-if="opened !== key" v-html="$r.icons.plus"></r-icon>
              <r-icon v-else v-html="$r.icons.minus"></r-icon>
            </r-btn>
            {{ item[value.value] }}
          </div>
        </td>
      </template>
    </r-table>
  </div>
</template>

<script setup>
import {computed, inject} from "vue";

const {$helper} = inject('renusify')
const props = defineProps({
  items: Array
})
const data = computed(() => {
  let r = $helper.clearProxy(props.items)
  r.forEach(item => {
    delete item['example']
  })
  return r

})
</script>
