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
              Date(currentPeriod.year, currentPeriod.month, 1, 0, lang_zone_offset - timezoneOffset), 'month', locale)
            }}
          </r-btn>
          <r-btn text @click.prevent="tab==='year'?tab='day':tab='year'">
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
    <table class="table">
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
                         selectable: !readonly && !item.disabled,
                         disabled: item.disabled,
                         today: item.today
                                    }"
              :key="item.date"
              @click="item.date!==0 &&!readonly&& selectDateItem(item)"
          >
            <div
                class="cellContent"
                v-if="item.date!==0"
            >
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
      <r-card class="py-5">
        <year-tab v-if="tab==='year'"
                  :model-value='currentPeriod.year'
                  @update:model-value="(tab='month',setYear($event))"
                  :timezoneOffset="lang_zone_offset-timezoneOffset"
                  :locale="locale"
                  :month="currentPeriod.month"></year-tab>
        <month-tab v-if="tab==='month'"
                   :model-value='currentPeriod.month'
                   @update:model-value="(tab='day',setMonth($event))"
                   :timezoneOffset="lang_zone_offset-timezoneOffset"
                   :locale="locale"
                   :year="currentPeriod.year"></month-tab>
      </r-card>
    </r-modal>
  </div>

</template>

<script>
import YearTab from "./year";
import MonthTab from "./month";

