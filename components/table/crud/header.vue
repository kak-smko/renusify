<template>
  <div>
    <r-container class="container-fluid pa-0 mb-3">
      <r-row class="h-start h-space-between v-center" no-gutter>
        <r-col class="col-auto">
          <r-btn v-if="!disableAdd"
                 class="color-success-text"
                 outlined
                 rounded
                 @click.prevent="newItem">{{ $t('new', 'renusify') }}
          </r-btn>
        </r-col>
        <r-col class="col-auto d-flex v-center">
          <template v-if="mcud">
            <r-btn class="color-error mx-1" icon @click.prevent="showConfirm=true">
              <r-icon v-html="$r.icons.delete"></r-icon>
            </r-btn>
            <r-btn class="color-success mx-1" icon @click.prevent="$emit('copy',true)">
              <r-icon v-html="$r.icons.copy"></r-icon>
            </r-btn>
            <r-btn class="color-info mx-1" icon @click.prevent="$emit('edit',true)">
              <r-icon v-html="$r.icons.edit"></r-icon>
            </r-btn>
          </template>
          <r-btn v-if="advanceSearch"
                 :class="{'color-info':!show,'color-error':show}"
                 rounded
                 @click.prevent="open">
            {{ translate(show ? 'close' : 'advance_search', show ? 'Close' : 'Advanced search') }}
            <span v-if="activeFilterCount" class="filter-count ms-1">{{ activeFilterCount }}</span>
          </r-btn>
        </r-col>
        <r-col v-if="!show" class="col-12">
          <r-text-input :label="translate('search', 'Search')"
                        :model-value="modelValue"
                        @update:modelValue="updateBasicSearch"></r-text-input>
        </r-col>
        <r-col v-else class="col-12">
          <section class="advanced-search pa-3">
            <div class="d-flex h-space-between v-center flex-wrap mb-2">
              <div>
                <div class="title-3">{{ translate('advance_search', 'Advanced search') }}</div>
                <div class="body-2 color-on-sheet-low">{{ translate('advance_search_hint', 'Add conditions, then choose whether all or any must match.') }}</div>
              </div>
              <r-select-input v-if="filters.length > 1"
                              :model-value="matchMode"
                              :items="matchModes"
                              :label="translate('match', 'Match')"
                              auto="float"
                              class="match-mode"
                              disableSearch
                              justValue
                              @update:modelValue="matchMode = $event"></r-select-input>
            </div>

            <div v-if="filters.length" class="filter-list">
              <div v-for="(filter, index) in filters" :key="filter.id" class="filter-row">
                <div class="filter-index body-2">{{ index + 1 }}</div>
                <r-select-input :model-value="filter.key"
                                :items="fieldItems"
                                :label="translate('name', 'Field')"
                                auto="float"
                                class="filter-field"
                                @update:modelValue="changeField(filter, $event)"
                                justValue></r-select-input>
                <r-select-input v-if="filter.key && !['r-range-input', 'r-date-range-input'].includes(typeFor(filter.key))"
                                :model-value="filter.action"
                                :items="operatorsFor(filter.key)"
                                :label="translate('advance_search_operator', 'Operator')"
                                auto="float"
                                class="filter-operator"
                                disableSearch
                                justValue
                                @update:modelValue="changeOperator(filter, $event)"></r-select-input>
                <div v-if="filter.key && isDictionaryField(filter.key) && ['$eq', '$ne', '$contains'].includes(filter.action)"
                     class="filter-dictionary filter-value">
                  <r-text-input :model-value="filter.entryKey"
                                :label="translate('key', 'Key')"
                                class="filter-dictionary-key"
                                @update:modelValue="filter.entryKey = $event"></r-text-input>
                  <r-text-input :model-value="filter.entryValue"
                                :label="translate('value', 'Value')"
                                class="filter-dictionary-value"
                                @update:modelValue="filter.entryValue = $event"></r-text-input>
                </div>
                <div v-else-if="filter.key && ['r-range-input', 'r-date-range-input'].includes(typeFor(filter.key))"
                     :key="`${filter.id}-${filter.key}`"
                     class="filter-range filter-value">
                  <template v-if="typeFor(filter.key) === 'r-date-range-input'">
                    <r-date-input :model-value="filter.rangeMin"
                                  :label="translate('advance_search_from', 'From')"
                                  class="filter-range-input"
                                  @update:modelValue="filter.rangeMin = $event"></r-date-input>
                    <r-date-input :model-value="filter.rangeMax"
                                  :label="translate('advance_search_to', 'To')"
                                  class="filter-range-input"
                                  @update:modelValue="filter.rangeMax = $event"></r-date-input>
                  </template>
                  <template v-else>
                    <r-number-input :model-value="filter.rangeMin"
                                    :label="translate('advance_search_minimum', 'Minimum')"
                                    class="filter-range-input"
                                    @update:modelValue="filter.rangeMin = $event"></r-number-input>
                    <r-number-input :model-value="filter.rangeMax"
                                    :label="translate('advance_search_maximum', 'Maximum')"
                                    class="filter-range-input"
                                    @update:modelValue="filter.rangeMax = $event"></r-number-input>
                  </template>
                </div>
                <component v-else-if="filter.key"
                           :is="inputType(filter)"
                           :key="`${filter.id}-${filter.key}-${filter.action}`"
                           :label="translate('value', 'Value')"
                           :model-value="filter.value"
                           v-bind="inputProps(filter)"
                           class="filter-value"
                           @update:modelValue="filter.value = $event"></component>
                <r-btn class="filter-remove color-error-text"
                       icon
                       text
                       :aria-label="translate('remove', 'Remove filter')"
                       @click.prevent="removeFilter(index)">
                  <r-icon v-html="$r.icons.close"></r-icon>
                </r-btn>
              </div>
            </div>
            <div v-else class="filter-empty body-2 py-3">
              {{ translate('advance_search_empty', 'No conditions yet. Add a filter to get started.') }}
            </div>

            <div class="d-flex h-space-between v-center flex-wrap mt-3">
              <div class="d-flex v-center">
                <r-btn class="color-info-text me-2"
                       outlined
                       rounded
                       size="sm"
                       :disabled="fieldItems.length === 0"
                       @click.prevent="addFilter">
                  <r-icon class="me-1" v-html="$r.icons.plus"></r-icon>
                  {{ translate('add_filter', 'Add filter') }}
                </r-btn>
                <r-btn v-if="filters.length || activeFilterCount"
                       class="color-error-text"
                       text
                       size="sm"
                       @click.prevent="clearFilters">
                  {{ translate('clear', 'Clear') }}
                </r-btn>
              </div>
              <r-btn class="color-info"
                     rounded
                     :loading="loading"
                     :disabled="!hasValidFilters"
                     @click.prevent="send">
                {{ translate('search', 'Apply filters') }}
                <span v-if="validFilterCount" class="ms-1">({{ validFilterCount }})</span>
              </r-btn>
            </div>
          </section>
        </r-col>
      </r-row>
    </r-container>
    <r-progress-line v-if="loading" color="color-one"></r-progress-line>
    <r-confirm
        v-model="showConfirm"
        hard
        v-on:accept="accept"
        v-on:cancel="showConfirm = false"
    />
  </div>
