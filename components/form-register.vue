<template>
    <div>
        <div class="container mt-5">
            <b-row class="justify-content-md-center">
                <b-col col md="6">
                    <b-card header-tag="header" class="form-card shadow-sm" header-bg-variant="light" header-text-variant="black">
                        <h6 slot="header" class="mb-0 form-title">
                            <font-awesome-icon :icon="['fas', 'user-plus']" />
                            注册
                        </h6>
                        <b-form @reset="onReset" @submit.prevent="handleRegister">
                            <b-form-group id="emailGroup" label="电子邮箱：" label-for="emailInput">
                                <b-form-input id="emailInput" type="email" @input="clearEmailAlert" v-model="email" required placeholder="请输入您的电子邮箱"></b-form-input>
                                <transition name="page">
                                    <small class="text-danger" v-if="emailAlert != ''">{{ emailAlert }}</small>
                                </transition>
                            </b-form-group>
                            <b-form-group id="passwordGroup" label="密码：" label-for="passwordInput">
                                <b-form-input id="passwordInput" type="password" @input="clearPasswordAlert" v-model="password" required placeholder="请输入您的密码"></b-form-input>
                                <transition name="page">
                                    <small class="text-danger" v-if="passwordAlert != ''">{{ passwordAlert }}</small>
                                </transition>
                            </b-form-group>
                            <b-form-group id="passwordConfirmGroup" label="确认密码：" label-for="passwordConfirmInput">
                                <b-form-input id="passwordConfirmInput" type="password" @input="clearPasswordConfirmAlert" v-model="passwordConfirm" required placeholder="请确认您的密码"></b-form-input>
                                <transition name="page">
                                    <small class="text-danger" v-if="passwordConfirmAlert != ''">{{ passwordConfirmAlert }}</small>
                                </transition>
                            </b-form-group>
                            <b-button type="submit" variant="primary">注册</b-button>
                            <transition name="page">
                                <b-button type="reset" variant="danger" v-show="showReset">重置</b-button>
                            </transition>
                        </b-form>
                    </b-card>
                </b-col>
            </b-row>
        </div>

        <b-modal ref="registerFailedModal" hide-footer hide-header lazy>
            <div class="d-block text-center">
                <h3 class="h2 my-4"><font-awesome-icon :icon="['fas', 'times-circle']" class="mr-3 text-danger"/>注册失败!</h3>
                <p class="mt-3 text-secondary">{{ registerFailedReason }}</p>
            </div>
            <b-btn class="mt-3" variant="outline-danger" block @click="hideRegisterFailedModal">关闭</b-btn>
        </b-modal>

        <b-modal ref="registerSuccessModal" hide-footer hide-header @hide="preventClose" lazy>
            <div class="d-block text-center">
                <h3 class="h2 my-4"><font-awesome-icon :icon="['fas', 'check-circle']" class="mr-3 text-success"/>注册成功!</h3>
                <p class="mt-3 text-secondary">您的登录账号是{{ email }}，请牢记</p>
            </div>
            <b-btn class="mt-3" variant="outline-success" block @click="hideRegisterSuccessModal">去登录</b-btn>
        </b-modal>
    </div>
</template>

<script>
import md5 from 'js-md5' 

export default {
    name: 'form-register',
    methods: {
        onReset: function() {
            this.email = ''
            this.password = ''
            this.passwordConfirm = ''
            this.emailAlert = ''
            this.passwordAlert = ''
            this.passwordConfirmAlert = ''
        },
        handleRegister: function() {
            if(!this.checkEmail()) {
                this.emailAlert = '请输入一个正确的电子邮箱'
            }
            if(!this.checkPassword()) {
                this.passwordAlert = '请输入一个至少为6位的合法密码'
            }
            if(!this.checkPasswordConfirm()) {
                this.passwordConfirmAlert = '两次输入的密码不一致'
            }
            if(this.checkEmail() && this.checkPassword() && this.checkPasswordConfirm()) {
                var encodedPassword = md5(String(this.password))
                encodedPassword = String(encodedPassword).toUpperCase()
                var postData = {
                    email: this.email,
                    password: encodedPassword
                }
                postData = JSON.stringify(postData)
                postData = window.btoa(String(postData))
                const body = {
                    action: 'register',
                    data: postData
                }
                this.$http.post('https://api.na.tn/shorturl/', body, {emulateJSON: true, timeout: 5000}).then(
                    response => {
                        console.log(response)
                        if(response.body.code == 200) {
                            this.showRegisterSuccessModal()
                        }else{
                            this.registerFailedReason = response.body.message;
                            this.showRegisterFailedModal()
                        }
                    },
                    response => {
                        this.registerFailedReason = '系统错误';
                        this.showRegisterFailedModal()
                    }
                )
            }
        },
        checkEmail: function() {
            return String(this.email).match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)
        },
        checkPassword: function() {
            return String(this.password).match(/\S{6}/)
        },
        checkPasswordConfirm: function() {
            return this.password == this.passwordConfirm
        },
        clearEmailAlert: function() {
            this.emailAlert = ''
        },
        clearPasswordAlert: function() {
            this.passwordAlert = ''
        },
        clearPasswordConfirmAlert: function() {
            this.passwordConfirmAlert = ''
        },
        showRegisterFailedModal () {
            this.$refs.registerFailedModal.show()
        },
        hideRegisterFailedModal () {
            this.$refs.registerFailedModal.hide()
        },
        preventClose: function(evt) {
            evt.preventDefault()
        },
        showRegisterSuccessModal() {
            this.$refs.registerSuccessModal.show()
        },
        hideRegisterSuccessModal() {
            window.location.href = '/login'
        }
    },
    data: function() {
        return {
            email: '',
            password: '',
            passwordConfirm: '',
            emailAlert: '',
            passwordAlert: '',
            passwordConfirmAlert: '',
            registerFailedReason: ''
        }
    },
    computed: {
        showReset: function() {
            if(this.email != '' || this.password != '' || this.passwordAlert != '' || this.emailAlert != '' || this.passwordConfirm != '' || this.passwordConfirmAlert != '') {
                return true
            }else{
                return false
            }
        }
    }
}
</script>

<style>

</style>
