<template>
  <r-input
      :class="[`${$r.prefix}text-editor container-fluid`]"
      :model-value="is_object?modelValue.text:modelValue"
      label-active
  >
    <template v-slot="{uid}">
      <r-container>
        <r-row class="editor-header h-center">
          <r-col class="col-auto">
            <r-btn-group :items="items_dir" @update:modelValue="handle_dir"></r-btn-group>
          </r-col>
          <r-col class="col-auto">
            <r-btn-group :items="menu" exact is-select @open="handleOpen" @update:modelValue="addCss">
              <template v-slot:list="{item}">
                <div :class="'color-white-text'===item['value']?'color-black '+item['value']:item['value']"
                     class="list-title"
                >{{ item['text'] }}
                </div>
              </template>
            </r-btn-group>
          </r-col>
          <r-col class="col-auto">
            <r-btn-group :items="items_format" exact
                         @update:modelValue="format($event)"></r-btn-group>
          </r-col>

          <r-col class="col-auto">
            <r-btn-group :items="items_handle"
                         @update:modelValue="handle($event)"></r-btn-group>
          </r-col>
          <r-col class="col-auto">
            <r-btn-group :items="items_undo" @update:modelValue="format($event)"></r-btn-group>
          </r-col>
          <r-col class="col-auto">
            <r-btn icon text @click.prevent="$helper.copy(content(),$t('editor_content_copy','renusify'))">
              <r-icon v-html="$r.icons.copy"></r-icon>
            </r-btn>
          </r-col>
        </r-row>
        <r-row>
          <r-col v-if="selectElm&&!selectElm.classList.contains('editor-content')" class="col-12">
            <r-select-input :label="$t('class','renusify')" :model-value="[...selectElm.classList]" class="class-select"
                            justValue
                            multiple
                            tags
                            @update:model-value="addClass"></r-select-input>
          </r-col>
          <r-col class="col-12 ltr">
                <span v-for="(item,i) in currentPath" :key="i" class="cursor-pointer" @click.prevent="borderd(item)">
                    <span :class="{'color-one-text':selectElm===item}">{{ item.nodeName }} > </span>
                </span>
          </r-col>
          <r-col class="col-12">
            <div :id="uid"
                 ref="editorContentRef"
                 class="editor-content"
                 contenteditable="true"
                 @input="updateText()"
                 @keyup="bordered"
                 v-html="text" @click.prevent="bordered">
            </div>
          </r-col>
          <r-col v-if="files&&files.length>0" class="col-12">
            <div v-for="(img,i) in files" :key="i"
                 class="ma-1 img-holder">
              <r-btn class="color-error-text" icon size="xs" @click.prevent="deleteImage(img,i)">
                <r-icon v-html="$r.icons.delete"></r-icon>
              </r-btn>
              <r-img
                  :src="img"
                  alt="img"
                  height="100"></r-img>
            </div>
          </r-col>
        </r-row>
        <r-modal v-model="show"
                 no-closable no-close-btn>
          <r-form v-model="valid1">
            <r-container>
              <r-row>
                <r-col class="col-12 ltr">
                  <r-text-input v-model="link"
                                :label="$t('link','renusify')"
                                :rules="['required']"></r-text-input>
                </r-col>
                <r-col class="col-12">
                  <r-switch-input v-model="target"
                                  :label="$t('open_new_tab','renusify')"></r-switch-input>
                </r-col>
              </r-row>
              <r-row class="h-end">
                <r-col class="col-auto">
                  <r-btn class="color-error-text"
                         outlined
                         @click.prevent="show=false">{{ $t('cancel', 'renusify') }}
                  </r-btn>
                </r-col>
                <r-col class="col-auto">
                  <r-btn :disabled="!valid1"
                         class="color-success-text"
                         outlined
                         @click.prevent="handleForm()">{{ $t('send', 'renusify') }}
                  </r-btn>
                </r-col>
              </r-row>
            </r-container>
          </r-form>
        </r-modal>
        <r-modal v-model="showImg"
                 no-closable no-close-btn>
          <r-form v-model="valid2">
            <r-container>
              <r-file-input v-model="image"
                            :headers="headers"
                            :label="$t('image','renusify')"
                            :rules="['required']"
                            :size="1"
                            :upload-link="uploadLink"
                            accept="image/*"></r-file-input>
              <r-text-input v-model="img_alt"
                            :label="$t('img_alt','renusify')"
                            :rules="['required']"></r-text-input>
              <r-number-input v-model="img_width" :label="$t('width','renusify')"
                              :rules="['required']"></r-number-input>
              <r-row class="h-end">
                <r-col class="col-auto">
                  <r-btn class="color-error-text"
                         outlined
                         @click.prevent="showImg=false">{{ $t('cancel', 'renusify') }}
                  </r-btn>
                </r-col>
                <r-col class="col-auto">
                  <r-btn :disabled="!valid2"
                         class="color-success-text"
                         outlined
                         @click.prevent="handleImageForm()">{{ $t('send', 'renusify') }}
                  </r-btn>
                </r-col>
              </r-row>
            </r-container>
          </r-form>
        </r-modal>
        <r-modal v-model="showVideo"
                 no-closable no-close-btn>
          <r-form v-model="valid2">
            <r-container>
              <r-file-input v-model="video"
                            :headers="headers"
                            :label="$t('video','renusify')"
                            :rules="['required']"
                            :size="1"
                            :upload-link="uploadLink"
                            accept="video/mp4,video/webm"></r-file-input>
              <r-number-input v-model="img_width" :label="$t('width','renusify')"
                              :rules="['required']"></r-number-input>
              <r-number-input v-model="img_height" :label="$t('height','renusify')"
                              :rules="['required']"></r-number-input>
              <r-row class="h-end">
                <r-col class="col-auto">
                  <r-btn class="color-error-text"
                         outlined
                         @click.prevent="showVideo=false">{{ $t('cancel', 'renusify') }}
                  </r-btn>
                </r-col>
                <r-col class="col-auto">
                  <r-btn :disabled="!valid2"
                         class="color-success-text"
                         outlined
                         @click.prevent="handleVideoForm()">{{ $t('send', 'renusify') }}
                  </r-btn>
                </r-col>
              </r-row>
            </r-container>
          </r-form>
        </r-modal>
        <r-modal v-model="showPre"
                 no-closable no-close-btn>
          <r-form v-model="valid2">
            <r-container>
              <r-text-input v-model="code_name" :label="$t('name','renusify')"></r-text-input>
              <r-select-input v-model="lang" :items="langs"
                              :label="$t('lang','renusify')"
                              :rules="['required']"
                              just-value></r-select-input>
              <r-text-area v-model="code"
                           :label="$t('code','renusify')"
                           :rules="['required']"
                           ltr></r-text-area>
              <div class="text-end my-3">
                <r-btn class="color-error-text"
                       outlined
                       @click.prevent="showPre=false">{{ $t('cancel', 'renusify') }}
                </r-btn>
                <r-btn :disabled="!valid2"
                       class="color-success-text ms-2"
                       outlined
                       @click.prevent="handlePreForm()">{{ $t('send', 'renusify') }}
                </r-btn>
              </div>
            </r-container>
          </r-form>
        </r-modal>
        <r-modal v-model="showTable"
                 no-closable no-close-btn>
          <r-form v-model="valid2">
            <r-container>
              <r-select-input v-model="table_form.headers"
                              :label="$t('headers','renusify')"
                              :rules="['required']" just-value multiple tags></r-select-input>
              <r-number-input v-model="table_form.row" :label="$t('row','renusify')"
                              :rules="['required']"></r-number-input>

              <div class="text-end my-3">
                <r-btn class="color-error-text"
                       outlined
                       @click.prevent="showTable=false">{{ $t('cancel', 'renusify') }}
                </r-btn>
                <r-btn :disabled="!valid2"
                       class="color-success-text ms-2"
                       outlined
                       @click.prevent="handleTableForm()">{{ $t('send', 'renusify') }}
                </r-btn>
              </div>
            </r-container>
          </r-form>
        </r-modal>

      </r-container>
    </template>
  </r-input>
