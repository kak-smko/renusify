<template>
  <div v-if="!autoSend" :class="$r.prefix+'form-creator'">
    <r-container>
      <h1 v-if="title" class="title-1">{{ title }}</h1>
      <r-form ref="form" v-model="valid" @submit.prevent="save">
        <r-row>
          <template :key="key" v-for="(item,key) in options">
            <r-col v-if="item['formInput']!==false&&iff(options[key])"
                   :class="options[key]['class']?options[key]['class']:'col-12'">
              <component
                  :is="item['type']"
                  :label="$t(key)"
                  v-model="editedItem[key]"
                  v-bind="getAttr(options[key])"
              ></component>
            </r-col>
          </template>
        </r-row>
        <template v-for="(item,i) in errors"
                  :key="i">
          <div class="mb-2 br-md color-error d-flex">
            <span>{{ $t(i) }}:</span>
            <span class="flex-grow-1">
            <div v-for="(er,k) in item" :key="k+'-'+i">
                  {{ $t(er) }}
            </div>
          </span>
          </div>
        </template>
        <div class="text-end my-12">
          <r-btn @click.prevent="close"
                 class="color-error-text mx-1"
                 outlined
                 rounded>{{ $t('cancel', 'renusify') }}
          </r-btn>
          <r-btn
              :loading="loading"
              @click.prevent="save"
              class="color-success"
              rounded>
            {{ $t('send', 'renusify') }}
          </r-btn>
        </div>
      </r-form>
    </r-container>
  </div>
</template>

<script setup>
import {ref, watch, onMounted, inject} from 'vue'

/**
 * @example // Advanced usage with mixed fields
 * <template>
 * <r-form-creator :url="url"
 *    :title="title"
 *    :auto-Send="autoSend"
 *    :redirect="redirect"
 *    :method="method"
 *    :options="options"
 *    v-model="modelValue"
 *    :headers="headers"
 *    @update:model-Value="log(`update:modelValue`,$event)"
 *    @ok="log(`ok`,$event)" ></r-form-creator>
 * </template>
 * <script>
 * import { ref } from 'vue'
 * const modelValue=ref(modelValue)
 * const url=ref(null)
 * const title=ref("Add form")
 * const autoSend=ref(false)
 * const method=ref("post")
 * const headers=ref(null)
 * const options=ref({
 *       name:{"type": "r-text-input","props":{"rules": ["required"]}},
 *       family:{"type": "r-text-input","props":{"rules": ["required"]}},
 *       age:{"type": "r-number-input",$if:[["$name","!=","$family"]],"props":{"rules": ["required","min:7","max:70"]}},
 *       phone:{"type": "r-mask-input",$if:[["$age",">",7],["$age","<=",60]],"props":{"rules": ["required"],"mask": "0NNN NNN NNNN"}},
 *       mix:{"type": "r-text-input","$bind":[["label","name"]]},
 *      })
 * const log=(name,e)=>{
 *   console.log(name,e)
 * }
 * <//script>
 * */

const props = defineProps({
  /**
   * API endpoint URL for form submission
   * @type {String}
   * @required
   */
  url: {
    required: true,
    type: String
  },
  /**
   * Form title displayed in the UI
   * @type {String}
   * @default 'Add form'
   */
  title: {
    default: 'Add form',
    type: String
  },
  /**
   * Whether to automatically submit the form on mount
   * @type {Boolean}
   * @default false
   */
  autoSend: Boolean,
  /**
   * URL to redirect after successful submission
   * @type {String}
   */
  redirect: {
    type: String
  },
  /**
   * HTTP method for form submission
   * @type {String}
   * @default 'post'
   * @values 'post', 'put', 'patch', 'delete'
   */
  method: {
    default: 'post',
    type: String
  },
  /**
   * Form field configuration options
   * @type {Object|Array}
   * @description Defines form fields, validation rules, and conditional logic
   *
   * @example
   * options:  {
   *       name:{"type": "r-text-input","props":{"rules": ["required"]}},
   *       family:{"type": "r-text-input","props":{"rules": ["required"]}},
   *       age:{"type": "r-number-input",$if:[["$name","!=","$family"]],"props":{"rules": ["required","min:7","max:70"]}},
   *       phone:{"type": "r-mask-input",$if:[["$age",">",7],["$age","<=",60]],"props":{"rules": ["required"],"mask": "0NNN NNN NNNN"}},
   *       mix:{"type": "r-text-input","$bind":[["label","name"]]},
   *      }
   */
  options: {
    required: false,
    type: [Object, Array]
  },
  /**
   * Form data model value
   * @model
   * @type {Object}
   * @default () => ({})
   */
  modelValue: {
    default: () => ({}),
    type: Object
  },
  /**
   * Custom HTTP headers for the request
   * @type {Object}
   */
  headers: Object
})

