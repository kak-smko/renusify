<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        intersect Directive
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
    "v-intersect usage": {
      "template": "<div class=\"intersection-container\">\n<h1>Intersection Observer Examples</h1>\n<div class=\"scroll-area\">\n<div class=\"placeholder\" style=\"height: 300px\"></div>\n<div\nv-intersect=\"handleIntersection\"\nclass=\"observed-box box1\"\n:class=\"{ visible: box1Visible }\"\n>\nBox 1 - Default\n<div v-if=\"box1Visible\" class=\"status\">IN VIEWPORT</div>\n</div>\n<div class=\"placeholder\" style=\"height: 400px\"></div>\n<div\nv-intersect.once=\"handleIntersectionOnce\"\nclass=\"observed-box box2\"\n:class=\"{ visible: box2Visible }\"\n>\nBox 2 - Once\n<div v-if=\"box2Visible\" class=\"status\">TRIGGERED ONCE</div>\n</div>\n<div class=\"placeholder\" style=\"height: 500px\"></div>\n<div\nv-intersect.silent=\"handleIntersectionSilent\"\nclass=\"observed-box box3\"\n:class=\"{ visible: box3Visible }\"\n>\nBox 3 - Silent\n<div v-if=\"box3Visible\" class=\"status\">SILENT MODE</div>\n</div>\n<div class=\"placeholder\" style=\"height: 400px\"></div>\n<div\nv-intersect.pre=\"\"\nclass=\"observed-box box4\"\n:class=\"{ visible: box4Visible }\"\n>\nBox 4 - Pre (No Callback)\n<div v-if=\"box4Visible\" class=\"status\">PRE MODIFIED</div>\n</div>\n<div class=\"placeholder\" style=\"height: 300px\"></div>\n<div\nv-intersect=\"{\nhandler: handleIntersectionWithOptions,\noptions: { threshold: 0.5, rootMargin: '50px' }\n}\"\nclass=\"observed-box box5\"\n:class=\"{ visible: box5Visible }\"\n>\nBox 5 - Custom Options\n<div v-if=\"box5Visible\" class=\"status\">50% THRESHOLD</div>\n</div>\n<div class=\"placeholder\" style=\"height: 600px\"></div>\n</div>\n<div class=\"info-panel\">\n<div class=\"info-row\">\n<span>Box 1 Visible:</span>\n<span :class=\"{ active: box1Visible }\">{{ box1Visible ? 'YES' : 'NO' }}</span>\n</div>\n<div class=\"info-row\">\n<span>Box 2 Visible:</span>\n<span :class=\"{ active: box2Visible }\">{{ box2Visible ? 'YES' : 'NO' }}</span>\n</div>\n<div class=\"info-row\">\n<span>Box 3 Visible:</span>\n<span :class=\"{ active: box3Visible }\">{{ box3Visible ? 'YES' : 'NO' }}</span>\n</div>\n<div class=\"info-row\">\n<span>Box 4 Visible:</span>\n<span :class=\"{ active: box4Visible }\">{{ box4Visible ? 'YES' : 'NO' }}</span>\n</div>\n<div class=\"info-row\">\n<span>Box 5 Visible:</span>\n<span :class=\"{ active: box5Visible }\">{{ box5Visible ? 'YES' : 'NO' }}</span>\n</div>\n<div class=\"info-row\">\n<span>Total Entries:</span>\n<span class=\"counter\">{{ entryCount }}</span>\n</div>\n</div>\n</div>",
      "script": "import { ref } from 'vue'\nconst box1Visible = ref(false)\nconst box2Visible = ref(false)\nconst box3Visible = ref(false)\nconst box4Visible = ref(false)\nconst box5Visible = ref(false)\nconst entryCount = ref(0)\nconst handleIntersection = (isIntersecting, entries, observer) => {\nbox1Visible.value = isIntersecting\nentryCount.value++\nconsole.log('Default intersection:', isIntersecting, entries)\n}\nconst handleIntersectionOnce = (isIntersecting, entries, observer) => {\nbox2Visible.value = isIntersecting\nentryCount.value++\nconsole.log('Once intersection:', isIntersecting, entries)\n}\nconst handleIntersectionSilent = (isIntersecting, entries, observer) => {\nbox3Visible.value = isIntersecting\nentryCount.value++\nconsole.log('Silent intersection:', isIntersecting, entries)\n}\nconst handleIntersectionWithOptions = (isIntersecting, entries, observer) => {\nbox5Visible.value = isIntersecting\nentryCount.value++\nconsole.log('Custom options intersection:', isIntersecting, entries)\n}",
      "style": ".intersection-container {\nfont-family: Arial, sans-serif;\n}\nh1 {\ntext-align: center;\nmargin-bottom: 30px;\ncolor: #333;\n}\n.scroll-area {\nheight: 80vh;\noverflow-y: auto;\nborder: 2px solid #ddd;\nborder-radius: 8px;\npadding: 20px;\nbackground: #f9f9f9;\n}\n.placeholder {\nbackground: linear-gradient(90deg, #eee 25%, #ddd 50%, #eee 75%);\nbackground-size: 200% 100%;\nanimation: loading 1.5s infinite;\nborder-radius: 4px;\nmargin: 10px 0;\n}\n@keyframes loading {\n0% { background-position: 200% 0; }\n100% { background-position: -200% 0; }\n}\n.observed-box {\nheight: 200px;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nfont-size: 1.2rem;\nfont-weight: bold;\nborder-radius: 8px;\nmargin: 20px 0;\nopacity: 0.3;\ntransition: all 0.5s ease;\nposition: relative;\noverflow: hidden;\n}\n.observed-box.visible {\nopacity: 1;\ntransform: scale(1.05);\nbox-shadow: 0 10px 30px rgba(0,0,0,0.2);\n}\n.box1 {\nbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\ncolor: white;\n}\n.box2 {\nbackground: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);\ncolor: white;\n}\n.box3 {\nbackground: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);\ncolor: white;\n}\n.box4 {\nbackground: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);\ncolor: white;\n}\n.box5 {\nbackground: linear-gradient(135deg, #fa709a 0%, #fee140 100%);\ncolor: white;\n}\n.status {\nposition: absolute;\nbottom: 10px;\nright: 10px;\nbackground: rgba(0,0,0,0.8);\ncolor: white;\npadding: 5px 10px;\nborder-radius: 4px;\nfont-size: 0.8rem;\n}\n.info-panel {\nposition: fixed;\nbottom: 20px;\nright: 20px;\nbackground: white;\npadding: 20px;\nborder-radius: 8px;\nbox-shadow: 0 4px 20px rgba(0,0,0,0.15);\nmin-width: 250px;\n}\n.info-row {\ndisplay: flex;\njustify-content: space-between;\nalign-items: center;\npadding: 8px 0;\nborder-bottom: 1px solid #eee;\n}\n.info-row:last-child {\nborder-bottom: none;\n}\n.info-row span:last-child {\nfont-weight: bold;\npadding: 4px 12px;\nborder-radius: 4px;\nbackground: #f0f0f0;\n}\n.info-row span.active {\nbackground: #4CAF50;\ncolor: white;\n}\n.counter {\nbackground: #2196F3 !important;\ncolor: white !important;\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>