</template>

<script setup>
import {computed, inject, ref} from 'vue'

const props = defineProps({
  headerTable: {type: Array, default: () => []},
  loading: Boolean,
  disableAdd: Boolean,
  advanceSearch: Boolean,
  mcud: Boolean,
  newItem: Function,
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'copy', 'edit', 'delete', 'a-search'])
const {$t} = inject('renusify')
const translate = (key, fallback) => {
  const translated = $t(key, 'renusify')
  return translated === key ? fallback : translated
}

const show = ref(false)
const showConfirm = ref(false)
const filters = ref([])
const matchMode = ref('$and')
const activeFilterCount = computed(() => filters.value.filter(isFilterReady).length)
let nextFilterId = 1

const fieldItems = computed(() => props.headerTable
  .filter(header => !['action', 'mcud'].includes(header.option?.type) && header.option?.searchable !== false)
  .map(header => ({name: $t(header.text), value: header.value})))

const matchModes = computed(() => [
  {name: translate('advance_search_all', 'Match all'), value: '$and'},
  {name: translate('advance_search_any', 'Match any'), value: '$or'}
])

const validFilterCount = computed(() => filters.value.filter(isFilterReady).length)
const hasValidFilters = computed(() => validFilterCount.value > 0)

const optionFor = (key) => {
  const header = props.headerTable.find(item => item.value === key)
  if (header) return header.option || {}

  const [embeddedName, embeddedKey, ...rest] = key.split('.')
  if (rest.length > 0) return {}
  const embeddedField = props.headerTable.find(item => item.value === embeddedName)
  if (embeddedField?.option?.type !== 'r-json-input') return {}
  const template = embeddedField.option.props?.template
  if (!template || !Object.prototype.hasOwnProperty.call(template, embeddedKey)) return {}

  const value = template[embeddedKey]
  if (value && typeof value === 'object' && value.type) return value
  if (typeof value === 'boolean') return {type: 'r-switch-input'}
  if (typeof value === 'number') return {type: 'r-number-input'}
  return {type: 'r-text-input'}
}

