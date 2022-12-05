<template>
  <r-card v-if="!autoSend" class="overflow-auto">
    <r-container>
      <r-message :items="errors" type="error"></r-message>
      <h1 class="title">{{ title }}</h1>
      <r-form ref="form" v-model="valid" @submit.prevent="save">
        <r-row>
          <template :key="key" v-for="(item,key) in options">
            <r-col class="col-12" v-if="item['formInput']!==false">
              <component
                  :is="'r-'+item['type']"
                  :label="$t(key,'renusify')"
                  v-model="editedItem[key]"
                  v-bind="getAttr(options[key])"
              ></component>
            </r-col>
          </template>
        </r-row>
        <r-row class="h-end my-12">
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
        </r-row>
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
    }
  },
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
        this.$emit('update:model-value', n)
      }
    }
  },
  methods: {
    getAttr(data) {
      let res = {}
      for (let i in data) {
        if (this.$helper.hasKey(data, i) && !['formInput', 'sortable', 'type', 'tableShow', 'priority'].includes(i)) {
          res[i] = data[i]
        }
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
      this.$axios[this.method](this.url, this.editedItem)
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
