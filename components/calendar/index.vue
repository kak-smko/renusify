<template>
  <div :class="`${$r.prefix}calendar`">
    <r-container v-if="showHeaders">
      <r-row>
        <r-col class="col-auto">
          <r-btn v-if="tab!=='month'" icon
                 @click.prevent="tab==='day'?incrementMonth(-1):incrementYear(-12)">
            <r-icon v-html="$r.icons.arrow_left"></r-icon>
          </r-btn>
        </r-col>
        <r-col class="text-center">
          <r-btn class="me-2" text @click.prevent="tab==='month'?tab='day':tab='month'">
            <r-icon v-html="tab==='month'?$r.icons.chevron_up:$r.icons.chevron_down"></r-icon>
            {{
              $d(new
              Date(currentPeriod.year, currentPeriod.month, 1, 0, langZoneOffset - timezoneOffset), 'month', locale)
            }}
          </r-btn>
          <r-btn text @click.prevent="tab==='year'?tab='day':tab='year'">
            <r-icon v-html="tab==='year'?$r.icons.chevron_up:$r.icons.chevron_down"></r-icon>
            {{
              $d(new
              Date(currentPeriod.year, currentPeriod.month, 1, 0, langZoneOffset - timezoneOffset), 'year', locale)
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
    <table class="table">
      <thead>
      <tr>
        <th class="headCell" v-for="(weekday, weekdayIndex) in weekDays" :key="weekdayIndex">
          <span class="headCellContent label-1">{{ weekday }}</span>
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
                         selectable: !readonly && !item.disabled,
                         disabled: item.disabled,
                         today: item.today
                                    }"
              :key="item.date"
              @click.prevent="item.date!==0 &&!readonly&& selectDateItem(item)"
          >
            <div
                class="cellContent"
                v-if="item.date!==0"
            >
              <!-- Default slot for custom date cell content. Provides date scoped prop -->
              <slot :date="item.date">
                <div class="pa-2">{{ $d(item.date, 'day', locale) }}</div>
              </slot>
            </div>
          </td>
        </tr>
        </tbody>
      </transition>
    </table>

    <r-modal :model-value="tab!=='day'" @update:model-value="tab='day'">
      <div class="py-5">
        <year v-if="tab==='year'"
              :model-value='currentPeriod.year'
              @update:model-value="(tab='month',incrementYear($event))"
              :timezoneOffset="langZoneOffset-timezoneOffset"
              :locale="locale"
              :month="currentPeriod.month"
        ></year>
        <month v-if="tab==='month'"
               :model-value='currentPeriod.month'
               @update:model-value="(tab='day',setMonth($event))"
               :timezoneOffset="langZoneOffset-timezoneOffset"
               :locale="locale"
               :month="currentPeriod.month"
               :year="currentPeriod.year"
        ></month>
      </div>
    </r-modal>
  </div>

</template>

<script setup>
import {ref, computed, watch, inject} from 'vue'
import Year from "./year.vue";
import Month from "./month.vue";

const props = defineProps({
  /**
   * Language/locale for calendar display
   * @type {String}
   */
  lang: String,

  /**
   * Makes the calendar read-only
   * @type {Boolean}
   */
  readonly: Boolean,

  /**
   * Shows calendar headers with navigation controls
   * @type {Boolean}
   * @default true
   */
  showHeaders: {
    type: Boolean,
    default: true
  },

  /**
   * Function to determine if a date should be disabled
   * @type {Function}
   * @default () => false
   * @param {Date} date - Date to check
   * @returns {Boolean} - Whether date is disabled
   */
  isDateDisabled: {
    type: Function,
    default: () => false
  },

  /**
   * Initial year to display
   * @type {Number}
   */
  year: Number,

  /**
   * Initial month to display (0-11)
   * @type {Number}
   */
  month: Number,
})

const emit = defineEmits([
  /**
   * Emitted when the visible period changes
   * @param {Object} range - Date range object
   * @param {Date} range.start - Start date of visible period
   * @param {Date} range.end - End date of visible period
   */
  'change',

  /**
   * Emitted when a date is selected
   * @param {String} dateString - ISO string of selected date
   */
  'select'
])

const {$dateTime, $helper, $r, $d} = inject('renusify')

const tab = ref('day')
const direction = ref(undefined)
const currentPeriod = ref({
  month: props.month ? props.month : new Date().getMonth(),
  year: props.year ? props.year : new Date().getFullYear()
})

const locale = computed(() => props.lang || $r?.lang || 'en')
const today = computed(() => new Date())

const firstDayOfWeek = computed(() => {
  return $helper.ifHas($dateTime.langs, 0, locale.value, 'first_day') || 0
})

const timezoneOffset = computed(() => {
  return new Date(currentPeriod.value.year, currentPeriod.value.month, 10).getTimezoneOffset()
})

const langZoneOffset = computed(() => {
  return ($helper.ifHas($dateTime.langs, 0, locale.value, 'time_zone_offset') || 0) * -1
})

const rangeLocalDate = computed(() => {
  const {year, month} = currentPeriod.value

  const firstDayOfMonth = new Date(year, month, 1, 0, langZoneOffset.value - timezoneOffset.value, 0)
  const firstDayWeekday = parseInt($d(firstDayOfMonth, 'de', locale.value))
  const calendarStart = new Date(year, month, 1 - firstDayWeekday + 1, 0, langZoneOffset.value - timezoneOffset.value, 0)

  const firstDayNextMonth = new Date(year, month + 1, 1, 0, langZoneOffset.value - timezoneOffset.value, 0)
  const firstDayNextMonthWeekday = parseInt($d(firstDayNextMonth, 'de', locale.value))
  const calendarEnd = new Date(year, month + 1, 1 - firstDayNextMonthWeekday, 23, 59 + langZoneOffset.value - timezoneOffset.value, 59)

  return {start: calendarStart, end: calendarEnd}
})

const weekDaysBeforeFirstDayOfTheMonth = computed(() => {
  const weekDay = rangeLocalDate.value.start.getDay()
  return (weekDay - parseInt(firstDayOfWeek.value) + 7) % 7
})

const weekDays = computed(() => {
  const first = parseInt(firstDayOfWeek.value)
  return createRange(7).map(i =>
      $d(new Date(2025, 2, first + i + 23, 0, langZoneOffset.value - timezoneOffset.value, 0), 'narrow', locale.value)
  )
})

const currentPeriodDates = computed(() => {
  const {start, end} = rangeLocalDate.value
  const weeks = []
  let currentDate = new Date(start)

  let rows = Array.from({length: weekDaysBeforeFirstDayOfTheMonth.value}, () => ({
    date: 0,
    disabled: true,
    today: false
  }))

  while (currentDate <= end) {
    const date = new Date(currentDate)
    rows.push({
      date,
      disabled: props.isDateDisabled(date),
      today: areSameDates(date, today.value)
    })

    if (rows.length % 7 === 0) {
      weeks.push(rows)
      rows = []
    }

    currentDate.setDate(currentDate.getDate() + 1)
  }

  if (rows.length > 0) {
    const remainingDays = 7 - (rows.length % 7)
    rows.push(...Array.from({length: remainingDays}, () => ({
      date: 0,
      disabled: true,
      today: false
    })))
    weeks.push(rows)
  }

  return weeks
})

watch(currentPeriod, (newPeriod, oldPeriod) => {
  const currentDate = new Date(newPeriod.year, newPeriod.month).getTime()
  const oldDate = new Date(oldPeriod.year, oldPeriod.month).getTime()

  direction.value = currentDate !== oldDate
      ? (currentDate > oldDate ? 'next' : 'prev')
      : undefined

  setTimeout(() => {
    emit('change', rangeLocalDate.value)
  }, 10)
}, {deep: true})

const createRange = (number) => {
  return Array.from({length: number}, (_, i) => i)
}

/**
 * Increments or decrements the current month
 * @param {Number} increment - Number of months to increment (negative for decrement)
 */
const incrementMonth = (increment = 1) => {
  const incrementDate = new Date(currentPeriod.value.year, currentPeriod.value.month + increment)
  currentPeriod.value = {
    month: incrementDate.getMonth(),
    year: incrementDate.getFullYear()
  }
}

/**
 * Increments or decrements the current year
 * @param {Number} increment - Number of years to increment (negative for decrement)
 */
const incrementYear = (increment = 1) => {
  const incrementDate = new Date(currentPeriod.value.year + increment, currentPeriod.value.month)
  currentPeriod.value = {
    month: incrementDate.getMonth(),
    year: incrementDate.getFullYear()
  }
}

/**
 * Sets the current month
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
 * Handles date selection
 * @param {Object} item - Date item object
 * @param {Date} item.date - Date object
 */
const selectDateItem = (item) => {
  if (!item.disabled && item.date) {
    emit('select', item.date.toISOString())
  }
}

/**
 * Compares two dates for equality (ignoring time)
 * @param {Date} date1 - First date
 * @param {Date} date2 - Second date
 * @returns {Boolean} - Whether dates are the same day
 */
const areSameDates = (date1, date2) => {
  if (!date1 || !date2 || typeof date1.getDate !== 'function' || typeof date2.getDate !== 'function') {
    return false
  }
  return date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
}

$dateTime.set_format({
  'de': {
    day: 'numeric',
    numberingSystem: 'latn'
  },
  'me': {
    month: 'numeric',
    numberingSystem: 'latn'
  },
  'ye': {
    year: 'numeric',
    numberingSystem: 'latn'
  }
})

if (rangeLocalDate.value.start > today.value) {
  incrementMonth(-1)
}
if (rangeLocalDate.value.end < today.value) {
  incrementMonth(1)
}
</script>

<style lang="scss">
@use "../../style" as *;

.#{$prefix}calendar {
  position: relative;
  display: inline-block;
  font-family: inherit;
  overflow-x: auto;
  max-width: 100%;
  background-color: var(--color-sheet-container-lowest);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  .table {
    width: 100%;
    position: relative;
    z-index: 1;
    border-collapse: collapse;
    @include media-breakpoint-up('lg') {
      table-layout: fixed;
    }
  }

  .headCell {
    padding: 12px 8px;
    text-align: center;
    border-bottom: 1px solid var(--color-border-low);
    background-color: var(--color-sheet-container-low);
  }

  .headCellContent {
    color: var(--color-on-sheet-2);
    letter-spacing: 0.05em;
  }

  .cell {
    padding: 0;
    height: 60px;
    border: 1px solid var(--color-border-low);
    transition: all 0.2s ease;
    position: relative;
    vertical-align: top;

    &:hover:not(.disabled) {
      background-color: var(--color-sheet-container-low);
    }

    &.today {
      .cellContent {
        font-weight: 600;
        color: var(--color-one);
        border: 1px solid var(--color-one);
      }
    }

    &.selectable {
      cursor: pointer;

      &:hover {
        .cellContent {
          color: var(--color-one);
        }
      }
    }

    &.disabled {
      background-color: var(--color-sheet-container);
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .cellContent {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    min-height: 60px;
    padding: 8px;
    transition: all 0.2s ease;
    color: var(--color-on-sheet);
    position: relative;
  }

  .cell.outOfRange {
    .cellContent {
      color: var(--color-border);
      opacity: 0.6;
    }
  }
}
</style>