</template>

<script setup>
import './style.scss'
import '../../highlight/style.scss'
import {useHighlight} from "../../highlight/useHighlight"
import {ref, computed, onMounted, onBeforeUnmount, inject} from 'vue'

const {$toast, $helper, $r} = inject('renusify')
const axios = inject('axios')

const props = defineProps({
  /**
   * API endpoint URL for uploading media files (images/videos)
   * @type {String}
   */
  uploadLink: String,
  /**
   * The editor's model value (object with text and files or plain string)
   * @type {Object|String}
   * @default { text: '', files: [] }
   */
  modelValue: {
    type: [Object, String],
    default: () => ({
      text: '',
      files: []
    })
  },
  /**
   * Additional headers for upload requests
   * @type {Object}
   */
  headers: Object
})

const emit = defineEmits([
  /**
   * Emitted when editor content changes
   * @param {Object} value - Updated editor value with text and files
   * @param {String} value.text - HTML content
   * @param {Array} value.files - Array of uploaded file URLs
   */
  'update:modelValue'
])

const {
  highlight,
} = useHighlight()

const text = ref(props.modelValue && typeof props.modelValue === 'object' && 'text' in props.modelValue ? props.modelValue.text : props.modelValue)
const files = ref(props.modelValue && typeof props.modelValue === 'object' && 'text' in props.modelValue ? props.modelValue.files : [])
const valid1 = ref(false)
const valid2 = ref(false)
const show = ref(false)
const showImg = ref(false)
const showVideo = ref(false)
const img_width = ref(200)
const img_height = ref(200)
const video = ref([])
const image = ref([])
const img_alt = ref(null)
const target = ref(false)
const link = ref(null)
const preSelected = ref(null)
const currentPath = ref([])
const selectElm = ref(null)
const code_name = ref(null)
const code = ref('')
const lang = ref(null)
const showPre = ref(false)
const showTable = ref(false)
const table_form = ref({})
const editorContentRef = ref(null)

