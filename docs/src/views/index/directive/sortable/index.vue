<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        sortable Directive
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
    "v-sortable usage": {
      "template": "<div class=\"sortable-container\">\n<div class=\"sortable-lists\">\n<div class=\"sortable-list\">\n<h3>Task List</h3>\n<div v-sortable=\"{ items: tasks, end: onTaskReorder }\" class=\"sortable-area\">\n<div v-for=\"task in tasks\" :key=\"task.id\" class=\"sortable-item\">\n<div class=\"task-content\">\n<div class=\"task-icon\">📋</div>\n<div class=\"task-info\">\n<div class=\"task-title\">{{ task.title }}</div>\n<div class=\"task-desc\">{{ task.description }}</div>\n</div>\n</div>\n<div class=\"task-drag-handle\">\n⋮⋮\n</div>\n</div>\n</div>\n</div>\n<div class=\"sortable-info\">\n<div class=\"info-item\">\n<span>Task Order:</span>\n<span class=\"order-value\">{{ taskOrder }}</span>\n</div>\n</div>\n</div>",
      "script": "import { ref, computed } from 'vue'\nconst tasks = ref([\n{ id: 1, title: 'Design Homepage', description: 'Create wireframes and mockups' },\n{ id: 2, title: 'Implement Login', description: 'Build authentication system' },\n{ id: 3, title: 'Write Documentation', description: 'Document API endpoints' },\n{ id: 4, title: 'Fix Mobile Bugs', description: 'Resolve responsive issues' },\n{ id: 5, title: 'Add Analytics', description: 'Integrate tracking tools' }\n])\nconst taskOrder = computed(() => tasks.value.map(t => t.id).join(', '))\nconst onTaskReorder = (newOrder) => {\nconsole.log(newOrder)\n}\nconst onDragStart = () => {\nconsole.log('Drag started')\n}",
      "style": ".sortable-container {\nfont-family: Arial, sans-serif;\npadding: 20px;\nmax-width: 1400px;\nmargin: 0 auto;\n}\n.sortable-lists {\ndisplay: grid;\ngrid-template-columns: repeat(auto-fit, minmax(350px, 1fr));\ngap: 30px;\nmargin-bottom: 30px;\n}\n.sortable-list {\nbackground: white;\nborder-radius: 12px;\npadding: 25px;\nbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n.sortable-list h3 {\nmargin-top: 0;\ncolor: #667eea;\nfont-size: 1.4rem;\nmargin-bottom: 20px;\ntext-align: center;\n}\n.sortable-area {\nmin-height: 400px;\nborder: 2px dashed #e9ecef;\nborder-radius: 8px;\npadding: 10px;\n}\n.sortable-item {\nbackground: white;\nborder: 2px solid #dee2e6;\nborder-radius: 8px;\npadding: 15px;\nmargin-bottom: 10px;\ndisplay: flex;\nalign-items: center;\njustify-content: space-between;\ncursor: move;\nuser-select: none;\ntransition: all 0.3s;\nposition: relative;\n}\n.sortable-item:hover {\nborder-color: #667eea;\nbox-shadow: 0 2px 8px rgba(102, 126, 234, 0.2);\n}\n.sortable-item.on-drag {\nposition: absolute;\nz-index: 1000;\nopacity: 0.9;\ntransform: scale(1.05);\nbox-shadow: 0 10px 30px rgba(0,0,0,0.3);\n}\n.task-content {\ndisplay: flex;\nalign-items: center;\ngap: 15px;\nflex: 1;\n}\n.task-icon {\nfont-size: 1.5rem;\n}\n.task-info {\nflex: 1;\n}\n.task-title {\nfont-weight: bold;\ncolor: #333;\nmargin-bottom: 4px;\n}\n.task-desc {\ncolor: #666;\nfont-size: 0.9rem;\n}\n.task-drag-handle {\ncolor: #adb5bd;\nfont-size: 1.2rem;\npadding: 0 10px;\ncursor: grab;\nuser-select: none;\n}\n.image-item {\nflex-direction: column;\nalign-items: stretch;\ngap: 15px;\n}\n.image-content {\ndisplay: flex;\nalign-items: center;\ngap: 15px;\n}\n.image-preview {\nwidth: 60px;\nheight: 60px;\nborder-radius: 6px;\nobject-fit: cover;\n}\n.image-info {\nflex: 1;\n}\n.image-title {\nfont-weight: bold;\ncolor: #333;\nmargin-bottom: 4px;\n}\n.image-size {\ncolor: #666;\nfont-size: 0.9rem;\n}\n.image-drag {\nalign-self: flex-end;\ncolor: #adb5bd;\nfont-size: 1.2rem;\npadding: 5px 10px;\nbackground: #f8f9fa;\nborder-radius: 4px;\ncursor: grab;\nuser-select: none;\n}\n.user-content {\ndisplay: flex;\nalign-items: center;\ngap: 15px;\nflex: 1;\n}\n.user-avatar {\nwidth: 50px;\nheight: 50px;\nbackground: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\ncolor: white;\nborder-radius: 50%;\ndisplay: flex;\nalign-items: center;\njustify-content: center;\nfont-weight: bold;\nfont-size: 1.2rem;\n}\n.user-info {\nflex: 1;\n}\n.user-name {\nfont-weight: bold;\ncolor: #333;\nmargin-bottom: 4px;\n}\n.user-email {\ncolor: #666;\nfont-size: 0.9rem;\n}\n.sortable-info {\nbackground: white;\nborder-radius: 12px;\npadding: 25px;\nbox-shadow: 0 4px 20px rgba(0,0,0,0.1);\n}\n.sortable-info .info-item {\ndisplay: flex;\njustify-content: space-between;\nalign-items: center;\npadding: 12px;\nmargin-bottom: 10px;\nbackground: #f8f9fa;\nborder-radius: 8px;\nborder-left: 4px solid #667eea;\n}\n.sortable-info .info-item:last-child {\nmargin-bottom: 0;\n}\n.sortable-info .info-item span:first-child {\nfont-weight: bold;\ncolor: #555;\n}\n.order-value {\nfont-family: monospace;\nfont-weight: bold;\nbackground: #e9ecef;\npadding: 6px 12px;\nborder-radius: 4px;\nmin-width: 150px;\ntext-align: center;\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>