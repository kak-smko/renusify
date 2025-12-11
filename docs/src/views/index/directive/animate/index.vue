<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        animate Directive
      </h1>
    </div>
  </section>
  <br/>
  <section v-for="(item,i) in info.example" :key="i">
    <div class="title-1">{{ i }}</div>
    <p class="caption">Press run Button</p>
    <r-code-editor
        runnable
        scriptSetup
        :script='item.script'
        :template='item.template'
        :css='item.style'
    >
    </r-code-editor>
  </section>
</template>
<script setup>
const info = {
  "example": {
    "v-animate usage": {
      "template": "<div class=\"container\">\n<h1>Scroll to see animations</h1>\n<div v-animate=\"{ name: 'fade-up', duration: 0.5 }\" class=\"box\">\nFade Up\n</div>\n<div v-animate=\"{ name: 'scaleIn', duration: 0.7, delay: 100 }\" class=\"box\">\nScale In\n</div>\n<div v-animate.once=\"{ name: 'right', duration: 0.6, threshold: 0.2 }\" class=\"box\">\nRight (once)\n</div>\n<div v-animate=\"{ name: 'flipLeft', duration: 1, timing: 'ease-in-out' }\" class=\"box\">\nFlip Left\n</div>\n<div v-animate=\"{ name: 'down', duration: 0.4 }\" class=\"box\">\nDown\n</div>\n<div v-animate=\"{ name: 'left-fade', duration: 0.8 }\" class=\"box\">\nLeft Fade\n</div>\n<div v-animate=\"{ name: 'scaleOut', duration: 0.9, delay: 200 }\" class=\"box\">\nScale Out\n</div>\n<div v-animate.once=\"{ name: 'flipUp', duration: 1.2, threshold: 0.3 }\" class=\"box\">\nFlip Up (once)\n</div>\n<div v-animate=\"{ name: 'up', duration: 0.5 }\" class=\"box\">\nUp\n</div>\n<div v-animate=\"{ name: 'flipRight', duration: 1 }\" class=\"box\">\nFlip Right\n</div>\n</div>",
      "script": "",
      "style": ".container {\npadding: 2rem;\nmin-height: 200vh;\n}\nh1 {\ntext-align: center;\nmargin-bottom: 3rem;\nfont-size: 2.5rem;\n}\n.box {\nwidth: 300px;\nheight: 150px;\nmargin: 2rem auto;\nbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\ncolor: white;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nfont-size: 1.5rem;\nfont-weight: bold;\nborder-radius: 12px;\nbox-shadow: 0 10px 20px rgba(0,0,0,0.1);\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>