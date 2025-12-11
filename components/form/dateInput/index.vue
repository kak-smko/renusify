<template>
  <r-input :model-value="displayValue" @click.prevent="show=true">
    <div :class="`${$r.prefix}date-color-input`" class="date-range-display">
      {{ displayValue }}
    </div>
    <r-modal :model-value="show" class="text-center" no-close-btn @update:model-value="close()">
      <div v-if="!showTime" :class="`${$r.prefix}date-input`">
        <div>
          <r-container>
            <r-row>
              <r-col class="col-auto">
                <r-btn v-if="tab!=='month'" icon
                       @click.prevent="tab==='day'?incrementMonth(-1):incrementYear(-12)">
                  <r-icon v-html="$r.icons.arrow_left"></r-icon>
                </r-btn>
              </r-col>
              <r-col class="text-center">
                <r-btn class="me-2 title-2" text @click.prevent="tab==='month'?tab='day':tab='month'">
                  <r-icon v-html="tab==='month'?$r.icons.chevron_up:$r.icons.chevron_down"></r-icon>
                  {{
                    $d(new
                    Date(currentPeriod.year, currentPeriod.month, 1, 0, lang_zone_offset - timezoneOffset), 'month', locale)
                  }}
                </r-btn>

                <r-btn class="title-2" text @click.prevent="tab==='year'?tab='day':tab='year'">
                  <r-icon v-html="tab==='year'?$r.icons.chevron_up:$r.icons.chevron_down"></r-icon>
                  {{
                    $d(new
                    Date(currentPeriod.year, currentPeriod.month, 1, 0, lang_zone_offset - timezoneOffset), 'year', locale)
                  }}
                </r-btn>
              </r-col>
              <r-col class="col-auto">
                <r-btn v-if="tab!=='month'" icon
                       @click.prevent="tab==='day'?incrementMonth(1):incrementYear(12)">
                  <r-icon v-html="$r.icons.arrow_right"></r-icon>
                </r-btn>
              </r-col>
            </r-row>
          </r-container>

          <year v-if="tab==='year'"
                :model-value='currentPeriod.year'
                @update:model-value="(tab='month',incrementYear($event))"
                :timezoneOffset="lang_zone_offset-timezoneOffset"
                :locale="locale"
                :month="currentPeriod.month"></year>
          <month v-if="tab==='month'"
                 :model-value='currentPeriod.month'
                 @update:model-value="(tab='day',setMonth($event))"
                 :timezoneOffset="lang_zone_offset-timezoneOffset"
                 :locale="locale"
                 :month="currentPeriod.month"
                 :year="currentPeriod.year"></month>

          <div v-if="isRangeMode && rangeSelection.startDate && rangeSelection.endDate" class="range-info">
            <div class="title-3">
              {{ $d(rangeSelection.startDate, withTime ? 'long' : 'medium', locale) }} -
              {{ $d(rangeSelection.endDate, withTime ? 'long' : 'medium', locale) }}
            </div>
          </div>

          <table v-if="tab==='day'" class="table">
            <thead>
            <tr>
              <th class="headCell" v-for="(weekday, weekdayIndex) in weekDays" :key="weekdayIndex">
                <span class="headCellContent">{{ weekday }}</span>
              </th>
            </tr>
            </thead>
            <transition :name="direction==='next'?'slide-start-to-end':'slide-end-to-start'" mode="out-in">
              <tbody
                  :key="currentPeriod.year + '-' + currentPeriod.month"
              >
              <tr class="table-row" v-for="(week, weekIndex) in currentPeriodDates" :key="weekIndex">
                <td
                    class="cell"
                    v-for="item in week"
                    :class="{
                         selectable:!item.disabled,
                         selected: item.selected,
                         'range-start': item.isRangeStart,
                         'range-end': item.isRangeEnd,
                         'in-range': item.inRange,
                         disabled: item.disabled,
                         today: item.today
                                    }"
                    :key="item.date"
                    @click.prevent="item.date!==0 &&selectDateItem(item)"
                >
                  <div
                      class="cellContent d-flex h-center v-center"
                      v-if="item.date!==0"
                  >
                    {{ $d(item.date, 'day', locale) }}
                  </div>
                </td>
              </tr>
              </tbody>
            </transition>
          </table>
        </div>
      </div>

      <div v-else class="d-flex flex-column h-center v-center pa-5">
        <timepicker
            is24-hour
            withSec
            v-model="time"
        ></timepicker>
        <div class="mt-5">
          <r-btn class="color-success mx-5" @click.prevent="selectTime">{{ $t('ok', 'renusify') }}</r-btn>
          <r-btn class="color-error mx-5" @click.prevent="close">{{ $t('cancel', 'renusify') }}</r-btn>
        </div>
      </div>

      <div v-if="isRangeMode&&!showTime" class="date-picker-actions mb-3">
        <r-btn class="color-one mx-5" @click.prevent="confirmRange">{{ $t('confirm', 'renusify') }}</r-btn>
        <r-btn class="mx-5" text @click.prevent="resetRange">{{ $t('reset', 'renusify') }}</r-btn>
      </div>
    </r-modal>
  </r-input>
