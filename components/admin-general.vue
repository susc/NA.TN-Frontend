<template>
    <b-container>

        <el-card class="box-card mt-5">
            <div slot="header" class="clearfix">
                <span>系统概况</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <div class="item-list">
                <p>当前总链接数：{{ linkCount }}</p>
                <p>当前总点击数：{{ clickCount }}</p>
                <p>当前用户总数：{{ userCount }}</p>
            </div>
        </el-card>

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
.item-list{
    font-size: 15px;
    color: #666
}
</style>
