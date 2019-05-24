<template>
    <div class="form-wrapper">
        <div class="container">
            <b-card header-tag="header" class="form-card shadow-sm" header-bg-variant="dark" header-text-variant="white">
                <h6 slot="header" class="mb-0 form-title">
                    <font-awesome-icon :icon="['fas', 'link']" />
                    生成短链接
                </h6>
                
                <b-form @reset="onReset" v-loading="isProcessing">
                    <b-form-group id="realUrlInputGroup" description="必填，我们将帮您缩短它">
                        <label for="realUrlInput">原始链接<sup><span class="text-danger">*</span></sup></label>
                        <b-form-input id="realUrlInput" type="text" v-model="url" required placeholder="请输入原始链接"></b-form-input>
                    </b-form-group>
                    <b-form-group id="aliasInputGroup" label="自定义后缀" label-for="aliasInput" description="选填">
                        <b-input-group prepend="https://na.tn/" class="mb-2 mr-sm-2 mb-sm-0">
                            <b-input type="text" id="aliasInput" v-model="alias" placeholder="您可以自定义链接后缀"></b-input>
                        </b-input-group>
                    </b-form-group>
                    <b-form-group id="modeInputGroup" :description="'必填'+(modeDescription==''?'':('（'+modeDescription+'）'))">
                        <label for="modeInput">跳转模式<sup><span class="text-danger">*</span></sup></label>
                        <b-form-select v-model="selectedMode" :options="mode"></b-form-select>
                    </b-form-group>
                    <b-button type="button" class="mr-2" @click="handleShorten" variant="primary" :disabled="isProcessing">生成</b-button>
                    <b-button type="reset" variant="danger" :disabled="!(url !== '' || alias !=='')">重置</b-button>
                </b-form>
            </b-card>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
//引入公共事件总线
import bus from '~/assets/bus.js'

export default {
    name: "form-main",
    data: function () {
        return {
            url: '',
            alias: '',
            isProcessing: false,
            status: '',
            shortUrl: '',
            errorReason: '',
            mode: [
                {value: "default", text: "直接跳转"},
                {value: "wechat", text: "微信模式"}
            ],
            selectedMode: "default"
        }
    },
    computed: {
        modeDescription () {
            if (this.selectedMode == "wechat") {
                return "测试功能，该模式能使微信内置浏览器调用外部浏览器打开链接"
            }
            return ""
        }
    },
    methods: {
        handleShorten: function () {
            this.isProcessing = true;
            var email = this.$cookie.get('email')
            var token = this.$cookie.get('token')

            if (this.url == '') {
                this.status = 'error';
                this.errorReason = '请输入一个URL';
                bus.$emit('postStatus', this.status);
                const _this = this;
                Vue.nextTick(function () {
                    bus.$emit('postErrorReason', _this.errorReason);
                })
                this.isProcessing = false;
                return;
            }

            const body = {
                action: 'shorten',
                url: this.url,
                alias: this.alias,
                email: email,
                token: token,
                mode: this.selectedMode
            };
            this.$http.post('https://api.na.tn/shorturl/', body, {emulateJSON: true, timeout: 10000}).then(
                response => {
                    if(response.body.code === 200){
                        this.status = 'success';
                        this.shortUrl = response.body.data.short_url;
                        bus.$emit('postStatus', this.status);
                        const _this = this;
                        Vue.nextTick(function () {
                            bus.$emit('postShortUrl', _this.shortUrl);
                            bus.$emit('postUrl', _this.url);
                        })
                    }else{
                        this.status = 'error';
                        if(response.body.message){
                            this.errorReason = response.body.message;
                        }else{
                            this.errorReason = '系统错误';
                        }
                        bus.$emit('postStatus', this.status);
                        const _this = this;
                        Vue.nextTick(function () {
                            bus.$emit('postErrorReason', _this.errorReason);
                        })
                    }
                    this.isProcessing = false;
                },
                response=> {
                    this.status = 'error';
                    if(response.body.message){
                        this.errorReason = response.body.message;
                    }else{
                        this.errorReason = '系统错误';
                    }
                    bus.$emit('postStatus', this.status);
                    const _this = this;
                    Vue.nextTick(function () {
                        bus.$emit('postErrorReason', _this.errorReason);
                    });
                    this.isProcessing = false;
                }
            );
        },
        onReset: function () {
            this.url = '';
            this.alias = '';
        }
    }
}
</script>

<style scoped>
    .form-wrapper {
        margin-top: 3rem;
    }
</style>