</template>

<script setup>
import {ref, computed, watch, inject} from 'vue'
import Timepicker from "../timeInput/timepicker.vue";
import Year from "./year.vue";
import Month from "./month.vue";

const props = defineProps({
  /**
   * The model value for the date picker (v-model)
   * @type {String|Array}
   */
  modelValue: {
    type: [String, Array]
  },

  /**
   * Language/locale for date formatting
   * @type {String}
   */
  lang: {
    type: String
  },

  /**
   * Enables time selection alongside date selection
   * @type {Boolean}
   */
  withTime: Boolean,

  /**
   * Enables date range selection mode
   * @type {Boolean}
   * @default false
   */
  rangeMode: {
    type: Boolean,
    default: false
  },

  /**
   * Function to determine if a date should be disabled
   * @type {Function}
   * @default () => false
   * @param {Date} date - The date to check
   * @returns {Boolean} True if the date should be disabled
   */
  isDateDisabled: {
    type: Function,
    default: () => false
  }
})

const emit = defineEmits([
  /**
   * Emitted when the date value changes
   * @param {String|Array} value - The new date value(s)
   */
  'update:modelValue'
])

const {$dateTime, $helper, $r, $d} = inject('renusify')

const tab = ref('day')
const show = ref(false)
const showTime = ref(false)
const time = ref(null)
const date = ref(null)
const direction = ref(undefined)
const timeSelectionType = ref('start')

const currentPeriod = ref({
  month: new Date().getMonth() + 1,
  year: new Date().getFullYear()
})

const rangeSelection = ref({
  startDate: null,
  endDate: null,
  selecting: false
})

const TODAY = new Date()

const locale = computed(() => props.lang || $r.lang)
const firstDayOfWeek = computed(() =>
    $helper.ifHas($dateTime.langs, 0, locale.value, 'first_day')
)

const modelValueDate = computed(() => {
  if (props.isRangeMode && rangeSelection.value.startDate) {
    return rangeSelection.value.startDate
  }
  if (!props.modelValue || !new Date(props.modelValue)) {
    return new Date()
  }
  return new Date(props.modelValue)
})

const timezoneOffset = computed(() =>
    new Date(currentPeriod.value.year, currentPeriod.value.month, 10).getTimezoneOffset()
)

const lang_zone_offset = computed(() =>
    $helper.ifHas($dateTime.langs, 0, locale.value, 'time_zone_offset') * -1
)

const displayValue = computed(() => {
  if (props.isRangeMode) {
    const {startDate, endDate} = rangeSelection.value
    if (startDate && endDate) {
      const format = props.withTime ? 'long' : 'medium'
      return `${$d(startDate, format, locale.value)} - ${$d(endDate, format, locale.value)}`
    }
    return null
  }
  return props.modelValue ? $d(modelValueDate.value, props.withTime ? 'long' : 'medium', locale.value) : null
})

const weekDays = computed(() => {
  const first = parseInt(firstDayOfWeek.value, 10)
  return createRange(7).map(i =>
      $d(new Date(2025, 2, first + i + 23, 0, lang_zone_offset.value - timezoneOffset.value, 0), 'narrow', locale.value)
  )
})

