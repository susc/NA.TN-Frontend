<template>
    <div class="result" v-if="status !== ''">
        <div class="result-title" v-if="status === 'success'">
            <span class="result-success"><font-awesome-icon :icon="['fas', 'check-circle']" class="text-success"/><span style="margin-left: 10px; font-weight: 300;">创建成功</span></span>
        </div>
        <div class="result-title" v-else>
            <span class="result-error"><font-awesome-icon :icon="['fas', 'times-circle']" class="text-danger"/><span style="margin-left: 10px; font-weight: 300;">创建失败</span></span>
        </div>
        <div class="container" v-if="status === 'success'">
            <div class="row align-items-center">
                <div class="col-md-6 left">
                    <div class="container">
                        <form>
                            <div class="form-group position-relative">
                                <label>短链接</label>
                                <input type="text" class="form-control" readonly v-model="shortUrl" id="resultshorturl">
                                <font-awesome-icon :icon="['fas', 'copy']" class="position-absolute" @click="copy('resultshorturl')" />
                            </div>
                            <div class="form-group position-relative">
                                <label>原始链接</label>
                                <input type="text" class="form-control" v-model="url" id="resulturl" readonly>
                                <small class="form-text text-muted">点击右边的小图标可以轻松复制链接~</small>
                                <font-awesome-icon :icon="['fas', 'copy']" class="position-absolute" @click="copy('resulturl')" />
                            </div>
                        </form>
                    </div>
                </div>
                <div class="col-md-6 right">
                    <div class="container">
                        <h3 class="text-center">二维码</h3>
                        <div id="qrcode" class="shadow-sm">
                            <qrcode v-if="shortUrl != ''" :value="shortUrl" :options="{ width: 256, margin: 0 }" tag="img"></qrcode>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" v-else>
            <p class="text-muted h5 error-reason">{{ errorReason }}</p>
        </div>
    </div>
</template>

<script>
import bus from '~/assets/bus.js'

export default {
    name: "result",
    data: function () {
        return {
            url: '',
            shortUrl: '',
            status: '',
            errorReason: ''
        }
    },
    methods:{
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
        }
    },
    mounted: function () {
        bus.$on('postStatus', status => {
            this.status = status;
        });
        bus.$on('postShortUrl', shortUrl => {
            this.shortUrl = shortUrl;
        });
        bus.$on('postUrl', url => {
            this.url = url;
        });
        bus.$on('postErrorReason', errorReason => {
            this.errorReason = errorReason;
        })
    }
}
</script>

<style>
@media (min-width: 768px) {
    .result .right {
        border-left: 1px solid #DDD;
    }
}

.result-title {
    max-width: 500px;
    margin: 0 auto;
    padding: 20px;
    text-align: center;
}

.result-success {
    font-size: 2.5rem;
}

.result-error {
    font-size: 2.5rem;
}

.error-reason {
    text-align: center;
    margin: 50px 0 100px;
    font-weight: 300;
}

.result .form-group svg {
    right: 10px;
    top: 2.77rem;
    cursor: pointer;
}

#qrcode {
    /* 256+20 */
    width: 276px;
    padding: 10px;
    margin: 0 auto;
}
</style>
