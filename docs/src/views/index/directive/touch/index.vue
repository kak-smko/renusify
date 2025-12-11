<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        touch Directive
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
    "v-touch usage": {
      "template": "<div class=\"touch-container\">\n<h1>Touch Gesture Directive</h1>\n<div class=\"gesture-areas\">\n<div class=\"gesture-area\">\n<h2>Swipe Detection</h2>\n<div\nv-touch=\"swipeHandlers\"\nclass=\"swipe-box\"\n>\n<div class=\"gesture-info\">\n<div class=\"info-item\">\n<span>Direction:</span>\n<span class=\"value direction\" :class=\"swipeDirection\">\n{{ swipeDirection }}\n</span>\n</div>\n<div class=\"info-item\">\n<span>Distance X:</span>\n<span class=\"value\">{{ swipeDistanceX }}px</span>\n</div>\n<div class=\"info-item\">\n<span>Distance Y:</span>\n<span class=\"value\">{{ swipeDistanceY }}px</span>\n</div>\n<div class=\"info-item\">\n<span>Swipe Count:</span>\n<span class=\"value counter\">{{ swipeCount }}</span>\n</div>\n</div>\n<div class=\"instruction\">\nSwipe in any direction\n</div>\n</div>\n</div>\n<div class=\"gesture-area\">\n<h2>Touch Position</h2>\n<div\nv-touch=\"touchHandlers\"\nclass=\"position-box\"\n>\n<div class=\"gesture-info\">\n<div class=\"info-item\">\n<span>Current X:</span>\n<span class=\"value\">{{ currentX }}px</span>\n</div>\n<div class=\"info-item\">\n<span>Current Y:</span>\n<span class=\"value\">{{ currentY }}px</span>\n</div>\n<div class=\"info-item\">\n<span>Move Count:</span>\n<span class=\"value counter\">{{ moveCount }}</span>\n</div>\n</div>\n<div class=\"touch-indicator\" :style=\"{ left: indicatorX + 'px', top: indicatorY + 'px' }\"></div>\n<div class=\"instruction\">\nTouch and move\n</div>\n</div>\n</div>\n</div>\n</div>",
      "script": "import { ref } from 'vue'\nconst swipeDirection = ref('none')\nconst swipeDistanceX = ref(0)\nconst swipeDistanceY = ref(0)\nconst swipeCount = ref(0)\nconst currentX = ref(0)\nconst currentY = ref(0)\nconst moveCount = ref(0)\nconst indicatorX = ref(150)\nconst indicatorY = ref(150)\nconst swipeHandlers = ref({\nleft: (wrapper) => {\nswipeDirection.value = 'left'\nswipeDistanceX.value = Math.abs(wrapper.goX)\nswipeDistanceY.value = Math.abs(wrapper.goY)\nswipeCount.value++\n},\nright: (wrapper) => {\nswipeDirection.value = 'right'\nswipeDistanceX.value = wrapper.goX\nswipeDistanceY.value = Math.abs(wrapper.goY)\nswipeCount.value++\n},\nup: (wrapper) => {\nswipeDirection.value = 'up'\nswipeDistanceX.value = Math.abs(wrapper.goX)\nswipeDistanceY.value = Math.abs(wrapper.goY)\nswipeCount.value++\n},\ndown: (wrapper) => {\nswipeDirection.value = 'down'\nswipeDistanceX.value = Math.abs(wrapper.goX)\nswipeDistanceY.value = wrapper.goY\nswipeCount.value++\n}\n})\nconst touchHandlers = ref({\nmove: (wrapper) => {\ncurrentX.value = wrapper.current.x\ncurrentY.value = wrapper.current.y\nmoveCount.value++\nindicatorX.value = wrapper.current.x\nindicatorY.value = wrapper.current.y\n}\n})",
      "style": ".touch-container {\nfont-family: Arial, sans-serif;\npadding: 20px;\nmax-width: 800px;\nmargin: 0 auto;\n}\nh1 {\ntext-align: center;\ncolor: #333;\nmargin-bottom: 40px;\nfont-size: 2rem;\n}\n.gesture-areas {\ndisplay: grid;\ngrid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\ngap: 20px;\n}\n.gesture-area {\nbackground: white;\nborder-radius: 8px;\npadding: 20px;\nbox-shadow: 0 2px 8px rgba(0,0,0,0.1);\n}\n.gesture-area h2 {\nmargin-top: 0;\ncolor: #667eea;\nfont-size: 1.2rem;\nmargin-bottom: 15px;\ntext-align: center;\n}\n.swipe-box,\n.position-box {\nheight: 250px;\nborder: 2px solid #dee2e6;\nborder-radius: 6px;\npadding: 15px;\ndisplay: flex;\nflex-direction: column;\nposition: relative;\noverflow: hidden;\ncursor: pointer;\nuser-select: none;\n}\n.swipe-box {\nbackground: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);\n}\n.position-box {\nbackground: linear-gradient(135deg, #f0f4ff 0%, #e6e9ff 100%);\n}\n.gesture-info {\nbackground: white;\nborder-radius: 4px;\npadding: 10px;\nmargin-bottom: 15px;\nbox-shadow: 0 1px 4px rgba(0,0,0,0.1);\n}\n.info-item {\ndisplay: flex;\njustify-content: space-between;\nalign-items: center;\nmargin-bottom: 8px;\npadding: 6px 0;\nborder-bottom: 1px solid #eee;\n}\n.info-item:last-child {\nmargin-bottom: 0;\nborder-bottom: none;\n}\n.info-item span:first-child {\ncolor: #555;\nfont-weight: bold;\nfont-size: 14px;\n}\n.value {\nfont-family: monospace;\nfont-weight: bold;\npadding: 3px 8px;\nborder-radius: 3px;\nbackground: #f8f9fa;\nmin-width: 60px;\ntext-align: center;\nfont-size: 13px;\n}\n.counter {\nbackground: #667eea;\ncolor: white;\n}\n.direction {\nbackground: #ff6b6b;\ncolor: white;\n}\n.direction.left {\nbackground: #4ecdc4;\n}\n.direction.right {\nbackground: #ffa726;\n}\n.direction.up {\nbackground: #43e97b;\n}\n.direction.down {\nbackground: #f093fb;\n}\n.instruction {\ntext-align: center;\ncolor: #666;\nfont-size: 1rem;\nmargin-top: auto;\npadding: 15px;\nbackground: rgba(255,255,255,0.8);\nborder-radius: 4px;\n}\n.touch-indicator {\nposition: absolute;\nwidth: 20px;\nheight: 20px;\nbackground: #667eea;\nborder-radius: 50%;\ntransform: translate(-50%, -50%);\npointer-events: none;\nbox-shadow: 0 0 6px rgba(102, 126, 234, 0.5);\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>