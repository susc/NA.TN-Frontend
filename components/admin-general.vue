<template>
    <b-container>
        <b-card header-tag="header" class="shadow-sm mt-5" header-bg-variant="info" header-text-variant="white">
            <h2 class="h6 mb-0" slot="header">
                <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                系统概况
            </h2>
            <div>
                <p>当前总链接数：{{ linkCount }}</p>
                <p>当前总点击数：{{ clickCount }}</p>
                <p>当前用户总数：{{ userCount }}</p>
            </div>
        </b-card>
    </b-container>
</template>

<script>
import Vue from 'vue'

export default {
    data() {
        return {
            //链接数
            linkCount: '',
            //点击数
            clickCount: '',
            //用户数
            userCount: ''
        }
    },
    created() {
        //获取连接数和点击数
        Vue.http.get('https://api.na.tn/shorturl/?action=getCounts', {timeout: 10000}).then(
            (res) => {
                this.linkCount = res.body.data.links
                this.clickCount = res.body.data.clicks
            },
            () => {
                this.linkCount = '获取失败'
                this.clickCount = '获取失败'
            }
        )
        //获取用户数
        Vue.http.get('https://api.na.tn/shorturl/?action=getUserCount', {timeout: 10000}).then(
            (res) => {
                this.userCount = res.body.data.count
            },
            () => {
                this.userCount = '获取失败'
            }
        )
    },
}
</script>

<style>

</style>
