<template>
  <!--  todo translate-->
  <section ref="breakpoint">
    <h1 class="display-4">نقاط شکست</h1>
    <p class="mt-5 title">
      در رنوسیفای می توان بر اساس اندازه صفحه کارهای خاصی را انجام داد. مثلا می
      توان برای موبایل یک نوع نمایش را داشته باشیم و برای لپ تاپ یک نوع دیگر
      نمایش داده شود.
    </p>
    <r-table
        :items="[
        {
          دستگاه: 'خیلی کوچک',
          کد: 'xs',
          نوع: 'دستگاه های موبایل',
          اندازه: '600px >',
        },
        {
          دستگاه: 'کوچک',
          کد: 'sm',
          نوع: 'دستگاه های تبلت',
          اندازه: '600px > < 960px',
        },
        {
          دستگاه: 'متوسط',
          کد: 'md',
          نوع: 'دستگاه های لپ تاپ',
          اندازه: '960px > < 1280px',
        },
        {
          دستگاه: 'بزرگ',
          کد: 'lg',
          نوع: 'دسکتاپ',
          اندازه: '1280px > < 1620px',
        },
        {
          دستگاه: 'خیلی بزرگ',
          کد: 'xl',
          نوع: 'صفحه نمایش های بزرگ',
          اندازه: '> 1620px',
        },
      ]"
        borderd
    ></r-table>
  </section>
  <section>
    <h2 class="display-4 my-5">سرویس نقطه شکست</h2>
    <p>
      نقطه شکست بر اساس اندازه صفحه نمایش دارای نام های xs,sm,md,lg,xl می باشد.
      که می توانیم بسته یه نیازمان از آن استفاده کنیم. همچنین این سرویس با تغییر
      اندازه صفحه نمایش به صورت داینامیک مقادیرش تغییر می کند.
    </p>
    <p>در مثال زیر اندازه مرورگر را کوچک و بزرگ کنید تا نتایچ را ببینید.</p>
    <p class="caption">دکمه run را جهت اجرا بزنید.</p>

    <r-code-editor :script="scr" :template="temp" runnable></r-code-editor>
  </section>
  <section>
    <h3 class="display-4">متغیرهای موجود</h3>
    <p class="mt-5">در زیر متغیرهای عمومی برای سرویس نقطه شکست آمده است:</p>
    <r-code-editor
        :script="`this.$r.breakpoint=${JSON.stringify(
        $r.breakpoint,
        undefined,
        2
      )}`"
        :script-show="false"
        :style-show="false"
        :template-show="false"
    >
    </r-code-editor>
  </section>
</template>

<script>
export default {
  name: "breakpoint",
  data() {
    return {
      scr:
          "computed: {\n" +
          "    height() {\n" +
          "      switch (this.$r.breakpoint.name) {\n" +
          '        case "xs":\n' +
          "          return '220';\n" +
          '        case "sm":\n' +
          "          return '400';\n" +
          '        case "md":\n' +
          "          return '500';\n" +
          '        case "lg":\n' +
          "          return '600';\n" +
          '        case "xl":\n' +
          "          return '800';\n" +
          "      }\n" +
          "      return '100';\n" +
          "    }\n" +
          "  }",
      temp:
          "<div class=\"color-success\" :style=\"'height:'+height+'px'\" >\n" +
          "      {{height}}\n" +
          "</div>",
    };
  },

  methods: {
    html2json(node) {
      let r = [];

      node.forEach((item) => {
        let attrs = {};
        if (item.attributes) {
          Object.values(item.attributes).forEach((a) => {
            attrs[a.name] = a.nodeValue;
          });
        }
        let childs = [];
        if (item.childNodes) {
          childs = this.html2json(item.childNodes);
        }
        if (!(item.nodeName === "#text" && item.nodeValue === "")) {
          r.push({
            name: item.nodeName,
            attributes: attrs,
            childs: childs,
            nodeValue: item.nodeValue,
          });
        }
      });
      return r;
    },
  },
};
</script>

