<template>
    <div class="form-wrapper">
        <div class="container">
            <b-card header-tag="header" class="form-card shadow-sm" header-bg-variant="dark" header-text-variant="white">
                <h6 slot="header" class="mb-0 form-title">
                    <font-awesome-icon :icon="['fas', 'link']" />
                    生成短链接
                </h6>
                
                <b-form @reset="onReset" v-loading="isProcessing">
                    <b-form-group id="realUrlInputGroup">
                        <label for="realUrlInput">原始链接<sup><span class="text-danger">*</span></sup></label>
                        <el-input id="realUrlInput" type="text" v-model="url" required placeholder="请输入原始链接"></el-input>
                    </b-form-group>

                    <b-form-group id="modeInputGroup">
                        <div class="form-mode">
                            <label for="modeInput">跳转模式<sup><span class="text-danger">*</span></sup></label>
                            <div>
                                <el-select v-model="selectedMode" placeholder="请选择">
                                    <el-option
                                    v-for="item in mode"
                                    :key="item.value"
                                    :label="item.text"
                                    :value="item.value"
                                    :disabled="item.disabled">
                                    </el-option>
                                </el-select>
                            </div>
                        </div>
                    </b-form-group>

                    <b-form-group id="aliasInputGroup">
                        <div class="label" slot="label" for="aliasInput">
                            <span>自定义后缀</span>
                            <el-switch
                                v-model="useAlias"
                                active-color="#13ce66"
                                @change="handleUseAliasSwitch">
                            </el-switch>
                        </div>
                        <el-collapse-transition>
                            <div v-if="useAlias == true">
                                <el-input id="aliasInput" v-model="alias" placeholder="您可以自定义链接后缀" v-if="useAlias == true">
                                    <template slot="prepend">https://na.tn/</template>
                                </el-input>
                            </div>
                        </el-collapse-transition>
                    </b-form-group>

                    <b-button type="button" class="mr-2" @click="handleShorten" variant="primary" :disabled="isProcessing">生成</b-button>
                    <b-button type="reset" variant="danger" :disabled="!(url !== '' || alias !=='')">重置</b-button>
                </b-form>
            </b-card>
        </div>

        <!-- 结果对话框 -->
        <el-dialog
            :visible.sync="resultBoxVisible"
            :width="isMobile?'100%':'30%'"
        center>
            <span slot="title" class="dialog-footer">
                <span v-if="status=='success'">成功</span>
                <span v-else>失败</span>
            </span>
            <div class="content">
                <div v-if="status=='success'">
                    <el-form label-width="80px">
                        <el-form-item label="原始链接">
                            <el-input v-model="url" readonly id="reurl"></el-input>
                        </el-form-item>
                        <el-form-item label="短链接">
                            <el-input v-model="shortUrl" readonly id="surl"></el-input>
                        </el-form-item>
                        <div id="qrcode" class="shadow-sm">
                            <qrcode v-if="shortUrl != ''" :value="shortUrl" :options="{ width: 256, margin: 0 }" tag="img"></qrcode>
                        </div>
                    </el-form>
                </div>
                
                <div v-else>
                    <center>{{ errorReason }}</center>
                </div>
            
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="copy('reurl')" v-if="status=='success'">复制原始链接</el-button>
                <el-button @click="copy('surl')" v-if="status=='success'">复制短链接</el-button>
                <el-button  v-else type="primary" @click="resultBoxVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Vue from 'vue'
//引入公共事件总线
import bus from '~/assets/bus.js'
import md5 from 'js-md5'
import { Dialog, Button, Form, FormItem, Input, Select, Option, Switch } from 'element-ui'

Vue.use(Dialog)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(Switch)

export default {
    name: "form-main",
    data: function () {
        return {
            url: '',
            useAlias: false,
            alias: '',
            isProcessing: false,
            status: '',
            shortUrl: '',
            errorReason: '',
            mode: [
                {value: "default", text: "直接跳转"},
                {value: "wechat", text: "微信模式（暂时停止使用）", disabled: true}
            ],
            selectedMode: "default",
            resultBoxVisible: false,
            isMobile: true,
        }
    },
    computed: {
        modeDescription () {
            if (this.selectedMode == "wechat") {
                return "测试功能，该模式能使微信内置浏览器调用外部浏览器打开链接"
            }
            return ""
        },
    },
    mounted() {
        //判断是否为手机
        this.getIsMobile()
    },
    methods: {
        handleUseAliasSwitch(val) {
            if(val == false) {
                this.alias = ''
            }
        },
        getIsMobile () {
            var userAgentInfo = navigator.userAgent;
            var Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
            var flag = true;
            for (var v = 0; v < Agents.length; v++) {
                if (userAgentInfo.indexOf(Agents[v]) > 0) {
                    flag = false;
                    break;
                }
            }
            this.isMobile = !flag;
        },
        copy: function (id) {
            const url = document.location;
            if(document.execCommand){
                const el = document.getElementById(id);
                el.select();
                document.execCommand("Copy");
                this.$message({
                    showClose: true,
                    message: '复制成功',
                    type: 'success'
                })
                return true;
            }
            if(window.clipboardData) {
                window.clipboardData.setData("Text", url);
                this.$message({
                    showClose: true,
                    message: '复制成功',
                    type: 'success'
                })
                return true;
            }
            this.$message({
                    showClose: true,
                    message: '复制失败，请尝试手工复制',
                    type: 'error'
                })
            return false;
        },
        endProcessing() {
            this.isProcessing = false;
            this.resultBoxVisible = true;
        },
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

                this.endProcessing();
                return;
            }

            const body = {
                action: 'shorten',
                url: this.url,
                alias: this.alias,
                email: email,
                token: token,
                mode: this.selectedMode,
                validator: md5(String(this.url) + String(this.email) + String(this.token))
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
                    this.endProcessing();
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
                    this.endProcessing();
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

#qrcode {
    width: 256px;
    margin: 10px auto 0;
}

.label {
    position: relative;
}

.label .el-switch {
    margin-left: 1em
}

.form-mode div {
    display: inline;
}
</style>