const isDictionaryField = (key) => optionFor(key).type === 'r-json-input'

const typeFor = (key) => {
  const type = optionFor(key).type
  if (type === 'r-time-ago') return 'r-date-input'
  if (type === 'r-date-input' && optionFor(key).props?.rangeMode) return 'r-date-range-input'
  if (['r-switch-input', 'r-checkbox-input'].includes(type)) return 'boolean'
  return type
}

const operatorsFor = (key) => {
  const type = typeFor(key)
  const operators = [
    ['advance_search_equal', '$eq'],
    ['advance_search_not_equal', '$ne']
  ]

  if (['r-text-input', 'r-text-area', 'r-tel-input', 'r-check-input', 'r-mask-input', 'r-color-input'].includes(type)) {
    operators.push(
      ['advance_search_contains', '$contains'],
      ['advance_search_starts_with', '$starts'],
      ['advance_search_ends_with', '$ends']
    )
  }
  if (type === 'r-select-input') {
    operators.push(
      ['advance_search_in', '$in'],
      ['advance_search_not_in', '$nin']
    )
  }
  if (isDictionaryField(key)) {
    operators.splice(
      0,
      operators.length,
      ['advance_search_equal', '$eq'],
      ['advance_search_not_equal', '$ne'],
      ['advance_search_contains', '$contains']
    )
  }
  if (type === 'r-radio-input') {
    operators.splice(0, operators.length, ['advance_search_equal', '$eq'], ['advance_search_not_equal', '$ne'])
  }
  if (['r-number-input', 'r-date-input', 'r-rating-input', 'r-unit-input'].includes(type)) {
    operators.push(
      ['advance_search_gt', '$gt'],
      ['advance_search_gte', '$gte'],
      ['advance_search_lt', '$lt'],
      ['advance_search_lte', '$lte']
    )
  }
  const fallbackLabels = {
    advance_search_equal: 'Is',
    advance_search_not_equal: 'Is not',
    advance_search_contains: isDictionaryField(key) ? 'Has key/value' : 'Contains',
    advance_search_starts_with: 'Starts with',
    advance_search_ends_with: 'Ends with',
    advance_search_in: 'Is any of',
    advance_search_not_in: 'Is none of',
    advance_search_gt: 'Greater than',
    advance_search_gte: 'At least',
    advance_search_lt: 'Less than',
    advance_search_lte: 'At most'
  }
  return operators.map(([label, value]) => ({name: translate(label, fallbackLabels[label]), value}))
}

const inputType = (filter) => {
  const type = typeFor(filter.key)
  if (type === 'boolean' || type === 'r-radio-input') return 'r-select-input'
  if (type === 'r-select-input') {
    const props = optionFor(filter.key).props || {}
    const membershipOperator = ['$in', '$nin'].includes(filter.action)
    if (!membershipOperator && !props.items?.length && !props.searchLink && !props.search_link && !props.tags) {
      return 'r-text-input'
    }
  }
  const supported = [
    'r-text-input', 'r-text-area', 'r-tel-input', 'r-check-input', 'r-mask-input',
    'r-select-input', 'r-number-input', 'r-date-input', 'r-range-input',
    'r-rating-input', 'r-unit-input', 'r-json-input', 'r-color-input',
    'r-password-input', 'r-time-input'
  ]
  return supported.includes(type) ? type : 'r-text-input'
}

