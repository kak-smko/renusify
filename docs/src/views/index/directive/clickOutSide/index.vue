<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        clickOutside Directive
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
    "v-click-outside usage": {
      "template": "<div>\n<div class=\"dropdown-container\">\n<button @click=\"toggleDropdown\">\n{{ selectedOption || 'Select an option' }}\n</button>\n<div v-if=\"isOpen\" v-click-outside=\"closeDropdown\" class=\"dropdown-menu\">\n<div\nv-for=\"option in options\"\n:key=\"option\"\n@click=\"selectOption(option)\"\nclass=\"dropdown-item\"\n>\n{{ option }}\n</div>\n</div>\n</div>\n</div>",
      "script": "import { ref } from 'vue'\nconst isOpen = ref(false)\nconst selectedOption = ref('')\nconst isModalOpen = ref(false)\nconst options = ['Option 1', 'Option 2', 'Option 3', 'Option 4']\nconst toggleDropdown = () => {\nisOpen.value = !isOpen.value\n}\nconst closeDropdown = () => {\nisOpen.value = false\n}\nconst selectOption = (option) => {\nselectedOption.value = option\nisOpen.value = false\n}\nconst onClickOutside = () => {\nconsole.log('Clicked outside the box')\n}\nconst handleOutsideClick = () => {\nisModalOpen.value = false\n}\nconst toggleModal = () => {\nisModalOpen.value = !isModalOpen.value\n}",
      "style": ".dropdown-container {\nposition: relative;\ndisplay: inline-block;\nmargin: 2rem;\n}\n.dropdown-container button {\npadding: 0.5rem 1rem;\nbackground: #007bff;\ncolor: white;\nborder: none;\nborder-radius: 4px;\ncursor: pointer;\n}\n.dropdown-menu {\nposition: absolute;\ntop: 100%;\nleft: 0;\nbackground: white;\nborder: 1px solid #ddd;\nborder-radius: 4px;\nbox-shadow: 0 2px 8px rgba(0,0,0,0.1);\nz-index: 1000;\nmargin-top: 0.5rem;\nmin-width: 200px;\n}\n.dropdown-item {\npadding: 0.75rem 1rem;\ncursor: pointer;\n}\n.dropdown-item:hover {\nbackground: #f5f5f5;\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>