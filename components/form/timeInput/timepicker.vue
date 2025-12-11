<template>
  <div :class="`${$r.prefix}timepicker-clock`">
    <transition mode="out-in" name="scale">
      <div :key="show" ref="clockRef" class="clock ltr">
        <div ref="centerRef" class="center"></div>
        <div ref="handRef" :class="{ 'is-small': isSmall }" class="clock-item-hand hour"></div>
        <div
            v-for="(num, i) in nums"
            :key="i"
            ref="numbersRef"
            :class="['number' + i,{'number-disabled':disableTime(parseInt(i),show,hour,min,sec)}]"
            class="number"
            @click.prevent="selectNumber(i)"
        >
          {{ num }}
        </div>
      </div>
    </transition>
    <div class="text-meridiem ltr" v-if="!is24Hour">
      <div
          :class="{ 'meridiem-active': meridiem === 'AM' }"
          class="time-meridiem"
          @click.prevent="(meridiem = 'AM'),emitTime()"
      >
        AM
      </div>
      <div
          :class="{ 'meridiem-active': meridiem === 'PM' }"
          class="time-meridiem"
          @click.prevent="(meridiem = 'PM'),emitTime()"
      >
        PM
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
          @input="emitTime()"
          @update:model-value="handleHour()"
          @click.prevent.stop="handleHour(false)"
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
          @input="emitTime()"
          @update:model-value="handleMin()"
          @click.prevent.stop="handleMin(false)"
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
          @input="emitTime()"
          @update:model-value="handleSec()"
          @click.prevent.stop="handleSec(false)"
      />
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted, nextTick} from 'vue'

const props = defineProps({
  disableTime: {
    type: Function,
    default: () => false
  },
  withSec: Boolean,
  is24Hour: Boolean,
  modelValue: String
})

const emit = defineEmits(['update:modelValue', 'finish'])

const show = ref(props.is24Hour ? 'hours24' : 'hours12')
const hour = ref(null)
const min = ref(null)
const sec = ref(null)
const meridiem = ref('AM')
const isSmall = ref(false)

const handRef = ref(null)
const clockRef = ref(null)
const numbersRef = ref([])

const delay = 350

const hours12 = ref({
  1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6',
  7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12'
})

const hours24 = ref({
  1: '1', 2: '2', 3: '3', 4: '4', 5: '5', 6: '6',
  7: '7', 8: '8', 9: '9', 10: '10', 11: '11', 12: '12',
  0: '0', 13: '13', 14: '14', 15: '15', 16: '16', 17: '17',
  18: '18', 19: '19', 20: '20', 21: '21', 22: '22', 23: '23'
})

const mins = ref({
  0: '0', 5: '5', 10: '10', 15: '15', 20: '20', 25: '25',
  30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55',
  ...Array.from({length: 60}, (_, i) => i)
      .filter(i => ![0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].includes(i))
      .reduce((acc, i) => ({...acc, [i]: ''}), {})
})

const seconds = ref({
  0: '0', 5: '5', 10: '10', 15: '15', 20: '20', 25: '25',
  30: '30', 35: '35', 40: '40', 45: '45', 50: '50', 55: '55',
  ...Array.from({length: 60}, (_, i) => i)
      .filter(i => ![0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].includes(i))
      .reduce((acc, i) => ({...acc, [i]: ''}), {})
})

const nums = computed(() => {
  switch (show.value) {
    case 'hours12':
      return hours12.value
    case 'hours24':
      return hours24.value
    case 'mins':
      return mins.value
    case 'seconds':
      return seconds.value
    default:
      return {}
  }
})

const parser = (txt) => {
  if (!txt) return

  const parts = txt.split(' ')
  let timeStr = parts[0]

  if (parts.length === 2) {
    meridiem.value = parts[1]
  }

  const timeParts = timeStr.split(':')
  hour.value = parseInt(timeParts[0]) || null
  min.value = parseInt(timeParts[1]) || null

  if (props.withSec && timeParts[2]) {
    sec.value = parseInt(timeParts[2]) || null
  }

  handleHour(false)
}