export default {
  name: 'calendar',
  components: {MonthTab, YearTab},
  inheritAttrs: false,
  props: {
    lang: {
      type: String
    },
    readonly: Boolean,
    showHeaders: {type: Boolean, default: true},
    isDateDisabled: {
      type: Function,
      default: () => false
    },
    year: Number,
    month: Number,
  },
  emits: ['change', 'select'],
  data() {
    return {
      tab: 'day',
      direction: undefined,
      currentPeriod: {
        month: this.month || (new Date()).getMonth(),
        year: this.year || (new Date()).getFullYear()
      }
    }
  },
  created() {
    this.$dateTime.set_format({
      'de': {
        day: 'numeric',
        numberingSystem: 'latn'
      },
      'me': {
        month: 'numeric',
        numberingSystem: 'latn'
      }
    })

    if (this.rangeLocalDate.start > this.today) {
      this.incrementMonth(-1)
    }
    if (this.rangeLocalDate.end < this.today) {
      this.incrementMonth(1)
    }
  },
  computed: {
    firstDayOfWeek() {
      return this.$helper.ifHas(this.$dateTime.langs, 0, this.locale, 'first_day')
    },
    locale() {
      return this.lang || this.$r.lang
    },
    today() {
      return new Date()
    },
    timezoneOffset() {
      return (new Date(this.currentPeriod.year, this.currentPeriod.month, 10)).getTimezoneOffset()
    },
    weekDays() {
      const first = parseInt(this.firstDayOfWeek, 10)

      return this.createRange(7).map(i => this.$d(new Date(2020, 2, first + i + 2, 0, this.timezoneOffset, 0), 'weekday', this.locale)) // 2017-02-02 is Sunday
    },
    rangeLocalDate() {
      const {year, month} = this.currentPeriod
      let firstDay = 1
      let firstmonth = month
      let firstyear = year

      let first = new Date(firstyear, firstmonth, firstDay, 0, this.lang_zone_offset - this.timezoneOffset, 0)
      let lc = parseInt(this.$d(first, 'de', this.locale))
      first = new Date(firstyear, firstmonth, firstDay - lc + 1, 0, this.lang_zone_offset - this.timezoneOffset, 0)

      firstDay = 1
      firstmonth = month + 1
      firstyear = year
      let last = new Date(firstyear, firstmonth, firstDay, 0, this.lang_zone_offset - this.timezoneOffset, 0)
      lc = parseInt(this.$d(last, 'de', this.locale))
      last = new Date(firstyear, firstmonth, firstDay - lc, 23, 59 + this.lang_zone_offset - this.timezoneOffset, 59)

      return {start: first, end: last}
    },
    weekDaysBeforeFirstDayOfTheMonth() {
      const {start} = this.rangeLocalDate
      const weekDay = start.getDay()
      return (weekDay - this.firstDayOfWeek + 7) % 7
    },
    currentPeriodDates() {
      const {start, end} = this.rangeLocalDate
      const children = []
      let firstday = start.getDate()
      let firstmonth = start.getMonth()
      let firstyear = start.getFullYear()
      let rows = []
      let day = this.weekDaysBeforeFirstDayOfTheMonth

      while (day--) {
        rows.push({
          date: 0,
          disabled: true,
          today: false
        })
      }
      let doJob = true
      while (doJob) {
        const date = new Date(firstyear, firstmonth, 1, 24, this.lang_zone_offset - this.timezoneOffset, 0)
        date.setDate(firstday)
        firstmonth = date.getMonth()
        firstyear = date.getFullYear()
        firstday = date.getDate() + 1
        if (date.getTime() > end.getTime()) {
          doJob = false
        } else {
          rows.push({
            date: date,
            disabled: this.isDateDisabled(date),
            today: this.areSameDates(date, this.today)
          })

          if (rows.length % 7 === 0) {
            children.push(rows)
            rows = []
          }
        }
      }

      day = 7 - rows.length % 7

      while (day--) {
        rows.push({
          date: 0,
          disabled: true,
          today: false
        })
      }

      if (rows.length) {
        children.push(rows)
      }

      return children
    },
    lang_zone_offset() {
      let offset = this.$helper.ifHas(this.$dateTime.langs, 0, this.locale, 'time_zone_offset')
      let dst = this.$helper.ifHas(this.$dateTime.langs, false, this.locale, 'daylight_saving_time')

      const m = this.$d(new Date(this.currentPeriod.year, this.currentPeriod.month, 10), 'me', this.locale)
      if (parseInt(m) < 7 && dst) {
        offset += 60
      }
      return offset * -1
    }
  },
  watch: {
    currentPeriod(currentPeriod, oldPeriod) {
      const currentDate = new Date(currentPeriod.year, currentPeriod.month).getTime()
      const oldDate = new Date(oldPeriod.year, oldPeriod.month).getTime()
      this.direction = currentDate !== oldDate
          ? (currentDate > oldDate ? 'next' : 'prev')
          : undefined
      setTimeout(() => {
        this.$emit('change', this.rangeLocalDate)
      }, 10)
    }
  },
  methods: {
    createRange(number) {
      const res = []
      for (let i = 0; i < number; i++) {
        res.push(i)
      }
      return res
    },
    incrementMonth(increment = 1) {
      const incrementDate = new Date(this.currentPeriod.year, this.currentPeriod.month + increment)
      this.currentPeriod = {
        month: incrementDate.getMonth(),
        year: incrementDate.getFullYear()
      }
    },
    incrementYear(increment = 1) {
      const incrementDate = new Date(this.currentPeriod.year + increment, this.currentPeriod.month)
      this.currentPeriod = {
        month: incrementDate.getMonth(),
        year: incrementDate.getFullYear()
      }
    },
    setMonth(increment) {
      const incrementDate = new Date(this.currentPeriod.year, increment)
      this.currentPeriod = {
        month: incrementDate.getMonth(),
        year: incrementDate.getFullYear()
      }
    },
    setYear(increment) {
      const incrementDate = new Date(increment, this.currentPeriod.month)
      this.currentPeriod = {
        month: incrementDate.getMonth(),
        year: incrementDate.getFullYear()
      }
    },
    selectDateItem(item) {
      if (!item.disabled) {
        this.$emit('select', item.date.toISOString())
      }
    },
    areSameDates(date1, date2) {
      if (typeof date1.getDate === 'function' && typeof date2.getDate === 'function') {
        return (date1.getDate() === date2.getDate()) &&
            (date1.getMonth() === date2.getMonth()) &&
            (date1.getFullYear() === date2.getFullYear())
      }
      return false
    }
  }
}

</script>

<style lang="scss">
@import "../../style/include";

.#{$prefix}calendar {
  position: relative;
  display: inline-block;
  font-size: 10px;
  overflow-x: auto;
  max-width: 100%;

  .cell, .headCell {
    border: 1px solid var(--color-border);
  }

  .cell {

    &.today {
      .cellContent {
        border: solid 1px var(--color-one);
      }
    }

    &.selectable:hover {
      .cellContent {
        border: solid 1px var(--color-one);
      }
    }

  }

  .cell.disabled {
    background-color: var(--color-border);
    opacity: 0.3;
  }


  .table {
    width: 100%;
    position: relative;
    z-index: 1;
    border-collapse: collapse;
    @include media-breakpoint-up('lg') {
      table-layout: fixed;
    }
  }

  .cell, .headCell {
    box-sizing: border-box;
  }

  .headCell {
    font-weight: bold;
    padding: 0 0.5em;
    text-align: center;
  }

  .headCellContent {
    font-size: 1.3em;
    color: #848484;
  }

  .cellContent {
    font-size: 1.4em;
    min-width: 100px;
    min-height: 100px;
    transition: background 0.1s, color 0.1s;
  }

  .cell.outOfRange {
    color: #c7c7c7;
  }

  .cell.selectable {
    cursor: pointer;
  }

}
</style>