const langs = ['asm', 'bash', 'bf', 'c', 'css', 'csv', 'diff', 'docker', 'git', 'go', 'html', 'http', 'ini', 'java', 'js', 'jsdoc', 'json', 'log', 'lua', 'make', 'pl', 'plain', 'py', 'regex', 'rs', 'sql', 'todo', 'toml', 'ts', 'uri', 'xml', 'yaml']

const items_undo = {
  'undo': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8Z"/></svg>',
  'redo': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6Z"/></svg>',
}

const items_handle = {
  'insertDIV': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6v13h16V6H4m14 11H6V8h12v9Z"/></svg>',
  'insertLINE': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M9 7h2v8h4v2H9V7m3-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8Z"/></svg>',
  'BLOCKQUOTE': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4Z"/></svg>',
  'PRE': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12.89 3l1.96.4L11.11 21l-1.96-.4L12.89 3m6.7 9L16 8.41V5.58L22.42 12L16 18.41v-2.83L19.59 12M1.58 12L8 5.58v2.83L4.41 12L8 15.58v2.83L1.58 12Z"/></svg>',
  'createTable': '<svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9 4L9 20M15 4L15 20M3 9H21M3 15H21M6.2 20H17.8C18.9201 20 19.4802 20 19.908 19.782C20.2843 19.5903 20.5903 19.2843 20.782 18.908C21 18.4802 21 17.9201 21 16.8V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H6.2C5.07989 4 4.51984 4 4.09202 4.21799C3.71569 4.40973 3.40973 4.71569 3.21799 5.09202C3 5.51984 3 6.07989 3 7.2V16.8C3 17.9201 3 18.4802 3.21799 18.908C3.40973 19.2843 3.71569 19.5903 4.09202 19.782C4.51984 20 5.07989 20 6.2 20Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  'createLink': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"/></svg>',
}

