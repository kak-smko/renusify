<template>
  <div v-if="items&&items.length>0" class="mt-5">
    <div class="headline-3">{{$t('table_props')}}</div>
  <r-table :items="items" borderd>
    <template #row="{ item, th, key, opened, open, show }">
      <td v-for="(value, k) in th" :key="`${key}- ${k}`">
        <div
            :class="{
            'color-info-text font-weight-bold': value.value === 'prop',
            'color-success-text': value.value === 'type',
            'color-one-text ltr': value.value === 'default',
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

<script>
export default {
  name: "tableProps",
  props: {items: Array},
  data() {
    return {};
  },
};
</script>
