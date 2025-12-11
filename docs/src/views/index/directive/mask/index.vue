<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
        mask Directive
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
    "v-mask usage": {
      "template": "<div class=\"title-1 my-3\">Number input (N)</div>\n<input\nclass=\"input-mask\"\nv-model=\"lazy1\"\nplaceholder=\"2020/04/01\"\n@complete=\"log('complete',$event)\"\n@accept=\"log('accept',$event)\"\n@backspace=\"log('backspace',$event)\"\n@paste.prevent=\"log('paste',$event)\"\nv-mask=\"'NNNN/NN/NN'\"\n/>\n<div class=\"title-1 my-3\">[a-z] input (A)</div>\n<input\nclass=\"input-mask\"\nv-model=\"lazy2\"\nplaceholder=\"aaaa - bbbb\"\n@complete=\"log('complete',$event)\"\n@accept=\"log('accept',$event)\"\n@backspace=\"log('backspace',$event)\"\n@paste.prevent=\"log('paste',$event)\"\nv-mask=\"'AAAA - AAAA'\"\n/>\n<div class=\"title-1 my-3\">[a-z0-9] input (B)</div>\n<input\nclass=\"input-mask\"\nv-model=\"lazy3\"\nplaceholder=\"aaaa - 22\"\n@complete=\"log('complete',$event)\"\n@accept=\"log('accept',$event)\"\n@backspace=\"log('backspace',$event)\"\n@paste.prevent=\"log('paste',$event)\"\nv-mask=\"'BBBB - BB'\"\n/>\n<div class=\"title-1 my-3\">Any input (X)</div>\n<input\nclass=\"input-mask\"\nv-model=\"lazy4\"\nplaceholder=\"aa - 22 - #@\"\n@complete=\"log('complete',$event)\"\n@accept=\"log('accept',$event)\"\n@backspace=\"log('backspace',$event)\"\n@paste.prevent=\"log('paste',$event)\"\nv-mask=\"'XX XX XX'\"\n/>",
      "script": "import {ref} from 'vue'\nconst lazy1=ref(null)\nconst lazy2=ref(null)\nconst lazy3=ref(null)\nconst lazy4=ref(null)\nconst log=(name,e)=>{\nconsole.log(name,e)\n}",
      "style": ".input-mask{\nwidth:100%;\nborder:1px solid;\npadding:8px\n}"
    }
  },
  "props": [],
  "emits": [],
  "slots": [],
  "expose": [],
  "provide": []
}
</script>