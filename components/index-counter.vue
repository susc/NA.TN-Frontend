<template>
    <b-container class="mt-5">
        <div class="row">
            <div class="col-md-6">
                <b-container>
                    <p>已生成 <span class="text-danger" id="links">0</span> 个短链接</p>
                </b-container>
            </div>
            <div class="col-md-6">
                <b-container>
                    <p>已服务 <span class="text-danger" id="clicks">0</span> 次点击</p>
                </b-container>
            </div>
        </div>
    </b-container>
</template>

<script>
import Vue from 'vue'
import AnimeJs from 'animejs'

export default {
    name: 'index-counter',
    data () {
        return {
            linkCount: 0,
            clickCount: 0
        }
    },
    mounted () {
        Vue.http.get('https://api.na.tn/shorturl/?action=getCounts', {timeout: 10000}).then(
            (res) => {
                this.linkCount = res.body.data.links
                this.clickCount = res.body.data.clicks
                AnimeJs({
                    targets: '#links',
                    innerHTML: this.linkCount,
                    round: 1,
                    easing: 'easeInOutExpo'
                });
                AnimeJs({
                    targets: '#clicks',
                    innerHTML: this.clickCount,
                    round: 1,
                    easing: 'easeInOutExpo'
                });
            },
            () => {
                this.$notify.error({
                    title: '错误',
                    message: '统计数据加载失败，请刷新页面重试',
                    duration: 0
                });
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
