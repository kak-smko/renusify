<template>
  <div :class="`${$r.prefix}timepicker-clock`">
    <transition mode="out-in" name="scale">
      <div :key="show" ref="clock" class="clock ltr">
        <div ref="center" class="center"></div>
        <div ref="hand" :class="{ 'is-small': isSmall }" class="clock-item-hand hour"></div>
        <div
            v-for="(num, i) in nums"
            :key="i"
            ref="number"
            :class="['number' + i,{'number-disabled':disableTime(parseInt(i),show,hour,min,sec)}]"
            class="number"
            @click.prevent="set(i)"
        >
          {{ num }}
        </div>
      </div>
    </transition>
    <div class="text-meridiem ltr" v-if="!is24Hour">
      <div
          :class="{ 'meridiem-active': meridiem === 'AM' }"
          class="time-meridiem overflow-hidden"
          @click.prevent="(meridiem = 'AM'),emit()"
      >
        {{ $t('timepicker_am', 'renusify') }}
      </div>
      <div
          :class="{ 'meridiem-active': meridiem === 'PM' }"
          class="time-meridiem overflow-hidden"
          @click.prevent="(meridiem = 'PM'),emit()"
      >
        {{ $t('timepicker_pm', 'renusify') }}
      </div>
    </div>
    <div class="text-time ltr">
      <input
          v-model="hour"
          :class="{
          'time-active': show === 'hours24'||show==='hours12',
          'time-selected': hour != null
        }"
          class="time-show"
          placeholder="00"
          @input="emit"
          @update:model-value="handle_hour()"
          @click.prevent.stop="handle_hour(false)"
      />
      <div class="t-text">:</div>
      <input
          v-model="min"
          :class="{
          'time-active': show === 'mins',
          'time-selected': min != null
        }"
          class="time-show"
          placeholder="00"
          @input="emit"
          @update:model-value="handle_min()"
          @click.prevent.stop="handle_min(false)"
      />
      <div class="t-text" v-if="withSec">:</div>
      <input
          v-if="withSec"
          v-model="sec"
          :class="{
          'time-active': show === 'seconds',
          'time-selected': sec != null
        }"
          class="time-show"
          placeholder="00"
          @input="emit"
          @update:model-value="handle_sec()"
          @click.prevent.stop="handle_sec(false)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "timepicker",
  props: {
    disableTime: {
      type: Function, default: () => {
        return false
      }
    },
    withSec: Boolean,
    is24Hour: Boolean,
    modelValue: String
  },
  emits: ['update:modelValue', 'finish'],
  data() {
    return {
      show: this.is24Hour ? "hours24" : "hours12",
      hour: null,
      delay: 350,
      meridiem: "AM",
      min: null,
      sec: null,
      isSmall: false,
      hours12: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12"
      },
      hours24: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "11",
        12: "12",
        0: "0",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        20: "20",
        21: "21",
        22: "22",
        23: "23"
      },
      mins: {
        0: "0",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "5",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "10",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "15",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "20",
        21: "",
        22: "",
        23: "",
        24: "",
        25: "25",
        26: "",
        27: "",
        28: "",
        29: "",
        30: "30",
        31: "",
        32: "",
        33: "",
        34: "",
        35: "35",
        36: "",
        37: "",
        38: "",
        39: "",
        40: "40",
        41: "",
        42: "",
        43: "",
        44: "",
        45: "45",
        46: "",
        47: "",
        48: "",
        49: "",
        50: "50",
        51: "",
        52: "",
        53: "",
        54: "",
        55: "55",
        56: "",
        57: "",
        58: "",
        59: ""
      },
      seconds: {
        0: "0",
        1: "",
        2: "",
        3: "",
        4: "",
        5: "5",
        6: "",
        7: "",
        8: "",
        9: "",
        10: "10",
        11: "",
        12: "",
        13: "",
        14: "",
        15: "15",
        16: "",
        17: "",
        18: "",
        19: "",
        20: "20",
        21: "",
        22: "",
        23: "",
        24: "",
        25: "25",
        26: "",
        27: "",
        28: "",
        29: "",
        30: "30",
        31: "",
        32: "",
        33: "",
        34: "",
        35: "35",
        36: "",
        37: "",
        38: "",
        39: "",
        40: "40",
        41: "",
        42: "",
        43: "",
        44: "",
        45: "45",
        46: "",
        47: "",
        48: "",
        49: "",
        50: "50",
        51: "",
        52: "",
        53: "",
        54: "",
        55: "55",
        56: "",
        57: "",
        58: "",
        59: ""
      }
    };
  },
  mounted() {
    this.setup_hour();
    setTimeout(() => {
      this.parser(this.modelValue)
    }, 100)
  },
  computed: {
    nums() {
      return this[this.show];
    }
  },
  methods: {
    parser(txt) {
      if (!txt) {
        return
      }
      txt = txt.split(' ')
      if (txt.length === 2) {
        this.meridiem = txt[1]
      }
      txt = txt[0].split(':')
      this.hour = parseInt(txt[0])
      this.min = parseInt(txt[1])
      if (this.withSec) {
        this.sec = parseInt(txt[2])
      }
      this.handle_hour(false)
    },
    emit() {
      let hour = this.hour || 0
      let min = this.min || 0
      let sec = this.sec || 0
      if (hour < 10) {
        hour = '0' + hour;
      }
      if (min < 10) {
        min = '0' + min;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      let n = hour + ":" + min;
      if (this.withSec) {
        n += ":" + sec;
      }
      if (!this.is24Hour) {
        n += " " + this.meridiem;
      }

      this.$emit("update:modelValue", n);
      this.$emit("finish", this.min === null ? 'hour' : (this.sec === null ? 'minute' : 'second'));
    },
    handle_hour(next = true) {
      if (this.hour > (this.is24Hour ? 23 : 12)) {
        this.hour = this.is24Hour ? 23 : 12;
      }

      this.show = this.is24Hour ? "hours24" : "hours12";
      setTimeout(() => {
        this.isSmall = false
        this.setup_hour();
        this.hour && this.set(this.hour, next);
      }, this.delay);
    },
    handle_min(next = true) {
      if (this.min > 59) {
        this.min = 59;
      }
      this.show = "mins";
      this.setSmall(this.min)
      setTimeout(() => {
        this.setup_min();
        this.min && this.set(this.min, next);
      }, this.delay);
    },
    handle_sec(next = true) {
      if (this.sec > 59) {
        this.sec = 59;
      }
      this.show = "seconds";
      this.setSmall(this.sec)
      setTimeout(() => {
        this.setup_min();
        this.sec && this.set(this.sec, next);
      }, this.delay);
    },

    set(h, next = true) {
      h = parseInt(h);
      let cl = this.$refs["number"][h];
      if (this.show === "hours12") {
        cl = this.$refs["number"][h - 1];
      }

      const hand = this.$refs.hand;
      const clock = this.$refs.clock.getBoundingClientRect();

      const b = cl.getBoundingClientRect();

      let ang = this.angle(
          b.left + 10,
          b.top + 10,
          clock.width / 2 + clock.left,
          clock.top,
          clock.width / 2 + clock.left,
          clock.height / 2 + clock.top
      );
      if (
          (this.show === "hours24" || this.show === "hours12") &&
          ((h > 6 && h < 13) || (h > 18 && h <= 23))
      ) {
        ang = 180 + 180 - ang;
      } else if (h > 30) {
        ang = 180 + 180 - ang;
      }
      hand.style.transform = "rotate(" + ang + "deg)";

      if (this.show === "hours24" && (h === 0 || h >= 13)) {
        hand.style.height = "70px";
      } else {
        hand.style.height = "110px";
      }

      if (!next) {
        if (this.show === "hours24" || this.show === "hours12") {
          this.hour = h;
        } else if (this.show === "mins") {
          this.min = h;
        }
        this.emit();
        return
      }
      if (this.show === "hours24") {
        this.hour = h;
        setTimeout(() => {
          this.show = "mins";
          setTimeout(() => {
            this.setup_min();
          }, this.delay);
        }, this.delay);
      } else if (this.show === "hours12") {
        this.hour = h;
        setTimeout(() => {
          this.show = "mins";
          setTimeout(() => {
            this.setup_min();
          }, this.delay);
        }, this.delay);

      } else if (this.show === "mins") {
        this.min = h;
        this.setSmall(h)
        if (this.withSec) {
          setTimeout(() => {
            this.show = "seconds";
            this.isSmall = false;
            setTimeout(() => {
              this.setup_min();
            }, this.delay);
          }, this.delay);
        }
      } else {
        this.setSmall(h)
        this.sec = h;
      }
      this.emit();
    },
    setSmall(h) {
      if ([0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].includes(h)) {
        this.isSmall = false;
      } else {
        this.isSmall = true;
      }
    },
    angle(p1x, p1y, p2x, p2y, p3x, p3y) {
      let p0c = Math.sqrt(Math.pow(p3x - p1x, 2) + Math.pow(p3y - p1y, 2));
      let p1c = Math.sqrt(Math.pow(p3x - p2x, 2) + Math.pow(p3y - p2y, 2));
      let p0p1 = Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2));
      return (
          Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c)) *
          (180 / Math.PI)
      );
    },

    movePointAtAngle(point, angle, distance) {
      return [
        point[0] + Math.sin(angle) * distance,
        point[1] - Math.cos(angle) * distance
      ];
    },

    print_point(n, lng, nums = 12) {
      return this.movePointAtAngle([130, 130], ((Math.PI * 2) / nums) * n, lng);
    },
    setup_hour() {
      let cl = null;
      let po = null;

      if (this.is24Hour) {
        for (let i = 1; i <= 12; i++) {
          cl = this.$refs["number"][i];
          po = this.print_point(i, 110);
          cl.style.left = po[0] - 10 + "px";
          cl.style.top = po[1] - 10 + "px";
          cl.classList.add('number-show')
        }
        for (let i = 13; i <= 23; i++) {
          cl = this.$refs["number"][i];
          po = this.print_point(i, 70);
          cl.style.left = po[0] - 10 + "px";
          cl.style.top = po[1] - 10 + "px";
          cl.classList.add('number-show')
        }
        cl = this.$refs["number"][0];
        po = this.print_point(0, 70);
        cl.style.left = po[0] - 10 + "px";
        cl.style.top = po[1] - 10 + "px";
        cl.classList.add('number-show')
      } else {
        for (let i = 0; i < 12; i++) {
          cl = this.$refs["number"][i];
          po = this.print_point(i + 1, 110);
          cl.style.left = po[0] - 10 + "px";
          cl.style.top = po[1] - 10 + "px";
          cl.classList.add('number-show')
        }
      }
    },
    setup_min() {
      const clock = this.$refs.hand;
      clock.style.transform = "rotate(0)";
      clock.style.height = "110px";

      let cl = null;
      let po = null;
      for (let i = 0; i < 60; i++) {
        cl = this.$refs["number"][i];
        po = this.print_point(i, 110, 60);
        cl.style.left = po[0] - 10 + "px";
        cl.style.top = po[1] - 10 + "px";
        cl.classList.add('number-show')
      }
    }
  }
};
</script>