const emitTime = () => {
  const h = hour.value || 0
  const m = min.value || 0
  const s = sec.value || 0

  const formattedHour = h < 10 ? '0' + h : h.toString()
  const formattedMin = m < 10 ? '0' + m : m.toString()
  const formattedSec = s < 10 ? '0' + s : s.toString()

  let timeStr = formattedHour + ':' + formattedMin
  if (props.withSec) {
    timeStr += ':' + formattedSec
  }

  if (!props.is24Hour) {
    timeStr += ' ' + meridiem.value
  }

  emit('update:modelValue', timeStr)

  let finishedPart = 'hour'
  if (min.value !== null) {
    finishedPart = props.withSec && sec.value === null ? 'minute' : 'second'
  }
  emit('finish', finishedPart)
}

const handleHour = (next = true) => {
  if (hour.value > (props.is24Hour ? 23 : 12)) {
    hour.value = props.is24Hour ? 23 : 12
  }

  show.value = props.is24Hour ? 'hours24' : 'hours12'

  setTimeout(() => {
    isSmall.value = false
    setupHour()
    if (hour.value !== null) {
      setNumber(hour.value, next)
    }
  }, delay)
}

const handleMin = (next = true) => {
  if (min.value > 59) {
    min.value = 59
  }

  show.value = 'mins'
  setSmall(min.value)

  setTimeout(() => {
    setupMin()
    if (min.value !== null) {
      setNumber(min.value, next)
    }
  }, delay)
}

const handleSec = (next = true) => {
  if (sec.value > 59) {
    sec.value = 59
  }

  show.value = 'seconds'
  setSmall(sec.value)

  setTimeout(() => {
    setupMin()
    if (sec.value !== null) {
      setNumber(sec.value, next)
    }
  }, delay)
}

const setNumber = (value, next = true) => {
  const numValue = parseInt(value)
  let element = null

  if (show.value === 'hours12') {
    element = numbersRef.value[numValue - 1]
  } else {
    element = numbersRef.value[numValue]
  }

  if (!element || !handRef.value || !clockRef.value) return

  const clockRect = clockRef.value.getBoundingClientRect()
  const elementRect = element.getBoundingClientRect()

  const angle = calculateAngle(
      elementRect.left + 10,
      elementRect.top + 10,
      clockRect.width / 2 + clockRect.left,
      clockRect.top,
      clockRect.width / 2 + clockRect.left,
      clockRect.height / 2 + clockRect.top
  )

  let finalAngle = angle
  if ((show.value === 'hours24' || show.value === 'hours12') &&
      ((numValue > 6 && numValue < 13) || (numValue > 18 && numValue <= 23))) {
    finalAngle = 180 + 180 - angle
  } else if (numValue > 30) {
    finalAngle = 180 + 180 - angle
  }

  handRef.value.style.transform = `rotate(${finalAngle}deg)`

  if (show.value === 'hours24' && (numValue === 0 || numValue >= 13)) {
    handRef.value.style.height = '70px'
  } else {
    handRef.value.style.height = '110px'
  }

  if (!next) {
    // Just update the value without proceeding to next step
    if (show.value === 'hours24' || show.value === 'hours12') {
      hour.value = numValue
    } else if (show.value === 'mins') {
      min.value = numValue
    } else {
      sec.value = numValue
    }
    emitTime()
    return
  }

  switch (show.value) {
    case 'hours24':
    case 'hours12':
      hour.value = numValue
      setTimeout(() => {
        show.value = 'mins'
        setTimeout(() => {
          setupMin()
        }, delay)
      }, delay)
      break

    case 'mins':
      min.value = numValue
      setSmall(numValue)
      if (props.withSec) {
        setTimeout(() => {
          show.value = 'seconds'
          isSmall.value = false
          setTimeout(() => {
            setupMin()
          }, delay)
        }, delay)
      }
      break

    case 'seconds':
      setSmall(numValue)
      sec.value = numValue
      break
  }

  emitTime()
}

