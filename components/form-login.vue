<template>
    <div>
        <div class="container mt-5">
            <b-row class="justify-content-md-center">
                <b-col col md="6">
                    <b-card header-tag="header" class="form-card shadow-sm " header-bg-variant="light" header-text-variant="black">
                        <h6 slot="header" class="mb-0 form-title">
                            <font-awesome-icon :icon="['fas', 'sign-in-alt']" />
                            登录
                        </h6>
                        <b-form @reset="onReset" @submit.prevent="handleLogin">
                            <b-form-group id="emailGroup" label="电子邮箱：" label-for="emailInput">
                                <b-form-input id="emailInput" type="email" @input="clearEmailAlert" v-model="email" required placeholder="请输入您的电子邮箱">
                                </b-form-input>
                                <transition name="page">
                                    <small class="text-danger" v-if="emailAlert != ''">{{ emailAlert }}</small>
                                </transition>
                            </b-form-group>
                            <b-form-group id="passwordGroup" label="密码：" label-for="passwordInput">
                                <b-form-input id="passwordInput" type="password" @input="clearPasswordAlert" v-model="password" required placeholder="请输入您的密码">
                                </b-form-input>
                                <transition name="page">
                                    <small class="text-danger" v-if="passwordAlert != ''">{{ passwordAlert }}</small>
                                </transition>
                            </b-form-group>
                            <b-button type="submit" variant="primary">登录</b-button>
                            <transition name="page">
                                <b-button type="reset" variant="danger" v-show="showReset">重置</b-button>
                            </transition>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </div>
        
        <b-modal ref="loginFailedModal" hide-footer hide-header lazy>
            <div class="d-block text-center">
                <h3 class="h2 my-4"><font-awesome-icon :icon="['fas', 'times-circle']" class="mr-3 text-danger"/>登录失败!</h3>
                <p class="mt-3 text-secondary">{{ loginFailedReason }}</p>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideLoginFailedModal">关闭</b-btn>
        </b-modal>
    </div>
</template>

<script>
import md5 from 'js-md5'

export default {
    name: 'form-login',
    methods: {
        onReset: function() {
            this.email = '',
            this.password = '',
            this.emailAlert = '',
            this.passwordAlert = ''
        },
        handleLogin: function() {
            if(!this.checkEmail()) {
                this.emailAlert = '请输入一个正确的电子邮箱';
            }
            if(!this.checkPassword()) {
                this.passwordAlert = '请输入一个至少为6位的合法密码';
            }
            if(this.checkEmail() && this.checkPassword()) {
                var encodedPassword = md5(String(this.password));
                encodedPassword = String(encodedPassword).toUpperCase();
                var postdata = {
                    email: this.email,
                    password: encodedPassword
                }
                postdata = JSON.stringify(postdata);
                postdata = window.btoa(String(postdata));
                const body = {
                    action: 'login',
                    data: postdata
                }
                this.$http.post('https://api.na.tn/shorturl/', body, {emulateJSON: true, timeout: 5000}).then(
                    response => {
                        if(response.body.code == 200) {
                            this.$cookie.set('email', this.email, {expires: 7})
                            this.$cookie.set('token', response.body.data.token, {expires: 7})
                            this.$message({
                                type: 'success',
                                message: '登录成功!'
                            });
                            window.location.href = '/'
                        }else{
                            this.loginFailedReason = response.body.message;
                            this.showLoginFailedModal();
                        }
                    },
                    response => {
                        this.loginFailedReason = '系统错误';
                        this.showLoginFailedModal();
                    }
                )
            }
        },
        //验证邮箱合法性
        checkEmail: function() {
            return String(this.email).match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/);
        },
        //验证密码合法性
        checkPassword: function() {
            return String(this.password).match(/\S{6}/);
        },
        clearEmailAlert: function() {
            this.emailAlert = '';
        },
        clearPasswordAlert: function() {
            this.passwordAlert = '';
        },
        showLoginFailedModal () {
            this.$refs.loginFailedModal.show()
        },
        hideLoginFailedModal () {
            this.$refs.loginFailedModal.hide()
        }
    },
    data: function() {
        return {
            email: '',
            password: '',
            emailAlert: '',
            passwordAlert: '',
            isProcessing: false,
            loginFailedReason: ''
        }
    },
    computed: {
        showReset: function() {
            if(this.email != '' || this.password != '' || this.passwordAlert != '' || this.emailAlert != '') {
                return true;
            }else{
                return false;
            }
        }
    }
}
</script>

<style>

</style>
