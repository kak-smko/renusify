import fs from 'fs';
import path from 'path';
import {VueComponentAPIParser} from './parser.mjs';
import {MenuBuilder} from "./menu.mjs";

function extractExportPaths(text) {
    const paths = [];

    const exportRegex = /export\s*\*\s*as\s+(\w+)\s+from\s+['"]([^'"]+)['"]/g;

    let match;
    while ((match = exportRegex.exec(text)) !== null) {
        paths.push({
            alias: match[1],
            path: match[2]
        });
    }

    return paths;
}

function build_directives() {
    const componentFiles = fs.readFileSync('./directive/index.js', 'utf-8')
    const simplePaths = extractExportPaths(componentFiles);
    const builder = new MenuBuilder();

    for (let i = 0; i < simplePaths.length; i++) {
        const name = (simplePaths[i]['alias'])

        let file_path = "./docs/src/views/index/directive"
        simplePaths[i]['path'].replace('./', '').split("/").forEach(path => {
            if (path !== "index.js") {
                file_path += "/" + path.replace('.js', '')
            }
        })
        builder.addPath(simplePaths[i]['path'])

        let p = simplePaths[i]['path'].replace('./', './directive/');

        const vueFile = fs.readFileSync(p, 'utf-8')

        const componentInfo = VueComponentAPIParser.parse(vueFile)

        create_component_directive(name, file_path + '/index.vue', componentInfo)
    }

    const menu = builder.build('directive');

    let menu_file = JSON.parse(fs.readFileSync('./docs/src/views/index/menu/menu.json', 'utf-8'))
    menu_file.forEach((item) => {
        if (item.name === 'directive') {
            item.childs = menu
        }
    })
    fs.writeFileSync('./docs/src/views/index/menu/menu.json', JSON.stringify(menu_file, null, 2), 'utf8');

}

function build_components() {
    const componentFiles = fs.readFileSync('./components/index.js', 'utf-8')
    const simplePaths = extractExportPaths(componentFiles);
    const builder = new MenuBuilder();

    for (let i = 0; i < simplePaths.length; i++) {
        const name = (simplePaths[i]['alias'])
        console.log(name)
        let file_path = "./docs/src/views/index/component"
        simplePaths[i]['path'].replace('./', '').split("/").forEach(path => {
            if (path !== "index.js") {
                file_path += "/" + path.replace('.js', '')
            }
        })
        builder.addPath(simplePaths[i]['path'])

        let p = simplePaths[i]['path'].replace('./', './components/').replace('.js', '.vue');
        if (name === 'rMeta') {
            p = "./components/meta/meta.js";
        }
        const vueFile = fs.readFileSync(p, 'utf-8')

        const componentInfo = VueComponentAPIParser.parse(vueFile)

        create_component(name, file_path + '/index.vue', componentInfo)
    }

    const menu = builder.build();
    let menu_file = JSON.parse(fs.readFileSync('./docs/src/views/index/menu/menu.json', 'utf-8'))
    menu_file.forEach((item) => {
        if (item.name === 'component') {
            item.childs = menu
        }
    })
    fs.writeFileSync('./docs/src/views/index/menu/menu.json', JSON.stringify(menu_file, null, 2), 'utf8');

}

function create_component(component_name, file_path, componentInfo = {}) {
    const dirPath = path.dirname(file_path);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }
    if (Object.keys(componentInfo.example).length === 0) {
        let scr = "import {ref} from 'vue';\n";
        let tmp = "<" + component_name + " "
        componentInfo.props.forEach(prop => {
            if (prop.name === "modelValue") {
                tmp += `\n v-model="${prop.name}"`
            } else {
                tmp += `\n :${prop.name}="${prop.name}"`
            }
            let d = prop.default !== "undefined" ? prop.default : null
            if (prop.default !== "undefined") {
                let types = prop.type.split("|")[0].trim()
                if (types === "String") {
                    d = "'" + prop.default + "'"
                }
            }

            scr += `\nconst ${prop.name}=ref(${d})`
        })
        componentInfo.emits.forEach(emit => {
            tmp += `\n@${emit.name}="log('${emit.name}',$event)"`
        })
        tmp += ">\n"
        componentInfo.slots.forEach(slot => {
            if (slot.example) {
                tmp += `<template #${slot.name}>
${slot.example}
</template>\n`
            }
        })
        tmp += "</" + component_name + ">"

        componentInfo.example['basic usage'] = {
            'template': tmp,
            'script': scr + `\nconst log=(name,e)=>{
        console.log(name,e)
        }`
        }

    }
    const template = `
<template>
  <section>
    <r-meta title="${component_name} Component | Renusify" description="Document with example for Renusify ${component_name} component."></r-meta>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light py-1 br-lg">
       ${component_name} Component
      </h1>
    </div>
    <table-props :items="info.props"></table-props>
    <table-events :items="info.emits"></table-events>
    <table-provide :items="info.provide"></table-provide>
    <table-expose :items="info.expose"></table-expose>
    <table-slots :items="info.slots"></table-slots>
  </section>
  <br/>
  <section v-for="(item,i) in info.example" :key="i">
    <div class="title-1">{{i}}</div>
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
const info=${JSON.stringify(componentInfo, null, 2)}
</script>`;

    fs.writeFileSync(file_path, template, 'utf8');

    return true;

}

function create_component_directive(component_name, file_path, componentInfo = {}) {

    const dirPath = path.dirname(file_path);

    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, {recursive: true});
    }

    const template = `
<template>
  <section>
    <div class="mb-2">
      <h1 class="display-3 font-weight-light ps-4 pb-1 pt-1 br-lg">
       ${component_name} Directive
      </h1>
    </div>
  </section>
  <br/>
  <section v-for="(item,i) in info.example" :key="i">
    <div class="title-1">{{i}}</div>
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
const info=${JSON.stringify(componentInfo, null, 2)}
</script>`;

    fs.writeFileSync(file_path, template, 'utf8');

    return true;

}


build_components()
build_directives()

