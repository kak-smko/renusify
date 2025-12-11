<template>
  <section ref="breakpoint">
    <h1 class="display-4">Breakpoints</h1>
    <p class="mt-5 title">
      In Renusify, you can perform specific actions based on screen size. For example, you can have one type of display
      for mobile and another for laptops.
    </p>
    <r-table
        :items="[
        {
          Device: 'Extra Small',
          Code: 'xs',
          Type: 'Mobile Devices',
          Size: '< 576px',
        },
        {
          Device: 'Small',
          Code: 'sm',
          Type: 'Tablet Devices',
          Size: '576px - 768px',
        },
        {
          Device: 'Medium',
          Code: 'md',
          Type: 'Laptop Devices',
          Size: '768px - 1024px',
        },
        {
          Device: 'Large',
          Code: 'lg',
          Type: 'Desktop',
          Size: '1024px - 1440px',
        },
        {
          Device: 'Extra Large',
          Code: 'xl',
          Type: 'Large Screens',
          Size: '> 1440px',
        },
      ]"
        borderd
    ></r-table>
  </section>
  <section>
    <h2 class="display-4 my-5">Breakpoint Service</h2>
    <p>
      The breakpoint based on screen size has the names xs, sm, md, lg, xl. We can use it according to our needs. Also,
      this service dynamically changes its values when the screen size changes.
    </p>
    <p>In the example below, resize your browser to see the results.</p>
    <p class="caption">Click the run button to execute.</p>

    <r-code-editor :script="scr" :template="temp" runnable></r-code-editor>
  </section>
  <section>
    <h3 class="display-4">Available Variables</h3>
    <p class="mt-5">The following are global variables for the breakpoint service:</p>
    <r-code-editor
        :script="`this.$r.breakpoint=${JSON.stringify(
        $r.breakpoint,
        undefined,
        2,
      )}`"
        :script-show="false"
        :css-show="false"
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