const rangeLocalDate = computed(() => {
  const {year, month} = currentPeriod.value

  const firstDayOfMonth = new Date(year, month, 1, 0, lang_zone_offset.value - timezoneOffset.value, 0)
  const firstDayWeekday = parseInt($d(firstDayOfMonth, 'de', locale.value))
  const calendarStart = new Date(year, month, 1 - firstDayWeekday + 1, 0, lang_zone_offset.value - timezoneOffset.value, 0)

  const firstDayNextMonth = new Date(year, month + 1, 1, 0, lang_zone_offset.value - timezoneOffset.value, 0)
  const firstDayNextMonthWeekday = parseInt($d(firstDayNextMonth, 'de', locale.value))
  const calendarEnd = new Date(year, month + 1, 1 - firstDayNextMonthWeekday, 23, 59 + lang_zone_offset.value - timezoneOffset.value, 59)

  return {start: calendarStart, end: calendarEnd}
})

const weekDaysBeforeFirstDayOfTheMonth = computed(() => {
  const {start} = rangeLocalDate.value
  const weekDay = start.getDay()
  return (weekDay - parseInt(firstDayOfWeek.value) + 7) % 7
})

const currentPeriodDates = computed(() => {
  const {start, end} = rangeLocalDate.value

  function* dateGenerator() {
    const current = new Date(start)
    while (current <= end) {
      yield new Date(current)
      current.setDate(current.getDate() + 1)
    }
  }

  const weeks = []
  let currentWeek = []

  const leadingEmptyDays = weekDaysBeforeFirstDayOfTheMonth.value
  currentWeek.push(...Array(leadingEmptyDays).fill(null).map(() => createEmptyDateCell(null)))

  for (const date of dateGenerator()) {
    currentWeek.push(createDateCell(date))

    if (currentWeek.length === 7) {
      weeks.push(currentWeek)
      currentWeek = []
    }
  }

  if (currentWeek.length > 0) {
    const trailingEmptyDays = 7 - currentWeek.length
    currentWeek.push(...Array(trailingEmptyDays).fill(null).map(() => createEmptyDateCell(null)))
    weeks.push(currentWeek)
  }

  return weeks
})

const createRange = (number) => Array.from({length: number}, (_, i) => i)

const createEmptyDateCell = () => ({
  date: 0,
  disabled: true,
  selected: false,
  today: false,
  isRangeStart: false,
  isRangeEnd: false,
  inRange: false
})

const createDateCell = (date) => {
  const cell = {
    date,
    disabled: props.isDateDisabled(date),
    selected: areSameDates(date, modelValueDate.value),
    today: areSameDates(date, TODAY),
    isRangeStart: false,
    isRangeEnd: false,
    inRange: false
  }

  if (props.isRangeMode) {
    cell.isRangeStart = rangeSelection.value.startDate ? areSameDates(date, rangeSelection.value.startDate) : false
    cell.isRangeEnd = rangeSelection.value.endDate ? areSameDates(date, rangeSelection.value.endDate) : false
    cell.inRange = isDateInRange(date)
  }

  return cell
}

/**
 * Checks if two dates are the same day
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {Boolean} True if dates are the same day
 */
const areSameDates = (date1, date2) => {
  if (!date1 || !date2 || typeof date1.getDate !== 'function' || typeof date2.getDate !== 'function') {
    return false
  }
  return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
}

/**
 * Checks if a date is within the selected range
 * @param {Date} date - Date to check
 * @returns {Boolean} True if date is within range
 */
const isDateInRange = (date) => {
  const {startDate, endDate} = rangeSelection.value
  if (!startDate || !endDate) return false
  return date > startDate && date < endDate
}

/**
 * Increments the current month view
 * @param {Number} increment - Number of months to increment
 */
const incrementMonth = (increment = 1) => {
  const incrementDate = new Date(currentPeriod.value.year, currentPeriod.value.month + increment)
  currentPeriod.value = {
    month: incrementDate.getMonth(),
    year: incrementDate.getFullYear()
  }
}

/**
 * Increments the current year view
 * @param {Number} increment - Number of years to increment
 */
const incrementYear = (increment = 1) => {
  const incrementDate = new Date(currentPeriod.value.year + increment, currentPeriod.value.month)
  currentPeriod.value = {
    month: incrementDate.getMonth(),
    year: incrementDate.getFullYear()
  }
}

/**
 * Sets the current month view
 * @param {Number} monthIndex - Month index (0-11)
 */
const setMonth = (monthIndex) => {
  const incrementDate = new Date(currentPeriod.value.year, monthIndex)
  currentPeriod.value = {
    month: incrementDate.getMonth(),
    year: incrementDate.getFullYear()
  }
}

