<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        parallax Directive
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
    "v-parallax usage": {
      "template": "<div class=\"parallax-container\">\n<div class=\"scroll-content\">\n<div class=\"placeholder\" style=\"height: 100vh\"></div>\n<div\nv-parallax=\"{ speed: 0.3 }\"\nclass=\"parallax-box box1\"\n>\n<h2>Default Parallax</h2>\n<p>Speed: 0.3, Direction: Y</p>\n</div>\n</div>\n</div>",
      "script": "",
      "style": ".scroll-content {\nposition: relative;\nbackground: #f0f2f5;\n}\n.placeholder {\nbackground: linear-gradient(90deg, #e0e0e0 25%, #d0d0d0 50%, #e0e0e0 75%);\nbackground-size: 200% 100%;\nanimation: loading 2s infinite;\nborder-radius: 4px;\nmargin: 10px 0;\n}\n@keyframes loading {\n0% { background-position: 200% 0; }\n100% { background-position: -200% 0; }\n}\n.parallax-box {\nwidth: 80%;\nmax-width: 600px;\nheight: 300px;\nmargin: 0 auto 40px;\nborder-radius: 12px;\ndisplay: flex;\nflex-direction: column;\njustify-content: center;\nalign-items: center;\ntext-align: center;\npadding: 30px;\ncolor: white;\nbox-shadow: 0 10px 30px rgba(0,0,0,0.15);\noverflow: hidden;\n}\n.parallax-box h2 {\nfont-size: 2rem;\nmargin-bottom: 10px;\n}\n.parallax-box p {\nfont-size: 1rem;\nopacity: 0.9;\n}\n.box1 {\nbackground: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>