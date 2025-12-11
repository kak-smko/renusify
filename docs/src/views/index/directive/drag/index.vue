<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        drag Directive
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
    "v-drag usage": {
      "template": "<div class=\"drag-container\">\n<h2>Draggable Elements</h2>\n<div\nv-drag=\"{\nstart: onDragStart,\nmove: onDragMove,\nend: onDragEnd\n}\"\nclass=\"draggable-box box1\"\n:style=\"{ top: box1Top + 'px', left: box1Left + 'px' }\"\n>\nBox 1<br>\nX: {{ box1Left }}<br>\nY: {{ box1Top }}\n</div>\n<div class=\"info-panel\">\n<div class=\"info-item\">\n<strong>Active Box:</strong> {{ activeBox }}\n</div>\n<div class=\"info-item\">\n<strong>Total Distance:</strong> {{ totalDistance }}px\n</div>\n<button @click=\"resetPositions\" class=\"reset-btn\">\nReset Positions\n</button>\n</div>\n</div>",
      "script": "import { ref } from 'vue'\nconst box1Top = ref(50)\nconst box1Left = ref(50)\nconst activeBox = ref('None')\nconst totalDistance = ref(0)\nconst onDragStart = (data) => {\nactiveBox.value = 'Box 1'\nconsole.log('Box 1 drag started:', data)\n}\nconst onDragMove = (data) => {\nbox1Top.value = data.top\nbox1Left.value = data.left\nconst dx = data.endX - data.startX\nconst dy = data.endY - data.startY\ntotalDistance.value = Math.sqrt(dx * dx + dy * dy).toFixed(2)\n}\nconst onDragEnd = (data) => {\nconsole.log('Box 1 drag ended:', data)\nactiveBox.value = 'None'\n}\nconst resetPositions = () => {\nbox1Top.value = 50\nbox1Left.value = 50\ntotalDistance.value = 0\nactiveBox.value = 'None'\n}",
      "style": ".drag-container {\nposition: relative;\nwidth: 100%;\nheight: 600px;\nborder: 2px solid #333;\nborder-radius: 8px;\npadding: 20px;\nbackground: #f8f9fa;\n}\nh2 {\ntext-align: center;\nmargin-bottom: 30px;\ncolor: #333;\n}\n.draggable-box {\nposition: absolute;\nwidth: 120px;\nheight: 120px;\nborder-radius: 8px;\ncursor: move;\nuser-select: none;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\ntext-align: center;\nfont-size: 14px;\nfont-weight: bold;\nbox-shadow: 0 4px 12px rgba(0,0,0,0.15);\ntransition: box-shadow 0.3s;\n}\n.draggable-box:hover {\nbox-shadow: 0 6px 16px rgba(0,0,0,0.2);\n}\n.box1 {\nbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\ncolor: white;\n}\n.info-panel {\nposition: absolute;\nbottom: 20px;\nleft: 20px;\nbackground: white;\npadding: 15px;\nborder-radius: 8px;\nbox-shadow: 0 2px 8px rgba(0,0,0,0.1);\nmin-width: 200px;\n}\n.info-item {\nmargin-bottom: 10px;\npadding: 8px;\nbackground: #f8f9fa;\nborder-radius: 4px;\n}\n.reset-btn {\nwidth: 100%;\npadding: 10px;\nbackground: #dc3545;\ncolor: white;\nborder: none;\nborder-radius: 4px;\ncursor: pointer;\nfont-weight: bold;\ntransition: background 0.3s;\n}\n.reset-btn:hover {\nbackground: #c82333;\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>