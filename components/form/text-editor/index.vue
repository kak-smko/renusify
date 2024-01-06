<template>
  <r-container :class="[`${$r.prefix}text-editor container-fluid`,{'input-tile':c_tile}]">
    <r-row class="editor-header h-center">
      <r-col class="col-auto">
        <r-btn-group :items="items_dir" @update:modelValue="handle_dir"></r-btn-group>
      </r-col>
      <r-col class="col-auto">
        <r-btn-group :items="menu" exact is-select @open="handleOpen" @update:modelValue="addCss">
          <template v-slot:list="{item}">
            <div :class="'color-white-text'===item['value']?'color-black '+item['value']:item['value']"
                 class="list-title pa-2"
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
        <r-select-input :label="$t('class','renusify')" :model-value="[...selectElm.classList]"
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
        <r-input
            :model-value="is_object?modelValue.text:modelValue"
            hide
            v-bind="$attrs">
          <template v-slot="{uid}">
            <div :id="uid"
                 :ref="'editorContent'+id"
                 class="editor-content" contenteditable="true"
                 @input="updateText()"
                 @keyup="bordered"
                 v-html="text" @click.prevent="bordered">
            </div>
          </template>
        </r-input>
      </r-col>
      <r-col v-if="files.length>0" class="col-12">
        <div v-for="(img,i) in files" :key="i"
             class="ma-1 img-holder">
          <r-btn class="color-error-text" icon @click.prevent="deleteImage(img,i)">
            <r-icon v-html="$r.icons.delete"></r-icon>
          </r-btn>
          <r-img
              :src="'/'+img"
              alt="img"
              height="100"></r-img>
        </div>
      </r-col>
    </r-row>
    <r-modal v-model="show"
             :closable="false"
             :closebtn="false">
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
             :closable="false"
             :closebtn="false">
      <r-form v-model="valid2">
        <r-container>
          <r-file-input v-model="image"
                        :headers="headers"
                        :label="$t('image','renusify')"
                        :size="1"
                        :upload-link="uploadLink"
                        accept="image/*"></r-file-input>
          <r-text-input v-model="img_alt"
                        :label="$t('img_alt','renusify')"
                        :rules="['required']"></r-text-input>
          <r-number-input v-model="img_width" :label="$t('width','renusify')"
                          :rules="['required']"></r-number-input>
          <r-number-input v-model="img_height" :label="$t('height','renusify')"
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
             :closable="false"
             :closebtn="false">
      <r-form v-model="valid2">
        <r-container>
          <r-file-input v-model="video"
                        :headers="headers"
                        :label="$t('video','renusify')"
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

  </r-container>
</template>

<script>
import './style.scss'

