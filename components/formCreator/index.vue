<template>
  <r-card v-if="!autoSend" :class="$r.prefix+'form-creator'" class="overflow-auto">
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
        <r-message :items="errors" type="error"></r-message>
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
  </r-card>
</template>

<script>
export default {
  name: 'r-form-creator',
  props: {
    url: {
      required: true,
      type: String
    },
    title: {
      default: 'Add form',
      type: String
    },
    autoSend: Boolean,
    redirect: {
      type: String
    },
    method: {
      default: 'post',
      type: String
    },
    options: {
      required: false,
      type: [Object, Array]
    },
    modelValue: {
      default: function () {
        return {}
      },
      type: Object
    },
    headers: Object
  },
  emits:['update:modelValue','ok'],
  data() {
    return {
      loading: false,
      valid: false,
      editedItem: this.modelValue,
      errors: [],
      alertShow: false,
      inputs: {}
    }
  },
  created() {
    if (this.autoSend) {
      this.save()
    }
  },
  watch: {
    modelValue: {
      deep: true,
      handler: function (n) {
        this.editedItem = n
      }
    },
    editedItem: {
      deep: true,
      handler: function (n) {
        this.$emit('update:modelValue', n)
      }
    }
  },
  methods: {
    iff(data) {
      const that = this

      function get(item, key) {
        if (key.toString().startsWith('$')) {
          return that.$helper.ifHas(item, null, ...key.substring(1).split('.'))
        }
        return key
      }

      if ('$if' in data) {
        for (let i = 0; i < data['$if'].length; i++) {
          const item = data['$if'][i]
          let can = true
          const one = get(this.editedItem, item[0])
          const op = item[1]
          const two = get(this.editedItem, item[2])
          if (op === '===' || op === '==') {
            can = one === two
          } else if (op === '>') {
            can = one > two
          } else if (op === '>=') {
            can = one >= two
          } else if (op === '<') {
            can = one < two
          } else if (op === '<=') {
            can = one <= two
          } else if (op === '!=') {
            can = one !== two
          } else if (op === 'in') {
            if (two && typeof two === 'object') {
              can = two.includes(one)
            } else {
              can = false
            }
          } else {
            can = false
            console.error(`operator '${op}' is not defined.(form creator)`)
          }
          if (can === false) {
            return false
          }
        }
      }
      return true
    },
    getAttr(data) {
      let res = data['props'] ? data['props'] : {}
      if (data['$bind']) {
        data['$bind'].forEach((item) => {
          res[item[0]] = this.editedItem[item[1]]
        })
      }
      return res
    },
    close() {
      this.$emit('ok', true)
      this.alertShow = false
      this.errors = []
      setTimeout(() => {
        this.editedItem = Object.assign({}, {})
        this.loading = false
      }, 300)
    },
    save() {
      if (!this.valid && this.$refs.form) {
        this.$refs.form.validate()
        const e = this.$refs.form.errorBag
        for (let id in e) {
          if (e[id]) {
            document.getElementById(id)?.scrollIntoView({behavior: 'smooth'})
            return;
          }
        }
        return
      }
      this.loading = true
      this.$axios[this.method](this.url, this.editedItem, {headers: this.headers})
          .then(() => {
            this.close()
          }, (error) => {
            if (this.autoSend) {
              this.close()
            } else {
              if (error.response.data.errors) {
                this.errors = error.response.data.errors
                this.alertShow = true
              }
              this.loading = false
            }

          })
    }
  }
}
</script>