<style lang="scss">
@use "../../../style/variables/base";
@use "../../../style/mixins";

.#{base.$prefix}timepicker-clock {

  --color-timepicker: var(--color-one);

  * {
    transition: .15s all ease-in-out !important;
  }

  .text-time {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 40px;
    width: 260px;
    height: 60px;
    color: #818181;
    font-size: 30px;
  }

  .text-time > .time-show {
    background-color: #e0e0e0;
    width: 60px;
    text-align: center;
    border-radius: 10px;
    padding-top: 10px;
  }

  .text-meridiem {
    display: flex;
    justify-content: space-between;
    width: 260px;
    height: 40px;
    color: #818181;
    font-size: 16px;
    margin-top: -20px;
    padding: 20px;
  }

  .meridiem-active {
    background-color: var(--color-three-container);
    color: var(--color-on-three-container);
  }

  .text-meridiem > .time-meridiem {
    width: 40px;
    height: 40px;
    text-align: center;
    border-radius: 10px;
    padding: 12px 5px 5px 5px;
    border: 1px solid #e0e0e0;
  }

  .text-time > .t-text {
    text-align: center;
    padding: 20px 5px 0 5px;
  }

  .time-selected {
    color: #141414;
  }

  .clock {
    width: 260px;
    height: 260px;
    background: #e0e0e0;
    border-radius: 50%;
    position: relative;
  }

  .clock > .number:hover {
    cursor: pointer;
  }

  .clock > .number {
    position: absolute;
    width: 20px;
    height: 20px;
    font-size: 15px;
    font-weight: 600;
    transform-origin: left top;
    text-align: center;
    z-index: 20;
    white-space: nowrap;
    opacity: 0;
  }

  .number-show {
    opacity: 1 !important;
  }

  .clock > .clock-item-hand {
    width: 2px;
    height: 110px;
    bottom: 130px;
    left: 129px;
    position: absolute;
    z-index: 10;
    background-color: var(--color-timepicker);
    border: 1px solid var(--color-timepicker);
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform-origin: bottom;

    &:after {
      content: "";
      position: absolute;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      color: var(--color-timepicker);
      background-color: var(--color-timepicker);
      border: 2px solid;
      transform: translate(-50%, -50%);
    }
  }

  .is-small:after {
    width: 12px !important;
    height: 12px !important;
    border-radius: 50% !important;
    border: 2px solid;
    background-color: unset !important;
    transform: translate(-50%, -90%) !important;
  }

  .clock > .clock-item {
    position: absolute;
    bottom: 50%;
    left: 50%;
    background-color: black;
    border: 1px solid white;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform-origin: bottom;
    z-index: 10;
  }

  .clock .center {
    position: absolute;
    background-color: var(--color-timepicker);
    z-index: 11;
    width: 10px;
    height: 10px;
    top: 125px;
    left: 125px;
    border-radius: 50%;
  }

  .time-active {
    color: var(--color-timepicker);
  }

  .clock > .number:hover {
    color: white;
  }

  .time-meridiem:hover {
    cursor: pointer;
  }

  .clock > .clock-item.hour {
    width: 4px;
    height: 36%;
    background-color: var(--color-timepicker);
  }


  .number-disabled {
    @include mixins.disable-states()
  }
}
</style>