export default {
  name: 'r-text-editor',
  inheritAttrs: false,
  props: {
    uploadLink: {type: String, default: '/storage'},
    modelValue: {
      type: [Object, String], default: () => {
        return {
          text: '',
          files: []
        }
      }
    },
    tile: {type: Boolean, default: undefined},
    headers: Object
  },
  emits: ['update:modelValue'],
  data() {
    return {
      id: 'text_editor_' + this.$helper.uniqueId(12),
      text: this.modelValue && typeof this.modelValue === 'object' && 'text' in this.modelValue ? this.modelValue.text : this.modelValue,
      files: this.modelValue && typeof this.modelValue === 'object' && 'text' in this.modelValue ? this.modelValue.files : [],
      valid1: false,
      valid2: false,
      show: false,
      showImg: false,
      showVideo: false,
      img_width: 200,
      img_height: 200,
      video: [],
      image: [],
      img_alt: null,
      target: false,
      link: null,
      preSelected: null,
      currentPath: [],
      selectElm: null,
      items_undo: {
        'undo': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12.5 8c-2.65 0-5.05 1-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88c3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8Z"/></svg>',
        'redo': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M18.4 10.6C16.55 9 14.15 8 11.5 8c-4.65 0-8.58 3.03-9.96 7.22L3.9 16a8.002 8.002 0 0 1 7.6-5.5c1.95 0 3.73.72 5.12 1.88L13 16h9V7l-3.6 3.6Z"/></svg>',
      },
      items_handle: {
        'DIV': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M13 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4h-2v6H9V4h4m0 6a2 2 0 0 0 2-2a2 2 0 0 0-2-2h-2v4h2Z"/></svg>',
        'insertDIV': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M4 6v13h16V6H4m14 11H6V8h12v9Z"/></svg>',
        'insertLINE': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M9 7h2v8h4v2H9V7m3-5a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2a8 8 0 0 0-8 8a8 8 0 0 0 8 8a8 8 0 0 0 8-8a8 8 0 0 0-8-8Z"/></svg>',
        'BLOCKQUOTE': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M14 17h3l2-4V7h-6v6h3M6 17h3l2-4V7H5v6h3l-2 4Z"/></svg>',
        'PRE': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m12.89 3l1.96.4L11.11 21l-1.96-.4L12.89 3m6.7 9L16 8.41V5.58L22.42 12L16 18.41v-2.83L19.59 12M1.58 12L8 5.58v2.83L4.41 12L8 15.58v2.83L1.58 12Z"/></svg>',
        'insertImage': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h9.09c-.06-.33-.09-.66-.09-1c0-.68.12-1.36.35-2H5l3.5-4.5l2.5 3l3.5-4.5l2.23 2.97c.97-.63 2.11-.97 3.27-.97c.34 0 .67.03 1 .09V5a2 2 0 0 0-2-2H5m14 13v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2Z"/></svg>',
        'insertVideo': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11l-4 4Z"/></svg>',
        'createLink': '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7a5 5 0 0 0-5 5a5 5 0 0 0 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1M8 13h8v-2H8v2m9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1c0 1.71-1.39 3.1-3.1 3.1h-4V17h4a5 5 0 0 0 5-5a5 5 0 0 0-5-5Z"/></svg>',
      },
      items_format: {
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
      },

      items_dir: ['<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3V3m0 4h12v2H3V7m0 4h18v2H3v-2m0 4h12v2H3v-2m0 4h18v2H3v-2Z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3V3m4 4h10v2H7V7m-4 4h18v2H3v-2m4 4h10v2H7v-2m-4 4h18v2H3v-2Z"/></svg>',
        '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M3 3h18v2H3V3m6 4h12v2H9V7m-6 4h18v2H3v-2m6 4h12v2H9v-2m-6 4h18v2H3v-2Z"/></svg>'
      ],
      menu: {
        'font': {
          icon: '<svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M8.5 7h2L16 21h-2.4l-1.1-3H6.3l-1.1 3H3L8.5 7m-1.4 9h4.8L9.5 9.7L7.1 16M22 5v2h-3v3h-2V7h-3V5h3V2h2v3h3Z"/></svg>',
          items: [{text: 'HI', value: 'display-1'},
            {text: 'HI', value: 'display-2'},
            {text: 'HI', value: 'display-3'},
            {text: 'HI', value: 'headline-1'},
            {text: 'HI', value: 'headline-2'},
            {text: 'HI', value: 'headline-3'},
            {text: 'HI', value: 'title-1'},
            {text: 'HI', value: 'title-2'},
            {text: 'HI', value: 'title-3'},
            {text: 'HI', value: 'body-1'},
            {text: 'HI', value: 'body-2'},
            {text: 'HI', value: 'body-3'},
            {text: 'HI', value: 'label-1'},
            {text: 'HI', value: 'label-2'},
            {text: 'HI', value: 'label-3'},
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
    }
  },
  mounted() {
    /* document.execCommand('enableObjectResizing', false, true);
    document.execCommand('enableInlineTableEditing', false, true);
    document.execCommand('enableAbsolutePositionEditor', false, true) */

    this.format('defaultParagraphSeparator', 'div')
    this.element.addEventListener('paste', function (e) {
      e.preventDefault()
      const text = (e.originalEvent || e).clipboardData.getData('text/plain')

      document.execCommand('insertHTML', false, text)
    })
  },
  beforeUnmount() {
    this.element.removeEventListener('paste', () => {
    })
  },
  computed: {
    c_tile() {
      if (this.tile === undefined && this.$r.inputs.tile) {
        return this.$r.inputs.tile
      }
      return this.tile
    },
    element() {
      return this.$refs['editorContent' + this.id]
    },
    is_object() {
      return this.modelValue && typeof this.modelValue === 'object' && 'text' in this.modelValue;

    }

  },
  methods: {
    content() {
      return this.element.innerHTML
    },
    addClass(e) {
      if (this.selectElm) {
        this.selectElm.classList = e.join(' ')
        this.updateText()
      }
    },
    borderd(el) {
      if (this.selectElm) {
        this.selectElm.style.border = null
      }
      if (!el.style) {
        el = el.parentNode
        this.selectElm = el
      }
      if (!el.style) {
        this.selectElm = null
        return
      }
      if (el.style.border) {
        el.style.border = null
        this.selectElm = null
        return
      }
      this.selectElm = el
      el.style.border = '1px solid var(--color-one)'
    },
    bordered() {
      const a = this.getSelection()
      this.currentPath = []
      const that = this

      function f(node) {
        if (node.classList && node.classList.contains('editor-content')) {
          that.currentPath.reverse()
          return
        }
        that.currentPath.push(node.parentNode)
        f(node.parentNode)
      }

      if (a) {
        this.currentPath = [a?.anchorNode]
        f(a?.anchorNode)
        if (a?.anchorNode.classList && a?.anchorNode.classList.contains('editor-content')) {
          return
        }
        this.borderd(a?.anchorNode)
      }
    },
    deleteImage(img, i) {
      this.$axios.delete(this.uploadLink,
          {
            data: {link: img},
            headers: this.headers
          }
      ).then(() => {
        this.files.splice(i, 1)
        this.updateText()
      })

    },
    handleImageForm() {
      if (!this.getSelection() || !this.image || !this.img_alt) {
        this.$toast(this.$t('invalid_data', 'renusify'), {type: 'error'})
        return
      }
      let sel = this.getSelection()
      sel.removeAllRanges()
      sel.addRange(this.preSelected)
      let url = '<img src="/' + this.image[0] + '?w=' + this.img_width + '&h=' + this.img_height + '" alt="' + this.img_alt + '" width="' + this.img_width + '" height="' + this.img_height + '"/>'
      this.files.push(this.image[0])
      document.execCommand('insertHTML', true, url)
      this.showImg = false
    },
    handleVideoForm() {
      if (!this.getSelection() || !this.video) {
        this.$toast(this.$t('invalid_data', 'renusify'), {type: 'error'})
        return
      }
      let sel = this.getSelection()
      sel.removeAllRanges()
      sel.addRange(this.preSelected)
      let url = '<video controls="1" src="/' + this.video[0] + '" width="' + this.img_width + '" height="' + this.img_height + '"></video>'
      this.files.push(this.video[0])
      document.execCommand('insertHTML', true, url)
      this.showVideo = false
    },
    handleForm() {
      if (!this.getSelection() || !this.link) {
        this.$toast(this.$t('invalid_data', 'renusify'), {type: 'error'})
        return
      }
      let sel = this.getSelection()
      sel.removeAllRanges()
      sel.addRange(this.preSelected)
      let url = '<a href="' + this.link.trim() + '"'
      if (this.target) {
        url += 'target="_blank"'
      }
      if (this.link.startsWith('#')) {
        url += `id="${this.link.replace('#', '')}"`
      }
      url += '>' + sel + '</a>'

      document.execCommand('insertHTML', true, url)
      this.show = false
    },
    getSelection() {
      if (window.getSelection) {
        return window.getSelection()
      }

      return false
    },
    handleOpen(e) {
      if (e === true) {
        let sel = window.getSelection()
        if (sel.rangeCount > 0) {
          this.preSelected = sel.getRangeAt(0)
        }
      }
    },
    addCss(e) {
      let btn = e['menu']
      e = e['item'].value
      if (!this.getSelection()) {
        return
      }
      let sel = this.getSelection()
      sel.removeAllRanges()
      sel.addRange(this.preSelected)
      if (btn === 'header') {
        document.execCommand('insertHTML', true, '<' + e.trim() + '>' + sel + '</' + e.trim() + '>')
        return null
      }
      let selectedElement = sel.focusNode.parentNode
      if (selectedElement.tagName === 'SPAN' && selectedElement.innerText === sel.toString()) {
        let cls = selectedElement.classList.value.split(' ')
        for (let c of cls) {
          if (this.menu[btn]['items'].includes(c.trim())) {
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
    },
    handle(e) {
      let selectedElement = window.getSelection().focusNode.parentNode

      if (selectedElement.tagName === e) {
        this.format('formatBlock', '<div>')
      } else {
        if (e === 'createLink') {
          this.link = null
          this.target = false
          this.handleOpen(true)
          this.show = true
        } else if (e === 'insertImage') {
          this.image = []
          this.img_alt = null
          this.handleOpen(true)
          this.showImg = true
        } else if (e === 'insertVideo') {
          this.video = []
          this.handleOpen(true)
          this.showVideo = true
        } else if (e === 'insertDIV') {
          const d = document.createElement('div')
          d.innerText = 'div'
          if (this.selectElm) {
            this.selectElm.appendChild(d)
          } else {
            selectedElement.appendChild(d)
          }
        } else if (e === 'insertLINE') {
          const d = document.createElement('div')
          d.innerText = 'line'
          this.element.appendChild(d)
        } else {
          this.format('formatBlock', e)
        }
      }
      this.updateText()
    },
    handle_dir(e) {
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

      this.updateText()
    },
    updateText() {
      this.$emit('update:modelValue', {
        text: this.element.innerHTML,
        files: this.files
      })
    },
    format(command, value) {
      if (command === 'removeFormat') {
        document.execCommand('insertHTML', true, '<div>' + this.getSelection().toString() + '</div>')
      } else {
        document.execCommand(command, false, value)
      }
    },
  }
}
</script>
