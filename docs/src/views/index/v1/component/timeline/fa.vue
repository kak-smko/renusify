<template>
  <section>
    <div class="color-white mb-2">
      <h1 class="display-3 font-weight-light color-white ps-4 pb-1 pt-1 br-lg">
        r-timeline
      </h1>
      <p class="font-weight-light ps-4 pb-1 py-4 br-lg">
        مدل
        <r-btn readonly size="small"> r-timeline</r-btn>
        برای نمایش اطلاعات زمانی به صورت زیبا و سبک استفاده می‌شود.
      </p>
    </div>
    <table-props :items="items"></table-props>
  </section>
  <section class="color-white">
    <h1 class="font-weight-bold title ps-4 pt-1 pb-6 br-sm">
      PROP / <span>Items</span>
    </h1>
    <section>
      <r-card class="pa-4" outlined>
        <r-timeline
            :items="[
            { title: 'Item One', desc: 'description description description ' },
            { title: 'Item Two', desc: 'description description description ' },
            {
              title: 'Item Three',
              desc: 'description description description ',
            },
            {
              title: 'Item Four',
              desc: 'description description description ',
            },
          ]"
        >
          <template #back="{ k }">
            <r-card
                :class="{
                'flex-row-reverse': k % 2 === 0,
                'shadow-info': k % 2 === 0,
                'shadow-error': k % 2 !== 0,
                'color-warning': k % 2 !== 0,
                'color-info': k % 2 === 0,
              }"
                class="d-flex h-full overflow-hidden elevation-lg"
            >
              <div class="w-full display-3 br-none d-flex h-center v-center">
                {{ k + 1 }}
              </div>
            </r-card>
          </template>
          <template v-if="$r.breakpoint.mdAndUp" #counter="{ k }">
            <div class="d-flex h-center v-center h-full">
              <span class="color-one br-circle pa-2">
                <r-icon
                    v-if="k % 2 === 0"
                    v-html="$r.icons.arrow_left"
                ></r-icon>
                <r-icon v-else v-html="$r.icons.arrow_right"></r-icon>
              </span>
            </div>
          </template>
          <template v-slot="{ item }">
            <r-card class="pa-5 elevation-lg shadow-success">
              <div class="display-5 font-weight-bold mb-5">
                {{ $t(item.title) }}
              </div>
              <div>{{ $t(item.desc) }}</div>
            </r-card>
          </template>
        </r-timeline>
      </r-card>
    </section>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        template='<r-card outlined class="pa-4">
        <r-timeline
          :items="[
            { title: `Item One`,desc:`description description description ` },
            { title: `Item Two` ,desc:`description description description ` },
            { title: `Item Three` ,desc:`description description description ` },
            { title: `Item Four` ,desc:`description description description ` },
          ]"
        >
          <template #back="{ k }">
            <r-card
              class="d-flex h-full overflow-hidden elevation-lg"
              :class="k % 2 === 0?`flex-row-reverse shadow-info color-info`:`shadow-error color-warning`"
            >
               <div class="w-full display-3 br-none d-flex h-center v-center">
                {{ k + 1 }}
              </div>
            </r-card>
          </template>
          <template v-if="$r.breakpoint.mdAndUp" #counter="{ k }">
            <div class="d-flex h-center v-center h-full">
              <span class="color-one br-circle pa-2">
                <r-icon
                  v-if="k % 2 === 0"
                  v-html="$r.icons.arrow_left"
                ></r-icon>
                <r-icon v-else v-html="$r.icons.arrow_right"></r-icon>
              </span>
            </div>
          </template>
          <template v-slot="{ item }">
            <r-card class="pa-5 elevation-lg shadow-success">
              <div class="display-5 font-weight-bold mb-5">
                {{ $t(item.title) }}
              </div>
              <div>{{ $t(item.desc) }}</div>
            </r-card>
          </template>
        </r-timeline>
      </r-card>
        '
    ></r-code-editor>
  </section>
  <br/>
  <br/>
</template>
<script>
export default {
  name: "timeline",
  data() {
    return {
      items: [
        {
          prop: "items",
          type: "Array",
          default: "undefined",
          description: "آیتم  می گیرد",
        },
      ],
    };
  },
};
</script>
