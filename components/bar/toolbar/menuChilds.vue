<template>
    <div class="ms-1 ps-2 menu-list">
        <div v-for="(item,i) in menu" :key="i">
            <div class="d-flex h-space-between">
                <component class="menu-title py-1 cursor-pointer"
                           :is="item.to?'router-link':'span'"
                           @click.prevent="item.hash&&go(item.hash)"
                           :to="item.to">{{item.title}}</component>
            <r-icon class="me-1" v-if="item.childs" v-html="open===i?$r.icons.minus:$r.icons.plus"
                    @click.prevent.stop="open===i?open=null:open=i"></r-icon>
                </div>
            <menu-childs v-if="item.childs" :class="{'menu-hide':open!==i}" :menu="item.childs"></menu-childs>
        </div>
    </div>
</template>
<script>
    export default {
        name:'menu-childs',
        props:{
            menu:Array
        },
        data(){
            return{
                open:null
            }
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