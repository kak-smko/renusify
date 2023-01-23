<template>
    <toast :time="time"
           :type="type"
           :closable="closable"
           :action="action"
           :actionName="actionName"
           v-model="show">
        {{ msg }}
    </toast>
</template>

<script>
    import Toast from './toast.vue'

    const EVENTS = ['online', 'offline', 'load']
    export default {
        name: 'r-toast',
        components: {
            Toast
        },
        data() {
            return {
                msg: '',
                time: 3000,
                closable: true,
                show: false,
                type: 'info',
                setTimeout_id:null,
                action:undefined,
                actionName:undefined
            }
        },
        mounted() {
            window.renusifyBus.on(
                'toast', (data) => {
                    if (this.show) {
                        this.show = false
                        clearTimeout(this.setTimeout_id)
                        this.setTimeout_id=setTimeout(() => {
                            this.build(data)
                        }, 300)
                    } else {
                        this.build(data)
                    }
                }
            )
            EVENTS.forEach(event => window.addEventListener(event, this.updateOnlineStatus))
        },
        beforeUnmount() {
            EVENTS.forEach(event => window.removeEventListener(event, this.updateOnlineStatus))
        },
        methods: {
            build(data) {
                const option = data.options || {}
                this.msg = data.msg
                this.action=option.action
                this.actionName=option.action_name
                this.closable=this.$helper.ifHas(option, true, 'closable')
                this.time = this.$helper.ifHas(option, 3000, 'time')
                this.type = this.$helper.ifHas(option, 'info', 'type')
                this.show = true
            },
            updateOnlineStatus() {
                if (!navigator.onLine) {
                    this.$toast(this.$t('no_internet','renusify'), {type: 'warning', time: -1})
                } else {
                    this.$toast(this.$t('no_internet','renusify'), {type: 'warning', time: 0})
                }
            }
        }
    }
</script>
