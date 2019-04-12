<template>
    <b-container class="mt-5" v-if="linkCount!=0">
        <div class="row">
            <div class="col-md-6">
                <b-container>
                    <p>已生成 <span class="text-danger">{{ linkCount }}</span> 个短链接</p>
                </b-container>
            </div>
            <div class="col-md-6">
                <b-container>
                    <p>已服务 <span class="text-danger">{{ clickCount }}</span> 次点击</p>
                </b-container>
            </div>
        </div>
    </b-container>
</template>

<script>
import Vue from 'vue'

export default {
    name: 'index-counter',
    data () {
        return {
            linkCount: 0,
            clickCount: 0
        }
    },
    created () {
        Vue.http.get('https://api.na.tn/shorturl/?action=getCounts', {timeout: 10000}).then(
            (res) => {
                this.linkCount = res.body.data.links
                this.clickCount = res.body.data.clicks
            },
            () => {
                return 0
            }
        )
    }
}
</script>

<style scoped>
p {
    text-align: center;
    font-size: 18px;
    font-weight: 300;
}

p > span {
    font-weight: 700;
    font-size: 24px;
}
</style>
