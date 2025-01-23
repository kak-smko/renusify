<template>
    <laptop v-if="!$r.breakpoint.mdAndDown">
        <template #search="{item}">
            <slot name="search" :item="item"></slot>
        </template>
    </laptop>
    <mobile v-else>
        <template #search="{item}">
            <slot name="search" :item="item"></slot>
        </template>
    </mobile>
</template>

<script>
import '../scss/toolbar.scss'
import {defineAsyncComponent} from 'vue'

export default {
        name: 'r-toolbar',
        components: {
            Laptop: defineAsyncComponent(() =>
                import("./laptop.vue")
            ),
            Mobile: defineAsyncComponent(() =>
                import("./mobile.vue")
            )
        }
    }
</script>