const items_format = {
  'insertOrderedList': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M7 13v-2h14v2H7m0 6v-2h14v2H7M7 7V5h14v2H7M3 8V5H2V4h2v4H3m-1 9v-1h3v4H2v-1h2v-.5H3v-1h1V17H2m2.25-7a.75.75 0 0 1 .75.75c0 .2-.08.39-.21.52L3.12 13H5v1H2v-.92L4 11H2v-1h2.25Z"/></svg>',
  'insertUnorderedList': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h4v4H3V4m6 1v2h12V5H9m-6 5h4v4H3v-4m6 1v2h12v-2H9m-6 5h4v4H3v-4m6 1v2h12v-2H9"/></svg>',
  'subscript': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41m5.85 13.62h-4.88v-1l.89-.8c.76-.65 1.32-1.19 1.7-1.63c.37-.44.56-.85.57-1.24a.898.898 0 0 0-.27-.7c-.18-.16-.47-.28-.86-.28c-.31 0-.58.06-.84.18l-.66.38l-.45-1.17c.27-.21.59-.39.98-.53s.82-.24 1.29-.24c.78.04 1.38.25 1.78.66c.4.41.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.47-.76.92-1.27 1.36l-.64.52v.02h2.58v1.35Z"/></svg>',
  'superscript': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M16 7.41L11.41 12L16 16.59L14.59 18L10 13.41L5.41 18L4 16.59L8.59 12L4 7.41L5.41 6L10 10.59L14.59 6L16 7.41M21.85 9h-4.88V8l.89-.82c.76-.64 1.32-1.18 1.7-1.63c.37-.44.56-.85.57-1.23a.884.884 0 0 0-.27-.7c-.18-.19-.47-.28-.86-.29c-.31.01-.58.07-.84.17l-.66.39l-.45-1.17c.27-.22.59-.39.98-.53S18.85 2 19.32 2c.78 0 1.38.2 1.78.61c.4.39.62.93.62 1.57c-.01.56-.19 1.08-.54 1.55c-.34.48-.76.93-1.27 1.36l-.64.52v.02h2.58V9Z"/></svg>',
  'bold': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13.5 15.5H10v-3h3.5A1.5 1.5 0 0 1 15 14a1.5 1.5 0 0 1-1.5 1.5m-3.5-9h3A1.5 1.5 0 0 1 14.5 8A1.5 1.5 0 0 1 13 9.5h-3m5.6 1.29c.97-.68 1.65-1.79 1.65-2.79c0-2.26-1.75-4-4-4H7v14h7.04c2.1 0 3.71-1.7 3.71-3.79c0-1.52-.86-2.82-2.15-3.42Z"/></svg>',
  'italic': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M10 4v3h2.21l-3.42 8H6v3h8v-3h-2.21l3.42-8H18V4h-8Z"/></svg>',
  'strikeThrough': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 14h18v-2H3m2-8v3h5v3h4V7h5V4m-9 15h4v-3h-4v3Z"/></svg>',
  'underline': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 21h14v-2H5v2m7-4a6 6 0 0 0 6-6V3h-2.5v8a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 8.5 11V3H6v8a6 6 0 0 0 6 6Z"/></svg>',
  'insertHorizontalRule': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M0 24h24v-4H0v4Z"/></svg>',
  'removeFormat': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M6 5v.18L8.82 8h2.4l-.72 1.68l2.1 2.1L14.21 8H20V5H6M3.27 5L2 6.27l6.97 6.97L6.5 19h3l1.57-3.66L16.73 21L18 19.73L3.55 5.27L3.27 5Z"/></svg>'
}

const items_dir = [
  '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3V3m0 4h12v2H3V7m0 4h18v2H3v-2m0 4h12v2H3v-2m0 4h18v2H3v-2Z"/></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3V3m4 4h10v2H7V7m-4 4h18v2H3v-2m4 4h10v2H7v-2m-4 4h18v2H3v-2Z"/></svg>',
  '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3V3m6 4h12v2H9V7m-6 4h18v2H3v-2m6 4h12v2H9v-2m-6 4h18v2H3v-2Z"/></svg>'
]