const inputProps = (filter) => {
  const option = optionFor(filter.key)
  const componentProps = {...(option.props || {})}
  delete componentProps.rules

  if (typeFor(filter.key) === 'boolean') {
    return {
      items: [
        {name: translate('false', 'False'), value: 'false'},
        {name: translate('true', 'True'), value: 'true'}
      ],
      justValue: true,
      auto: 'float',
      disableSearch: true
    }
  }
  if (typeFor(filter.key) === 'r-radio-input') {
    componentProps.justValue = true
    componentProps.text = componentProps.text || 'title'
    componentProps.auto = 'float'
    componentProps.disableSearch = true
  }
  if (inputType(filter) === 'r-select-input') {
    const membershipOperator = ['$in', '$nin'].includes(filter.action)
    componentProps.justValue = true
    componentProps.multiple = membershipOperator
    componentProps.auto = 'float'
    if (membershipOperator) componentProps.tags = true
  }

  if (typeFor(filter.key) === 'r-date-range-input') {
    return {...componentProps, rangeMode: false, withTime: false}
  }
  if (inputType(filter) === 'r-date-input') {
    componentProps.rangeMode = false
    componentProps.withTime ??= true
  }
  if (inputType(filter) === 'r-json-input') {
    componentProps.template = undefined
  }
  return componentProps
}

const addFilter = () => {
  filters.value.push({
    id: nextFilterId++,
    key: fieldItems.value[0]?.value || '',
    action: '$eq',
    value: null,
    rangeMin: null,
    rangeMax: null,
    entryKey: '',
    entryValue: ''
  })
}

const changeField = (filter, key) => {
  if (filter.key !== key) {
    filter.key = key
    filter.action = '$eq'
    filter.value = null
    filter.rangeMin = null
    filter.rangeMax = null
    filter.entryKey = ''
    filter.entryValue = ''
  }
}

const changeOperator = (filter, action) => {
  if (filter.action !== action) {
    filter.action = action
    filter.value = null
  }
}

const removeFilter = (index) => {
  filters.value.splice(index, 1)
}

const membershipValues = (value) => {
  const values = Array.isArray(value)
    ? value
    : typeof value === 'string'
      ? value.split(',')
      : [value]
  return values
    .map(item => typeof item === 'string' ? item.trim() : item)
    .filter(item => item !== undefined && item !== null && item !== '')
}

const isFilterReady = (filter) => {
  if (!filter.key) return false
  if (isDictionaryField(filter.key) && ['$eq', '$ne', '$contains'].includes(filter.action)) {
    return typeof filter.entryKey === 'string'
      && filter.entryKey.trim().length > 0
      && filter.entryValue !== undefined
      && filter.entryValue !== null
      && String(filter.entryValue).trim().length > 0
  }
  if (['$in', '$nin'].includes(filter.action)) return membershipValues(filter.value).length > 0
  if (['r-range-input', 'r-date-range-input'].includes(typeFor(filter.key))) {
    const hasMinimum = filter.rangeMin !== undefined && filter.rangeMin !== null && filter.rangeMin !== ''
    const hasMaximum = filter.rangeMax !== undefined && filter.rangeMax !== null && filter.rangeMax !== ''
    if (!hasMinimum && !hasMaximum) return false
    if (hasMinimum && hasMaximum) {
      const minimum = typeFor(filter.key) === 'r-date-range-input'
        ? new Date(filter.rangeMin).getTime()
        : Number(filter.rangeMin)
      const maximum = typeFor(filter.key) === 'r-date-range-input'
        ? new Date(filter.rangeMax).getTime()
        : Number(filter.rangeMax)
      if (minimum > maximum) return false
    }
    return true
  }
  if (filter.value === undefined || filter.value === null) return false
  if (typeof filter.value === 'string') return filter.value.trim().length > 0
  if (Array.isArray(filter.value)) return filter.value.length > 0
  if (typeof filter.value === 'object') return Object.keys(filter.value).length > 0
  return true
}