const emit = defineEmits([
  /**
   * Emitted when form data changes
   * @event update:modelValue
   * @param {Object} data - Updated form data
   */
  'update:modelValue',

  /**
   * Emitted when form submission is successful
   * @event ok
   * @param {Boolean} success - Always true
   */
  'ok'
])

// Dependency injection
const {$helper, $t, $r} = inject('renusify')
const $axios = inject('axios')

/**
 * Loading state for form submission
 * @type {Ref<Boolean>}
 */
const loading = ref(false)

/**
 * Form validation state
 * @type {Ref<Boolean>}
 */
const valid = ref(false)

/**
 * Server-side validation errors
 * @type {Ref<Array>}
 */
const errors = ref([])

/**
 * Whether to show error alerts
 * @type {Ref<Boolean>}
 */
const alertShow = ref(false)

/**
 * Reference to the form component instance
 * @type {Ref<ComponentInstance|null>}
 */
const form = ref(null)

/**
 * Local copy of form data for editing
 * @type {Ref<Object>}
 */
const editedItem = ref({...props.modelValue})

const iff = (data) => {
  const get = (item, key) => {
    if (key.toString().startsWith('$')) {
      return $helper.ifHas(item, null, ...key.substring(1).split('.'))
    }
    return key
  }

  if ('$if' in data) {
    for (let i = 0; i < data['$if'].length; i++) {
      const item = data['$if'][i]
      let can = true
      const one = get(editedItem.value, item[0])
      const op = item[1]
      const two = get(editedItem.value, item[2])

      switch (op) {
        case '===':
        case '==':
          can = one === two
          break
        case '>':
          can = one > two
          break
        case '>=':
          can = one >= two
          break
        case '<':
          can = one < two
          break
        case '<=':
          can = one <= two
          break
        case '!=':
          can = one !== two
          break
        case 'in':
          can = two && typeof two === 'object' ? two.includes(one) : false
          break
        default:
          can = false
          console.error(`operator '${op}' is not defined.(form creator)`)
      }

      if (can === false) {
        return false
      }
    }
  }
  return true
}

const getAttr = (data) => {
  let res = data['props'] ? data['props'] : {}
  if (data['$bind']) {
    data['$bind'].forEach((item) => {
      res[item[0]] = editedItem.value[item[1]]
    })
  }
  return res
}

/**
 * Handles form submission success
 * @method close
 * @fires RFormCreator#ok
 * @private
 */
const close = () => {
  emit('ok', true)
  alertShow.value = false
  errors.value = []
  loading.value = false
  if (form.value) {
    form.value.reset()
  }
}

/**
 * Submits the form data to the server
 * @method save
 * @async
 * @returns {Promise<void>}
 * @private
 */
const save = () => {
  // Validate form if not valid
  if (!valid.value && form.value) {
    form.value.validate()
    const e = form.value.errorBag
    for (let id in e) {
      if (e[id]) {
        // Scroll to first error field
        document.getElementById(id)?.scrollIntoView({behavior: 'smooth'})
        return
      }
    }
    return
  }

  loading.value = true

  $axios[props.method](props.url, editedItem.value, {headers: props.headers})
      .then(() => {
        close()
      })
      .catch((error) => {
        if (props.autoSend) {
          close()
        } else {
          if (error.response?.data?.errors) {
            errors.value = error.response.data.errors
            alertShow.value = true
          }
          loading.value = false
        }
      })
}

// Watch for changes in modelValue prop
watch(() => props.modelValue, (newValue) => {
  editedItem.value = {...newValue}
}, {deep: true})

// Watch for changes in editedItem and emit updates
watch(editedItem, (newValue) => {
  emit('update:modelValue', {...newValue})
}, {deep: true})

// Auto-submit on mount if autoSend is enabled
onMounted(() => {
  if (props.autoSend) {
    save()
  }
})
</script>

<style lang="scss">
@use "../../style" as *;

.#{$prefix}form-creator {
  overflow: auto;
}
</style>