const menu = {
  'font': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 7h2L16 21h-2.4l-1.1-3H6.3l-1.1 3H3L8.5 7m-1.4 9h4.8L9.5 9.7L7.1 16M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3Z"/></svg>',
    items: [
      {text: 'd1', value: 'display-1'},
      {text: 'd2', value: 'display-2'},
      {text: 'd3', value: 'display-3'},
      {text: 'head1', value: 'headline-1'},
      {text: 'head2', value: 'headline-2'},
      {text: 'head3', value: 'headline-3'},
      {text: 'title-1', value: 'title-1'},
      {text: 'title-2', value: 'title-2'},
      {text: 'title-3', value: 'title-3'},
      {text: 'body-1', value: 'body-1'},
      {text: 'body-2', value: 'body-2'},
      {text: 'body-3', value: 'body-3'},
      {text: 'label-1', value: 'label-1'},
      {text: 'label-2', value: 'label-2'},
      {text: 'label-3', value: 'label-3'},
    ]
  },
  'header': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 4h2v6h4V4h2v14H9v-6H5v6H3V4m10 4h2.31l.32-3h2l-.32 3h2l.32-3h2l-.32 3H23v2h-1.9l-.2 2H23v2h-2.31l-.32 3h-2l.32-3h-2l-.32 3h-2l.32-3H13v-2h1.9l.2-2H13V8m4.1 2l-.2 2h2l.2-2h-2Z"/></svg>',
    items: [
      {text: 'H1', value: 'H1'},
      {text: 'H2', value: 'H2'},
      {text: 'H3', value: 'H3'},
      {text: 'H4', value: 'H4'},
      {text: 'H5', value: 'H5'},
      {text: 'H6', value: 'H6'}
    ]
  },
  'color': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 11.5s-2 2.17-2 3.5a2 2 0 0 0 2 2a2 2 0 0 0 2-2c0-1.33-2-3.5-2-3.5M5.21 10L10 5.21L14.79 10m1.77-1.06L7.62 0L6.21 1.41l2.38 2.38l-5.15 5.15c-.59.56-.59 1.53 0 2.12l5.5 5.5c.29.29.68.44 1.06.44s.77-.15 1.06-.44l5.5-5.5c.59-.59.59-1.56 0-2.12Z"/></svg>',
    items: [
      {text: 'color', value: 'color-disabled-text'},
      {text: 'color', value: 'color-one-text'},
      {text: 'color', value: 'color-two-text'},
      {text: 'color', value: 'color-three-text'},
      {text: 'color', value: 'color-error-text'},
      {text: 'color', value: 'color-info-text'},
      {text: 'color', value: 'color-warning-text'},
      {text: 'color', value: 'color-success-text'},
      {text: 'color', value: 'color-white-text'},
      {text: 'color', value: 'color-black-text'}
    ]
  },
  'background': {
    icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18 4V3a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6h1v4H9v11a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-9h8V4h-3Z"/></svg>',
    items: [
      {text: 'color', value: 'color-one'},
      {text: 'color', value: 'color-two'},
      {text: 'color', value: 'color-three'},
      {text: 'color', value: 'color-error'},
      {text: 'color', value: 'color-info'},
      {text: 'color', value: 'color-warning'},
      {text: 'color', value: 'color-success'},
      {text: 'color', value: 'color-black'},
      {text: 'color', value: 'color-white'},
    ]
  }
}

if (props.uploadLink) {
  items_handle['insertImage'] = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.09c-.06-.33-.09-.66-.09-1c0-.68.12-1.36.35-2H5l3.5-4.5l2.5 3l3.5-4.5l2.23 2.97c.97-.63 2.11-.97 3.27-.97c.34 0 .67.03 1 .09V5a2 2 0 0 0-2-2H5m14 13v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"/></svg>'
  items_handle['insertVideo'] = '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4Z"/></svg>'
}

const is_object = computed(() => {
  return props.modelValue && typeof props.modelValue === 'object' && 'text' in props.modelValue
})

const content = () => {
  return editorContentRef.value?.innerHTML || ''
}

const addClass = (e) => {
  if (selectElm.value) {
    selectElm.value.classList = e.join(' ')
    updateText()
  }
}

