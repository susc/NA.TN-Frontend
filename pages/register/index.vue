<template>
    <div v-loading.fullscreen="!ready">
        <common-header></common-header>
        <form-register v-if="ready && !logined"></form-register>
        <div class="loginedtips container mt-5" v-if="ready && logined">
            <center class="h1"><font-awesome-icon :icon="['fas', 'info-circle']" class="text-info mr-2"/>提示</center>
            <center class="mt-5 text-secondary">您已经登录，请不要重复注册</center>
            <center class="mt-3 text-secondary">请<nuxt-link to="/">返回首页</nuxt-link></center>
        </div>
        <div class="iloveyou"></div>
        <common-footer></common-footer>
    </div>
</template>

<script>
const CommonHeader = () => import('~/components/common-header.vue')
const FormRegister = () => import('~/components/form-register.vue')
const CommonFooter = () => import('~/components/common-footer.vue')

export default {
    components: {CommonFooter, CommonHeader, FormRegister},
    data() {
        return {
            ready: false,
            logined: false
        }
    },
    methods: {
        verifyToken: function(email, token) {
            const body = {
                    action: 'verify',
                    email: email,
                    token: token
                }
            this.$http.post('https://api.na.tn/shorturl/', body, {emulateJSON: true, timeout: 5000}).then(
                response => {
                    if(response.body.code == 200) {
                        this.logined = true
                        this.ready = true
                    }else{
                        this.$cookie.delete('email')
                        this.$cookie.delete('token')
                        this.logined = false
                        this.ready = true
                    }
                },
                response => {
                    return 0
                }
            )
        }
    },
    mounted: function() {
        this.email = this.$cookie.get('email')
        this.token = this.$cookie.get('token')
        if(this.email != null && this.token != null) {
            this.verifyToken(this.email, this.token)
        }else{
            this.logined = false
            this.ready = true
        }
    }
}
</script>

<style>

</style>
