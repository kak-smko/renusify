<template>
    <r-input v-bind="$attrs" :readonly="readonly" :model-value="modelValue" @click.prevent="show=true">
        <input
                :value="modelValue?$d(modelValueDate,withTime?'long':'medium',locale):null"
        />
    </r-input>
    <r-modal :model-value="show" @update:model-value="close()" :closebtn="false" closable class="text-center">
        <div v-if="!showTime" :class="`${$r.prefix}date-picker`">
            <div class="sheet">
                <r-container>
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
                         selectable: !readonly && !item.disabled,
                         selected: item.selected,
                         disabled: item.disabled,
                         today: item.today
                                    }"
                                    :key="item.date"
                                    @click="item.date!==0 &&!readonly&& selectDateItem(item)"
                            >
                                <div
                                        class="cellContent d-flex h-center v-center"
                                        v-if="item.date!==0"
                                >
                                    {{ $d(item.date,'day',locale) }}
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
                <r-btn class="color-success mx-5" @click="selectTime">{{$t('ok','renusify')}}</r-btn>
              <r-btn class="color-error mx-5" @click="close">{{ $t('cancel', 'renusify') }}</r-btn>
            </div>

        </div>

    </r-modal>

</template>

<script>
import Timepicker from "../timepicker/timepicker";
import YearTab from "./year";
import MonthTab from "./month";

export default {
  name: 'datePicker',
  components: {MonthTab, YearTab, Timepicker},
  inheritAttrs: false,
  props: {
    modelValue: {
      type: String
    },
    lang: {
      type: String
    },
    readonly: Boolean,
    withTime: Boolean,
            isDateDisabled: {
                type: Function,
                default: () => false
            }
  },
  data() {
    return {
      tab: 'day',
      show: false,
      showTime: false,
      time: null,
      date: null,
      direction: undefined,
      currentPeriod: {
        month: (new Date()).getMonth() + 1,
        year: (new Date()).getFullYear()
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
    this.currentPeriod = {
      month: this.modelValueDate.getMonth() + 1,
      year: this.modelValueDate.getFullYear()
    }
    if (this.rangeLocalDate.start > this.modelValueDate) {
      this.incrementMonth(-1)
    }
    if (this.rangeLocalDate.end < this.modelValueDate) {
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

                return this.createRange(7).map(i => this.$d(new Date(2020, 2, first + i + 2, 0, this.timezoneOffset, 0), 'narrow', this.locale)) // 2017-02-02 is Sunday
            },
            modelValueDate() {
              if (!this.modelValue || !new Date(this.modelValue)) {
                return new Date()
              }
              return new Date(this.modelValue)
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
                return (weekDay - parseInt(this.firstDayOfWeek) + 7) % 7
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
                        selected: false,
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
                            selected: this.areSameDates(date, this.modelValueDate),
                            today: this.areSameDates(date, this.today)
                        })

                        if (rows.length % 7 === 0) {
                            children.push(rows)
                            rows = []
                        }
                    }
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
            modelValueDate(newVal) {
              this.currentPeriod = {
                month: newVal.getMonth() + 1,
                year: newVal.getFullYear()
              }
              if (this.rangeLocalDate.start > this.modelValueDate) {
                this.incrementMonth(-1)
              }
              if (this.rangeLocalDate.end < this.modelValueDate) {
                this.incrementMonth(1)
              }
            },
            currentPeriod(currentPeriod, oldPeriod) {
                const currentDate = new Date(currentPeriod.year, currentPeriod.month).getTime()
                const oldDate = new Date(oldPeriod.year, oldPeriod.month).getTime()
                this.direction = currentDate !== oldDate
                    ? (currentDate > oldDate ? 'next' : 'prev')
                    : undefined
            }
        },
        methods: {
            close() {
                this.show = false
              this.showTime = false
            },
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
          selectTime() {
            const times = (this.time ? this.time : '00:00:00').split(':')
            let d = (new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(),
                this.date.getHours() + parseInt(times[0]),
                this.date.getMinutes() + parseInt(times[1]),
                this.date.getSeconds() + parseInt(times[2])))

            this.$emit('update:modelValue', d.toISOString())
            this.close()
          },
          selectDateItem(item) {
            if (!item.disabled) {
              if (this.withTime) {
                this.date = item.date
                this.showTime = true
              } else {
                this.$emit('update:modelValue', item.date.toISOString())
                this.close()
                    }
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
    @import "../../../style/include";

    .#{$prefix}date-picker {
        position: relative;
        display: inline-block;
        font-size: 10px;
        color: #303030;

        @include dark {
            $Color: var(--color-one-dark);
            .cell {
                &.today {
                    color: $Color;

                    .cellContent {
                        border: solid 1px $Color;
                    }
                }

                &.selected {
                    .cellContent {
                        color: #fff;
                        background: $Color;

                    }
                }

                &.selectable:hover {
                    .cellContent {

                        color: #fff;
                        background: $Color;

                    }
                }

            }
        }

        @include light {
            $Color: var(--color-one-light);
            .cell {
                &.today {
                    color: $Color;

                    .cellContent {
                        border: solid 1px $Color;
                    }
                }

                &.selected {
                    .cellContent {

                        color: #fff;
                        background: $Color;

                    }
                }

                &.selectable:hover {
                    .cellContent {

                        color: #fff;
                        background: $Color;

                    }
                }

            }
        }

        .table {

            width: 100%;
            table-layout: fixed;
            position: relative;
            z-index: 5;

        }

        .cell, .headCell {

            text-align: center;
            box-sizing: border-box;

        }

        .cell {

            padding: 0.5em 0;

        }

        .headCell {

            padding: 0.3em 0.5em 1.8em;

        }

        .headCellContent {

            font-size: 1.3em;
            font-weight: normal;
            color: #848484;

        }

        .cellContent {
            padding: 5px;
            font-size: 1.4em;
            margin: 0 auto;
            width: 30px;
            height: 30px;
            text-align: center;
            border-radius: 100%;
            transition: background 0.1s, color 0.1s;

        }

        .cell.outOfRange {
            color: #c7c7c7;
        }

        .cell.selectable {

            cursor: pointer;

        }

        .cell.disabled {

            opacity: 0.5;

        }

    }
</style>