const setSmall = (value) => {
  const largeValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]
  isSmall.value = !largeValues.includes(parseInt(value))
}

const calculateAngle = (p1x, p1y, p2x, p2y, p3x, p3y) => {
  const p0c = Math.sqrt(Math.pow(p3x - p1x, 2) + Math.pow(p3y - p1y, 2))
  const p1c = Math.sqrt(Math.pow(p3x - p2x, 2) + Math.pow(p3y - p2y, 2))
  const p0p1 = Math.sqrt(Math.pow(p2x - p1x, 2) + Math.pow(p2y - p1y, 2))
  return Math.acos((p1c * p1c + p0c * p0c - p0p1 * p0p1) / (2 * p1c * p0c)) * (180 / Math.PI)
}

const movePointAtAngle = (point, angle, distance) => {
  return [
    point[0] + Math.sin(angle) * distance,
    point[1] - Math.cos(angle) * distance
  ]
}

const calculatePointPosition = (n, length, totalNumbers = 12) => {
  return movePointAtAngle([130, 130], ((Math.PI * 2) / totalNumbers) * n, length)
}

const setupHour = () => {
  if (!numbersRef.value.length) return

  let element = null
  let position = null

  if (props.is24Hour) {
    for (let i = 1; i <= 12; i++) {
      element = numbersRef.value[i]
      if (!element) continue

      position = calculatePointPosition(i, 110)
      element.style.left = position[0] - 10 + 'px'
      element.style.top = position[1] - 10 + 'px'
      element.classList.add('number-show')
    }

    for (let i = 13; i <= 23; i++) {
      element = numbersRef.value[i]
      if (!element) continue

      position = calculatePointPosition(i, 70)
      element.style.left = position[0] - 10 + 'px'
      element.style.top = position[1] - 10 + 'px'
      element.classList.add('number-show')
    }

    element = numbersRef.value[0]
    if (element) {
      position = calculatePointPosition(0, 70)
      element.style.left = position[0] - 10 + 'px'
      element.style.top = position[1] - 10 + 'px'
      element.classList.add('number-show')
    }
  } else {
    for (let i = 0; i < 12; i++) {
      element = numbersRef.value[i]
      if (!element) continue

      position = calculatePointPosition(i + 1, 110)
      element.style.left = position[0] - 10 + 'px'
      element.style.top = position[1] - 10 + 'px'
      element.classList.add('number-show')
    }
  }
}

const setupMin = () => {
  if (!handRef.value) return

  handRef.value.style.transform = 'rotate(0)'
  handRef.value.style.height = '110px'

  let element = null
  let position = null

  for (let i = 0; i < 60; i++) {
    element = numbersRef.value[i]
    if (!element) continue

    position = calculatePointPosition(i, 110, 60)
    element.style.left = position[0] - 10 + 'px'
    element.style.top = position[1] - 10 + 'px'
    element.classList.add('number-show')
  }
}


const selectNumber = (value) => {
  if (props.disableTime && props.disableTime(value, show.value, hour.value, min.value)) {
    return
  }

  setNumber(value, true)
}


onMounted(() => {
  nextTick(() => {
    setupHour()

    setTimeout(() => {
      if (props.modelValue) {
        parser(props.modelValue)
      }
    }, 100)
  })
})
</script>

<style lang="scss">
@use "../../../style" as *;

.#{$prefix}timepicker-clock {

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
    background-color: var(--color-one-container);
    color: var(--color-on-one-container);
  }

  .text-meridiem > .time-meridiem {
    width: 40px;
    height: 40px;
    justify-content: center;
    border-radius: 10px;
    padding: 12px 5px 5px 5px;
    border: 1px solid var(--color-border-low);
    display: flex;
    align-items: center;
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
    @include disable-states()
  }
}
</style>
