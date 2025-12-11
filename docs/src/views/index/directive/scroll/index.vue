<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        scroll Directive
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
    "v-scroll usage": {
      "template": "<div class=\"scroll-container\">\n<div class=\"scroll-areas\">\n<div class=\"scroll-area\">\n<h3>Window Scroll</h3>\n<div v-scroll.window=\"handleWindowScroll\" class=\"scroll-content window-scroll\">\n<div class=\"scroll-info\">\n<div class=\"info-item\">\n<span>Scroll Top:</span>\n<span class=\"value\">{{ windowScrollTop }}px</span>\n</div>\n<div class=\"info-item\">\n<span>Scroll %:</span>\n<span class=\"value\">{{ windowScrollPercent }}%</span>\n</div>\n<div class=\"info-item\">\n<span>Events:</span>\n<span class=\"value counter\">{{ windowScrollCount }}</span>\n</div>\n</div>\n<div class=\"scroll-indicator\">\n<div class=\"indicator-bar\" :style=\"{ height: windowScrollPercent + '%' }\"></div>\n</div>\n</div>\n</div>\n<div class=\"scroll-area\">\n<h3>Element Scroll</h3>\n<div ref=\"elementScroll\" v-scroll=\"handleElementScroll\" class=\"scroll-content element-scroll\">\n<div class=\"scroll-info\">\n<div class=\"info-item\">\n<span>Scroll Top:</span>\n<span class=\"value\">{{ elementScrollTop }}px</span>\n</div>\n<div class=\"info-item\">\n<span>Direction:</span>\n<span class=\"value direction\" :class=\"elementScrollDirection\">\n{{ elementScrollDirection }}\n</span>\n</div>\n<div class=\"info-item\">\n<span>Events:</span>\n<span class=\"value counter\">{{ elementScrollCount }}</span>\n</div>\n</div>\n<div class=\"scroll-content-placeholder\">\n<div v-for=\"n in 10\" :key=\"n\" class=\"content-item\">\nItem {{ n }}\n</div>\n</div>\n</div>\n</div>\n</div>\n</div>",
      "script": "import { ref, computed } from 'vue'\nconst windowScrollTop = ref(0)\nconst windowScrollCount = ref(0)\nconst elementScrollTop = ref(0)\nconst elementScrollCount = ref(0)\nconst elementScrollDirection = ref('none')\nconst targetScrollTop = ref(0)\nconst lastElementScroll = ref(0)\nconst elementScroll = ref(null)\nconst targetElement = ref(null)\nconst windowScrollPercent = computed(() => {\nconst docHeight = document.documentElement.scrollHeight - window.innerHeight\nreturn docHeight > 0 ? Math.round((windowScrollTop.value / docHeight) * 100) : 0\n})\nconst handleWindowScroll = () => {\nwindowScrollTop.value = window.pageYOffset || document.documentElement.scrollTop\nwindowScrollCount.value++\n}\nconst handleElementScroll = (event) => {\nelementScrollTop.value = event.target.scrollTop\nelementScrollCount.value++\nif (lastElementScroll.value < elementScrollTop.value) {\nelementScrollDirection.value = 'down'\n} else if (lastElementScroll.value > elementScrollTop.value) {\nelementScrollDirection.value = 'up'\n}\nlastElementScroll.value = elementScrollTop.value\n}",
      "style": "body{height:200vh}\n.scroll-container {\nfont-family: Arial, sans-serif;\npadding: 20px;\nmax-width: 1200px;\nmargin: 0 auto;\n}\n.scroll-areas {\ndisplay: grid;\ngrid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\ngap: 25px;\n}\n.scroll-area {\nbackground: white;\nborder-radius: 12px;\npadding: 20px;\nbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n.scroll-area h3 {\nmargin-top: 0;\ncolor: #667eea;\nfont-size: 1.3rem;\nmargin-bottom: 15px;\n}\n.scroll-content {\nheight: 250px;\noverflow-y: auto;\nborder: 2px solid #e9ecef;\nborder-radius: 8px;\npadding: 15px;\nposition: relative;\n}\n.window-scroll {\nbackground: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n}\n.element-scroll {\nbackground: linear-gradient(135deg, #f0f4ff 0%, #e6e9ff 100%);\n}\n.scroll-info {\nposition: sticky;\ntop: 0;\nbackground: white;\npadding: 10px;\nborder-radius: 6px;\nmargin-bottom: 15px;\nbox-shadow: 0 2px 8px rgba(0,0,0,0.1);\nz-index: 1;\n}\n.info-item {\ndisplay: flex;\njustify-content: space-between;\nalign-items: center;\nmargin-bottom: 8px;\npadding: 6px 0;\nborder-bottom: 1px solid #eee;\n}\n.info-item:last-child {\nmargin-bottom: 0;\nborder-bottom: none;\n}\n.info-item span:first-child {\ncolor: #555;\nfont-weight: bold;\n}\n.value {\nfont-family: monospace;\nfont-weight: bold;\npadding: 4px 10px;\nborder-radius: 4px;\nbackground: #f8f9fa;\nmin-width: 70px;\ntext-align: center;\n}\n.counter {\nbackground: #667eea !important;\ncolor: white !important;\n}\n.direction {\nbackground: #ff6b6b !important;\ncolor: white !important;\n}\n.direction.up {\nbackground: #4ecdc4 !important;\n}\n.direction.down {\nbackground: #ffa726 !important;\n}\n.scroll-indicator {\nposition: absolute;\nright: 20px;\ntop: 100px;\nwidth: 10px;\nheight: 100px;\nbackground: #e9ecef;\nborder-radius: 5px;\noverflow: hidden;\n}\n.indicator-bar {\nposition: absolute;\nbottom: 0;\nwidth: 100%;\nbackground: linear-gradient(to top, #667eea, #764ba2);\nborder-radius: 5px;\ntransition: height 0.1s;\n}\n.scroll-content-placeholder {\npadding: 20px;\n}\n.content-item {\npadding: 15px;\nmargin: 10px 0;\nbackground: linear-gradient(135deg, #4ecdc4 0%, #44a08d 100%);\ncolor: white;\nborder-radius: 6px;\ntext-align: center;\nfont-weight: bold;\nbox-shadow: 0 2px 4px rgba(0,0,0,0.1);\n}\n.monitoring-panel {\nbackground: rgba(102, 126, 234, 0.1);\nborder: 2px dashed #667eea;\nborder-radius: 8px;\npadding: 15px;\ncolor: #667eea;\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>