/**
 * Closes the date picker
 * @param {Boolean} force - Force close even in range mode
 */
const close = (force = false) => {
  if (force || !props.isRangeMode) {
    show.value = false
  }
  showTime.value = false
}

/**
 * Handles time selection
 */
const selectTime = () => {
  const times = (time.value ? time.value : '00:00:00').split(':')
  const [hours, minutes, seconds] = times.map(t => parseInt(t))

  if (props.isRangeMode) {
    handleRangeTimeSelection(hours, minutes, seconds)
  } else {
    handleSingleTimeSelection(hours, minutes, seconds)
  }
}

/**
 * Handles time selection for range mode
 * @param {Number} hours - Selected hours
 * @param {Number} minutes - Selected minutes
 * @param {Number} seconds - Selected seconds
 */
const handleRangeTimeSelection = (hours, minutes, seconds) => {
  if (timeSelectionType.value === 'start') {
    const startDate = new Date(rangeSelection.value.startDate)
    startDate.setHours(hours, minutes, seconds)
    rangeSelection.value.startDate = startDate

    if (rangeSelection.value.endDate) {
      timeSelectionType.value = 'end'
      const endDate = rangeSelection.value.endDate
      time.value = formatTime(endDate.getHours(), endDate.getMinutes(), endDate.getSeconds())
    }
    close()
  } else {
    const endDate = new Date(rangeSelection.value.endDate)
    endDate.setHours(hours, minutes, seconds)
    rangeSelection.value.endDate = endDate
    close()
  }
}

/**
 * Handles time selection for single date mode
 * @param {Number} hours - Selected hours
 * @param {Number} minutes - Selected minutes
 * @param {Number} seconds - Selected seconds
 */
const handleSingleTimeSelection = (hours, minutes, seconds) => {
  const selectedDate = new Date(date.value)
  selectedDate.setHours(hours, minutes, seconds)
  emit('update:modelValue', selectedDate.toISOString())
  close()
}

/**
 * Formats time components to HH:MM:SS string
 * @param {Number} hours - Hours
 * @param {Number} minutes - Minutes
 * @param {Number} seconds - Seconds
 * @returns {String} Formatted time string
 */
const formatTime = (hours, minutes, seconds) => {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

/**
 * Handles date selection
 * @param {Object} item - Date cell object
 */
const selectDateItem = (item) => {
  if (!item.disabled) {
    if (props.isRangeMode) {
      handleRangeSelection(item.date)
    } else {
      if (props.withTime) {
        date.value = item.date
        showTime.value = true
      } else {
        emit('update:modelValue', item.date.toISOString())
        close()
      }
    }
  }
}

/**
 * Handles date range selection
 * @param {Date} date - Selected date
 */
const handleRangeSelection = (date) => {
  if (!rangeSelection.value.selecting) {
    rangeSelection.value = {
      startDate: date,
      endDate: null,
      selecting: true
    }

    if (props.withTime) {
      timeSelectionType.value = 'start'
      showTime.value = true
      time.value = formatTime(date.getHours(), date.getMinutes(), date.getSeconds())
    }
  } else {
    const newRange = {...rangeSelection.value}

    if (date < newRange.startDate) {
      newRange.endDate = newRange.startDate
      newRange.startDate = date
    } else {
      newRange.endDate = date
    }

    newRange.selecting = false
    rangeSelection.value = newRange

    if (props.withTime) {
      timeSelectionType.value = 'end'
      showTime.value = true
      time.value = formatTime(newRange.endDate.getHours(), newRange.endDate.getMinutes(), newRange.endDate.getSeconds())
    }
  }
}

/**
 * Confirms the selected date range
 */
const confirmRange = () => {
  const {startDate, endDate} = rangeSelection.value
  if (startDate && endDate) {
    emit('update:modelValue', [
      startDate.toISOString(),
      endDate.toISOString()
    ])
    close(true)
  }
}

/**
 * Resets the date range selection
 */
const resetRange = () => {
  rangeSelection.value = {
    startDate: null,
    endDate: null,
    selecting: false
  }
  timeSelectionType.value = 'start'
}

watch(modelValueDate, (newVal) => {
  currentPeriod.value = {
    month: newVal.getMonth() + 1,
    year: newVal.getFullYear()
  }

  const {start, end} = rangeLocalDate.value
  if (start > newVal) incrementMonth(-1)
  if (end < newVal) incrementMonth(1)
})

watch(currentPeriod, (newPeriod, oldPeriod) => {
  const currentDate = new Date(newPeriod.year, newPeriod.month).getTime()
  const oldDate = new Date(oldPeriod.year, oldPeriod.month).getTime()
  direction.value = currentDate !== oldDate
      ? (currentDate > oldDate ? 'next' : 'prev')
      : undefined
})

$dateTime.set_format({
  'de': {day: 'numeric', numberingSystem: 'latn'},
  'me': {month: 'numeric', numberingSystem: 'latn'},
  'ye': {year: 'numeric', numberingSystem: 'latn'}
})

if (props.isRangeMode && Array.isArray(props.modelValue) && props.modelValue.length === 2) {
  rangeSelection.value = {
    startDate: new Date(props.modelValue[0]),
    endDate: new Date(props.modelValue[1]),
    selecting: false
  }
}

const {start, end} = rangeLocalDate.value
if (start > modelValueDate.value) incrementMonth(-1)
if (end < modelValueDate.value) incrementMonth(1)
</script>

<style lang="scss">
@use "../../../style" as *;

.#{$prefix}date-color-input {
  color: var(--color-on-sheet);

  &.date-range-display {
    font-weight: 500;
  }
}