const normalizeValue = (filter) => {
  const type = typeFor(filter.key)
  let value = filter.value
  if (['$in', '$nin'].includes(filter.action)) {
    value = membershipValues(value)
  }

  if (type === 'boolean') {
    value = value === true || value === 'true'
  } else if (['r-number-input', 'r-rating-input'].includes(type)) {
    const number = Number(value)
    if (Number.isFinite(number)) value = number
  } else if (type === 'r-unit-input' && value && typeof value === 'object') {
    const number = Number(value.value)
    if (Number.isFinite(number)) value = {...value, value: number}
  } else if (type === 'r-date-input') {
    value = {'$date': value}
  } else if (filter.key === '_id' || optionFor(filter.key).is_object_id === true) {
    value = Array.isArray(value)
      ? value.map(item => ({'$oid': item}))
      : {'$oid': value}
  } else if (optionFor(filter.key).is_object_id) {
    const idField = optionFor(filter.key).is_object_id
    value = Array.isArray(value)
      ? value.map(item => ({...item, [idField]: {'$oid': item[idField]}}))
      : {...value, [idField]: {'$oid': value[idField]}}
  }
  return value
}

const toFilter = (filter) => {
  if (isDictionaryField(filter.key) && ['$eq', '$ne', '$contains'].includes(filter.action)) {
    return {
      [filter.key]: {
        [filter.action]: {[filter.entryKey.trim()]: filter.entryValue}
      }
    }
  }
  if (['r-range-input', 'r-date-range-input'].includes(typeFor(filter.key))) {
    const condition = {}
    const isDateRange = typeFor(filter.key) === 'r-date-range-input'
    if (filter.rangeMin !== undefined && filter.rangeMin !== null && filter.rangeMin !== '') {
      condition.$gte = isDateRange ? {'$date': filter.rangeMin} : Number(filter.rangeMin)
    }
    if (filter.rangeMax !== undefined && filter.rangeMax !== null && filter.rangeMax !== '') {
      if (isDateRange) {
        const endDate = new Date(filter.rangeMax)
        endDate.setDate(endDate.getDate() + 1)
        condition.$lt = {'$date': endDate.toISOString()}
      } else {
        condition.$lte = Number(filter.rangeMax)
      }
    }
    return {[filter.key]: condition}
  }
  return {[filter.key]: {[filter.action || '$eq']: normalizeValue(filter)}}
}

const updateBasicSearch = (value) => {
  filters.value = []
  emit('update:modelValue', value)
}

const send = () => {
  const validFilters = filters.value.filter(isFilterReady)
  if (!validFilters.length) return

  const conditions = validFilters.map(toFilter)
  const payload = conditions.length === 1
    ? conditions[0]
    : {[matchMode.value]: conditions}
  emit('a-search', payload)
}

const clearFilters = () => {
  filters.value = []
  matchMode.value = '$and'
  emit('update:modelValue', '')
  emit('a-search', {})
}

const accept = () => {
  emit('delete', true)
  showConfirm.value = false
}

const open = () => {
  show.value = !show.value
}
</script>

<style lang="scss">
.advanced-search {
  border: 1px solid var(--color-border-low);
  border-radius: 8px;
  background: var(--color-sheet-container-low);
}

.filter-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.filter-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  border: 1px solid var(--color-border-low);
  border-radius: 6px;
  background: var(--color-sheet);
}

.filter-index {
  min-width: 24px;
  text-align: center;
  color: var(--color-on-sheet-low);
}

.filter-field {
  flex: 1 1 180px;
  min-width: 150px;
}

.filter-operator {
  flex: 1 1 170px;
  min-width: 145px;
}

.filter-value {
  flex: 2 1 220px;
  min-width: 160px;
}

.filter-dictionary {
  display: flex;
  gap: 8px;
}

.filter-dictionary-key,
.filter-dictionary-value {
  flex: 1 1 140px;
  min-width: 100px;
}

.filter-range {
  display: flex;
  gap: 8px;
}

.filter-range-input {
  flex: 1 1 120px;
  min-width: 100px;
}

.filter-remove {
  flex: 0 0 auto;
}

.filter-empty {
  text-align: center;
  color: var(--color-on-sheet-low);
  border: 1px dashed var(--color-border-low);
  border-radius: 6px;
}

.filter-count {
  display: inline-flex;
  min-width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: var(--color-sheet-container-high);
  font-size: 12px;
}

.match-mode {
  min-width: 170px;
}

@media (max-width: 700px) {
  .filter-row {
    align-items: stretch;
    flex-wrap: wrap;
  }

  .filter-index {
    align-self: center;
  }

  .filter-field,
  .filter-operator,
  .filter-value,
  .filter-dictionary {
    flex-basis: calc(100% - 40px);
    min-width: 0;
  }

  .filter-remove {
    margin-left: auto;
  }
}
</style>
