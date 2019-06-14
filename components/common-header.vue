<template>
    <div class="nabbar-wrapper">
        <b-navbar toggleable="md" class="shadow-sm white">
            <b-container>
                <nuxt-link to="/">
                    <b-navbar-brand>
                        <b-img :src="require('~/assets/images/logo.svg')" width="32" height="32"></b-img>
                        NA.TN 短链接服务
                    </b-navbar-brand>
                </nuxt-link>
                <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
                <b-collapse is-nav id="nav_collapse">
                    <b-navbar-nav class="ml-auto" v-if="ready && logined">
                        <b-nav-text>欢迎你</b-nav-text>
                        <b-nav-item-dropdown right>
                            <template slot="button-content">
                                <em>{{ email }}</em>
                            </template>
                            <b-dropdown-item href="#" @click="showCommingSoonModal"><font-awesome-icon :icon="['fas', 'link']" class="text-primary mr-2"/>我的链接</b-dropdown-item>
                            <b-dropdown-item href="#" @click="showCommingSoonModal"><font-awesome-icon :icon="['fas', 'cog']" class="text-dark mr-2"/>账号设置</b-dropdown-item>
                            <b-dropdown-divider></b-dropdown-divider>
                            <b-dropdown-item @click="handleLogout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="text-danger mr-2"/>退出登录</b-dropdown-item>
                        </b-nav-item-dropdown>
                    </b-navbar-nav>
                    <b-navbar-nav class="ml-auto" v-if="ready && !logined">
                        <nuxt-link to="/login">
                            <b-nav-item href="/login">登录</b-nav-item>
                        </nuxt-link>
                        <nuxt-link to="/register">
                            <b-nav-item href="/register">注册</b-nav-item>
                        </nuxt-link>
                    </b-navbar-nav>
                </b-collapse>
            </b-container>
        </b-navbar>

        <b-modal ref="commingSoonModal" hide-footer hide-header lazy>
            <div class="d-block text-center">
                <h3 class="h2 my-4"><font-awesome-icon :icon="['fas', 'info-circle']" class="mr-3 text-info"/>提示</h3>
                <p class="mt-3 text-secondary">敬请期待</p>
            </div>
            <b-btn class="mt-3" variant="outline-info" block @click="hideCommingSoonModal">关闭</b-btn>
        </b-modal>
    </div>
</template>

<script>
export default {
    mounted: function() {
        this.email = this.$cookie.get('email')
        this.token = this.$cookie.get('token')
        if(this.email != null && this.token != null) {
            this.verifyToken(this.email, this.token)
        }else{
            this.logined = false
            this.ready = true
        }
    },
    data() {
        return {
            ready: false,
            logined: false,
            email: '',
            token: ''
        }
    },
    methods: {
        handleLogout: function() {
            this.deleteCookies()
            window.location.href = '/'
        },
        deleteCookies: function() {
            this.$cookie.delete('email')
            this.$cookie.delete('token')
        },
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
        },
        hideCommingSoonModal: function() {
            this.$refs.commingSoonModal.hide()
        },
        showCommingSoonModal: function() {
            this.$refs.commingSoonModal.show()
        }
    }
}
</script>

<style>
.white {
    background: white;
}

</style>