.#{$prefix}date-input {
  position: relative;
  display: inline-block;
  font-size: 10px;
  border-radius: 12px;
  padding: 16px;
  overflow: hidden;

  .date-picker-header {
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 1px solid var(--color-border-low);

    h3 {
      margin: 0;
      color: var(--color-one);
    }
  }

  .range-info {
    margin: 12px 0;
    padding: 12px;
    background-color: var(--color-one-container);
    border-radius: 8px;
    color: var(--color-on-one-container);

    .body-2 {
      margin-bottom: 4px;
      opacity: 0.8;
    }
  }

  .date-picker-actions {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    padding-top: 12px;
    border-top: 1px solid var(--color-border-low);
  }

  .date-picker-year {
    max-height: 300px;
    overflow: auto;
  }

  .cell {
    &.today {
      color: var(--color-one);
      font-weight: 600;

      .cellContent {
        border: solid 1px var(--color-one);
      }
    }

    &.selected {
      .cellContent {
        color: var(--color-on-one);
        background: var(--color-one);
        font-weight: 600;
      }
    }

    &.range-start {
      .cellContent {
        color: var(--color-on-one) !important;
        background: var(--color-one) !important;
        font-weight: 600;
      }
    }

    &.range-end {
      .cellContent {
        color: var(--color-on-one) !important;
        background: var(--color-one) !important;
        font-weight: 600;
      }
    }

    &.in-range {
      .cellContent {
        background: var(--color-one-container);
        color: var(--color-on-one-container);
      }
    }

    &.selectable:hover {
      .cellContent {
        color: var(--color-on-one);
        background: var(--color-one);
      }
    }
  }

  .table {
    width: 100%;
    table-layout: fixed;
    position: relative;
    z-index: 5;
    margin-top: 16px;
  }

  .cell, .headCell {
    text-align: center;
    box-sizing: border-box;
  }

  .cell {
    padding: 0.5em 0;
    position: relative;
  }

  .headCell {
    padding: 0.3em 0.5em 1.8em;
  }

  .headCellContent {
    font-size: 1.3em;
    font-weight: 600;
    color: var(--color-on-sheet-low);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .cellContent {
    padding: 5px;
    font-size: 1.4em;
    margin: 0 auto;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 100%;
    transition: all 0.2s ease;
    position: relative;
    z-index: 2;
  }

  .cell.in-range::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--color-one-container);
    z-index: 1;
  }

  .cell.range-start::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--color-one-container);
    z-index: 1;
    @include ltr() {
      left: 50%;
      right: 0;
    }
    @include rtl() {
      left: 0;
      right: 50%;
    }
  }

  .cell.range-end::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--color-one-container);
    z-index: 1;
    @include ltr() {
      left: 0;
      right: 50%;
    }
    @include rtl() {
      left: 50%;
      right: 0;

    }
  }

  .cell.outOfRange {
    color: var(--color-sheet-low);
  }

  .cell.selectable {
    cursor: pointer;
  }

  .cell.disabled {
    opacity: 0.38;
  }
}

.time-selection-title {
  color: var(--color-one);
  font-weight: 600;
}
</style>
