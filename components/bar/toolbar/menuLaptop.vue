<template>
    <div class="toolbar-items">
        <component :is="item.to?'router-link':'span'"
                   class="toolbar-item me-2 cursor-pointer"
                   v-for="(item,i) in menu"
                   :key="i"
                   @click="item.hash&&go(item.hash)"
                   :to="item.to">
            {{item.title}}
            <r-icon v-if="item.childs" v-html="$r.icons.chevron_down"></r-icon>
            <div class="toolbar-childs sheet mt-7" v-if="item.childs">
                <menu-childs class="pa-2" :menu="item.childs"></menu-childs>
            </div>
        </component>
    </div>
</template>
<script>
    import MenuChilds from "./menuChilds";

    export default {
        name: 'menu-laptop',
        components: {MenuChilds},
        props: {menu: Array},
        data() {
            return {}
        },
        methods:{
            go(hash){
                if(this.$route.name!==hash.to.name){
                this.$router.push(hash.to)
                }
                setTimeout(()=>{
                    const el=document.getElementById(hash.id)
                    if(el!==null){
                    el.scrollIntoView()
                    }
                },500)
            }
        }
    }
</script>