const borderd = (el) => {
  if (selectElm.value) {
    selectElm.value.style.border = null
  }
  if (!el.style) {
    el = el.parentNode
    selectElm.value = el
  }
  if (!el.style) {
    selectElm.value = null
    return
  }
  if (el.style.border) {
    el.style.border = null
    selectElm.value = null
    return
  }
  selectElm.value = el
  el.style.border = '1px solid var(--color-one)'
}

const bordered = () => {
  const a = getSelection()
  currentPath.value = []

  const f = (node) => {
    if (node.classList && node.classList.contains('editor-content')) {
      currentPath.value.reverse()
      return
    }
    currentPath.value.push(node.parentNode)
    f(node.parentNode)
  }

  if (a) {
    currentPath.value = [a?.anchorNode]
    f(a?.anchorNode)
    if (a?.anchorNode.classList && a?.anchorNode.classList.contains('editor-content')) {
      return
    }
    borderd(a?.anchorNode)
  }
}

const deleteImage = (img, i) => {
  axios.delete(props.uploadLink,
      {
        data: {link: img},
        headers: props.headers
      }
  ).then(() => {
    files.value.splice(i, 1)
    updateText()
  })
}

const handleImageForm = () => {
  if (!getSelection() || !image.value || !img_alt.value) {
    $toast('invalid_data', {type: 'error'})
    return
  }
  let sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(preSelected.value)
  let url = '<img src="' + image.value[0] + '?w=' + img_width.value + '" alt="' + img_alt.value + '" width="' + img_width.value + '" />'
  files.value.push(image.value[0])
  document.execCommand('insertHTML', true, url)
  showImg.value = false
}

const handleVideoForm = () => {
  if (!getSelection() || !video.value) {
    $toast('invalid_data', {type: 'error'})
    return
  }
  let sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(preSelected.value)
  let url = '<video controls="1" src="' + video.value[0] + '" width="' + img_width.value + '" height="' + img_height.value + '"></video>'
  files.value.push(video.value[0])
  document.execCommand('insertHTML', true, url)
  showVideo.value = false
}

const handleTableForm = () => {
  if (!getSelection() || !table_form.value.row || !table_form.value.headers) {
    $toast('invalid_data', {type: 'error'})
    return
  }
  let sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(preSelected.value)
  let t = '<table><thead><tr>'
  for (let i = 0; i < table_form.value.headers.length; i++) {
    t += `<th>${table_form.value.headers[i]}</th>`
  }
  t += '</tr></thead><tbody>'
  for (let i = 0; i < table_form.value.row; i++) {
    t += '<tr>'
    for (let i = 0; i < table_form.value.headers.length; i++) {
      t += `<td></td>`
    }
    t += '</tr>'
  }
  t += '</tbody></table>'
  document.execCommand('insertHTML', true, t)
  showTable.value = false
}

const handlePreForm = async () => {
  if (!getSelection() || !code.value || !lang.value) {
    $toast('invalid_data', {type: 'error'})
    return
  }
  let sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(preSelected.value)
  let url = `<div class="${$r.prefix}highlight" >`
  if (code_name.value) {
    url += `<div class="highlight-name title-3 font-weight-bold mb-3">${code_name.value}</div>`
  }

  url += `<div class="highlight-code highlight-lang-${lang.value}">${await highlight(code.value, lang.value)}</div></div>`
  document.execCommand('insertHTML', true, url)
  showPre.value = false
}

const handleForm = () => {
  if (!getSelection() || !link.value) {
    $toast('invalid_data', {type: 'error'})
    return
  }
  let sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(preSelected.value)
  let url = '<a href="' + link.value.trim() + '"'
  if (target.value) {
    url += 'target="_blank" rel="nofollow"'
  }
  if (link.value.startsWith('#')) {
    url += `id="${link.value.replace('#', '')}"`
  }
  url += '>' + sel + '</a>'

  document.execCommand('insertHTML', true, url)
  show.value = false
}

const getSelection = () => {
  if (window.getSelection) {
    return window.getSelection()
  }
  return false
}

