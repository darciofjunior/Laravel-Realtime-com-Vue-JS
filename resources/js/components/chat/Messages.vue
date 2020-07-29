<template>
    <div class="messages scroll" ref="messages">
        <scale-loader 
            :loading="loading">
        </scale-loader>

        <message 
            v-for="message in messages" 
            :key="message.id"
            :message="message">
        </message>
    </div>
</template>

<script>
import ScaleLoader from 'vue-spinner/src/ScaleLoader.vue'

export default {
    created() {
        this.loadMessages()
    },

    data() {
        return {
            loading: false,
        }
    },

    computed: {
        messages() {
            //return this.$store.state.chat.messages

            return this.$store.getters.messages
        }
    },

    methods: {
        loadMessages() {
            this.loading = true
            this.$store.dispatch('loadMessages')
                        .finally(() => {
                            this.loading = false
                            this.scrollMessages()
                        });
        },

        scrollMessages() {
            setTimeout(() => {
                //this.$refs.messages.scrollTo(0, this.$refs.messages.scrollHeight)
                this.$refs.messages.scroll({
                    top: this.$refs.messages.scrollHeight,
                    left: 0,
                    behavior: 'smooth'
                })
            }, 100)
        }
    },

    watch: {
        messages() {
            this.scrollMessages()
        }
    },

    components: {
        ScaleLoader
    }
}
</script>

<style scoped>
.messages {
    height: 400px;
    max-height: 400px;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>