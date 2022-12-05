<template>
    <component :is="page"></component>
</template>
<script>
    import { defineAsyncComponent} from "vue/dist/vue.esm-bundler.js";

    export default {
        name: "r-code-editor-run",
        props: {
            template: String,
            script: String,
            style: String
        },
        methods: {
            strToObj2(str) {
                str=this.$helper.replacer(str,' ','')
                str=this.$helper.replacer(str,"\n",'')
                str=this.$helper.replacer(str,"\r",'')
                let open=0
                let pre=0
                let to=0
                let items=[]
                const s=str
                s.split('').forEach((c,i)=>{
                    to++
                    if(c==='{'){
                        open++
                    }
                    if(c==='}'){
                        open--
                    }
                    if(open===0&&c===','){
                        items.push(str.substr(pre,to-1))
                        pre=i+1
                        to=0
                    }
                })
                items.push(str.substr(pre,str.length))
                return items
            },
            strToObj(str) {
                str = str.trim()
                if (str.substr(0, 1) === '{') {
                   str=str.substr(1,str.length-2)
                }
                let res = {}
                this.strToObj2(str).forEach((item) => {
                    item = item.trim()
                    const f = item.indexOf('(')
                    const o = item.indexOf(':')

                    if ((f > 0 && f < o) || o < 0) {
                        res[item.substr(0, f)] = eval("(" + 'function ' + item + ")");
                    } else {

                        item = [item.substr(0,o).trim(),item.substr(o,item.length).replace(':','').trim()]
                         if(item[1].substr(0, 1) === '{'){
                            res[item[0]]=this.strToObj(item[1])
                        }else{
                            res[item[0]] = eval(item[1])
                        }

                    }
                })

                return res
            },
        },
        computed:{
          page(){
              let temp=this.template||''
            let scr=this.script||'name:"test"'
            temp = this.$helper.replacer(temp, '(!', '<')
            temp = this.$helper.replacer(temp, '!)', '>')
            temp = this.$helper.replacer(temp, '[!', '{{')
            temp = this.$helper.replacer(temp, '!]', '}}')
            scr = this.$helper.replacer(scr, '&lt;', '<')
            scr = this.$helper.replacer(scr, '&gt;', '>')

              return defineAsyncComponent(() =>
                            new Promise((resolve, reject) => {
                                resolve({
                                    template: temp,
                                    ...this.strToObj(scr)
                                })
                            }))
          }
        }
    };
</script>