const handleOpen = (e) => {
  if (e === true) {
    let sel = window.getSelection()
    if (sel.rangeCount > 0) {
      preSelected.value = sel.getRangeAt(0)
    }
  }
}

const addCss = (e) => {
  let btn = e['menu']
  e = e['item'].value
  if (!getSelection()) {
    return
  }
  let sel = getSelection()
  sel.removeAllRanges()
  sel.addRange(preSelected.value)
  if (btn === 'header') {
    document.execCommand('insertHTML', true, '<' + e.trim() + '>' + sel + '</' + e.trim() + '>')
    return null
  }
  let selectedElement = sel.focusNode.parentNode
  if (selectedElement.tagName === 'SPAN' && selectedElement.innerText === sel.toString()) {
    let cls = selectedElement.classList.value.split(' ')
    for (let c of cls) {
      if (menu[btn]['items'].includes(c.trim())) {
        selectedElement.classList.remove(c.trim())
      }
    }

    selectedElement.classList.add(e)
  } else {
    let cls = ''
    if (selectedElement.tagName === 'SPAN') {
      cls = selectedElement.classList.value
    }
    e = cls + ' ' + e

    document.execCommand('insertHTML', true, "<span class='" + e.trim() + "'>" + sel + '</span>')
  }
}

const handle = (e) => {
  let selectedElement = window.getSelection().focusNode.parentNode

  if (selectedElement.tagName === e) {
    format('formatBlock', '<div>')
  } else {
    if (e === 'createLink') {
      link.value = null
      target.value = false
      handleOpen(true)
      show.value = true
    } else if (e === 'createTable') {
      table_form.value = {}
      handleOpen(true)
      showTable.value = true
    } else if (e === 'PRE') {
      code.value = ''
      lang.value = null
      handleOpen(true)
      showPre.value = true
    } else if (e === 'insertImage') {
      if (props.uploadLink) {
        image.value = []
        img_alt.value = null
        handleOpen(true)
        showImg.value = true
      }
    } else if (e === 'insertVideo') {
      if (props.uploadLink) {
        video.value = []
        handleOpen(true)
        showVideo.value = true
      }
    } else if (e === 'insertDIV') {
      const d = document.createElement('div')
      d.innerText = 'div'
      if (selectElm.value) {
        selectElm.value.appendChild(d)
      } else {
        selectedElement.appendChild(d)
      }
    } else if (e === 'insertLINE') {
      const d = document.createElement('div')
      d.innerText = 'line'
      editorContentRef.value.appendChild(d)
    } else {
      format('formatBlock', e)
    }
  }
  updateText()
}

const handle_dir = (e) => {
  let name = ''
  switch (e) {
    case 0:
      name = 'text-start'
      break
    case 1:
      name = 'text-center'
      break
    case 2:
      name = 'text-end'
      break
  }
  let selectedElement = window.getSelection().focusNode
  if (selectedElement === null) {
    return null
  }

  let parentNode = selectedElement.parentNode

  if (parentNode.classList.contains('editor-content')) {
    selectedElement.classList.remove('text-start', 'text-center', 'text-end')
    selectedElement.classList.add(name)
  } else {
    parentNode.classList.remove('text-start', 'text-center', 'text-end')
    parentNode.classList.add(name)
  }

  updateText()
}

const updateText = () => {
  emit('update:modelValue', {
    text: editorContentRef.value?.innerHTML || '',
    files: files.value
  })
}

const format = (command, value) => {
  if (command === 'removeFormat') {
    document.execCommand('insertHTML', true, '<div>' + getSelection().toString() + '</div>')
  } else {
    document.execCommand(command, false, value)
  }
}

const handlePaste = (e) => {
  e.preventDefault()
  const text = (e.originalEvent || e).clipboardData.getData('text/plain')
  document.execCommand('insertHTML', false, text)
}

onMounted(() => {
  format('defaultParagraphSeparator', 'br')
  if (editorContentRef.value) {
    editorContentRef.value.addEventListener('paste', handlePaste)
  }
})

onBeforeUnmount(() => {
  if (editorContentRef.value) {
    editorContentRef.value.removeEventListener('paste', handlePaste)
  }
})
</script>
