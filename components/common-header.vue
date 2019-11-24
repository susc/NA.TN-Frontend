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
                        <!--<b-nav-text>欢迎你</b-nav-text>-->
                        
                        <!-- 下拉菜单 -->
                        <!--<b-nav-item-dropdown right>
                            <template slot="button-content">
                                <em>{{ email }}</em>
                            </template>
                                <b-dropdown-item href="#" @click="showCommingSoonModal"><font-awesome-icon :icon="['fas', 'link']" class="text-primary mr-2"/>我的链接</b-dropdown-item>
                                <b-dropdown-item href="#" @click="showCommingSoonModal"><font-awesome-icon :icon="['fas', 'cog']" class="text-dark mr-2"/>账号设置</b-dropdown-item>
                                <b-dropdown-divider></b-dropdown-divider>
                                <b-dropdown-item @click="handleLogout"><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="text-danger mr-2"/>退出登录</b-dropdown-item>
                        </b-nav-item-dropdown>-->

                        <el-dropdown right trigger="click" @command="handleDropdownCommand">
                            <div class="dropdown-wrapper">
                                <div class="avatar-wrapper">
                                    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="24"></el-avatar>
                                </div>
                                <div class="email-wrapper">
                                    <span class="el-dropdown-link">
                                        {{ email }}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                </div>
                            </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-link" command="showCommingSoon">我的链接</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-setting" command="showCommingSoon">账号设置</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-lock" divided command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </b-navbar-nav>

                    <!-- 注册/登录 -->
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

        <!-- 敬请期待提示框 -->
        <!--<b-modal ref="commingSoonModal" hide-footer hide-header lazy>
            <div class="d-block text-center">
                <h3 class="h2 my-4"><font-awesome-icon :icon="['fas', 'info-circle']" class="mr-3 text-info"/>提示</h3>
                <p class="mt-3 text-secondary">敬请期待</p>
            </div>
            <b-btn class="mt-3" variant="outline-info" block @click="hideCommingSoonModal">关闭</b-btn>
        </b-modal>-->
    </div>
</template>

<script>
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import Vue from 'vue'
import { Dropdown, DropdownItem, DropdownMenu, Avatar } from 'element-ui'

Vue.use(Dropdown)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Avatar)

Vue.component(CollapseTransition.name, CollapseTransition)

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
        handleDropdownCommand(command) {
            switch(command) {
                case 'showCommingSoon':
                    this.showCommingSoonModal()
                    break
                case 'logout':
                    this.showComfirmLogoutBox()
                    break
            }
        },
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
            //this.$refs.commingSoonModal.show()
            this.$alert('该功能正在开发中，敬请期待！', '提示', {
                confirmButtonText: '确定',
                type: 'info'
            })
        },
        showComfirmLogoutBox() {
            this.$confirm('您是否确定要退出登录?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$message({
                    type: 'success',
                    message: '您已成功退出登录!'
                });
                this.handleLogout()
            })
        }
    }
}
</script>

<style scoped>
.white {
    background: white;
}

.dropdown-wrapper {
    display: block;
    padding: 0.5rem 1rem;
}

.dropdown-wrapper span {
    cursor: pointer;
}

.dropdown-wrapper .avatar-wrapper {
    display: inline-block;
    vertical-align: middle;
}

.dropdown-wrapper .email-wrapper {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
}

@media (min-width: 768px) {
    .dropdown-wrapper {
        padding-right: 0.5rem;
        padding-left: 0.5rem;
    }
}
</style>
