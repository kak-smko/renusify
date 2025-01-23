<template>
  <section>
    <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
      r-root
    </h1>
    <p class="mt-5 title">
      وقتی root باشد . وقتی که href یا to دارد root است , پس لینک است.
    </p>
    <r-table
        :items="[
        {
          prop: 'activeClass',
          type: 'String',
          default: 'false',
          description: 'وقتی که فعال بود بیاد . ',
        },
        {
          prop: 'disabled',
          type: 'Boolean',
          default: 'false',
          description: ' غیر فعال می شود .',
        },
        {
          prop: 'exactActiveClass',
          type: 'String',
          default: 'false',
          description: 'دقیقا الان فعال می باشد . ',
        },
        {
          prop: 'link',
          type: 'Boolean',
          default: 'false',
          description: 'لینک است',
        },
        {
          prop: 'href',
          type: 'String or Object',
          default: 'false',
          description: 'href است .',
        },
        {
          prop: 'to',
          type: 'String or Object',
          default: 'false',
          description: 'to است .',
        },
        {
          prop: 'tag',
          type: 'String',
          default: 'false',
          description: 'مشخص مس کند tag آن چه تگی باشد.',
        },
        {
          prop: 'target',
          type: 'String',
          default: 'false',
          description: 'blank ,self, parent, top , framename ',
        },
      ]"
        borderd
    >
      <template #row="{ item, th, key, opened, open, show }">
        <td v-for="(value, k) in th" :key="`${key}- ${k}`">
          <div
              :class="{
              'color-info-text': value.value === 'prop',
              'font-weight-bold': value.value === 'prop',
              'color-success-text': value.value === 'type',
              'color-one-text': value.value === 'default',
              'color-secondary-text': value.value === 'description',
            }"
          >
            <r-btn v-if="show(k)" icon text @click.prevent="open(key)">
              <r-icon
                  :class="{
                  'mdi-plus': opened !== key,
                  'mdi-minus': opened === key,
                }"
              ></r-icon>
            </r-btn>
            {{ item[value.value] }}
          </div>
        </td>
      </template>
    </r-table>
  </section>
  <br/><br/>
  <br/><br/>
  <section>
    <r-breadcrumbs
        :items="[{ name: 'Root' }, { name: 'Props' }]"
    ></r-breadcrumbs>
    <div class="title font-weight-bold pa-5">
      <p>
        این دکمه بصورت پیش فرض کلاس ها دارد . اما براساس نیاز شما می تواند تغییر
        کند.
      </p>
    </div>
  </section>
  <section class="pa-3"></section>
  <section>
    <pre>
       <r-code-editor>
        <div class="code-template">
          (!r-btn to="/" activeClass !)ActiveClass(!/r-btn!)
          (!r-btn to="/" disabled!)Disabled(!/r-btn!)
          (!r-btn link="/" !)Link(!/r-btn!)
          (!r-card to="/" exactActiveClass !)ExactActiveClass(!/r-card!)
          (!r-card href="/" !)Href(!/r-card!)
          (!r-card to="/" !)To(!/r-card!)
          (!r-btn tag="div" !)Tag(!/r-btn!)
          (!r-card to="/" target="blank" !)Target(!/r-card!)
        </div>
      </r-code-editor>
    </pre>
  </section>
  <br/><br/>
</template>

<script>
export default {
  name: "root",
  data() {
    return {};
  },
};
</script>

