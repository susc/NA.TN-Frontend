<template>
    <b-container>

        <el-card class="box-card mt-5">
            <div slot="header" class="clearfix">
                <span>链接管理</span>
                <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
            </div>
            <el-table ref="filterTable" :data="linkitems" style="width: 100%">
                    <el-table-column prop="id" label="链接ID" width="80"></el-table-column>
                    <el-table-column prop="url" label="原网址" width="330">
                    
                    </el-table-column>
                    <el-table-column prop="code" label="代号" width="80"></el-table-column>
                    <el-table-column prop="alias" label="别名" width="80"></el-table-column>
                    <el-table-column prop="date_added" label="创建日期" width="200"></el-table-column>
                    <el-table-column prop="uid" label="用户ID" width="80"></el-table-column>
                    <el-table-column prop="st" label="点击数" width="80"></el-table-column>
                    <el-table-column prop="mode" label="跳转模式"></el-table-column>
                </el-table>

                <div class="paginationblock mt-3 ml-1" v-if="linkCount!=0">
                    <el-pagination @current-change="HandlePageChange" :current-page.sync="currentPage" :page-size="10" layout="prev, pager, next, jumper" :total="linkCount"></el-pagination>
                </div>
        </el-card>

    </b-container>
</template>

<script>
import Vue from 'vue'
export default {
    data() {
        return {
            linkitems: [],
            linkCount: 0,
            currentPage: 1
        }
    },
    created() {
        this.GetLinksByPage(1,10)
        this.GetCounts()
    },
    methods: {
        GetLinksByPage(page, itemsperpage){
            Vue.http.get('https://api.na.tn/shorturl/?action=getlinks&page='+page+'&items='+itemsperpage, {timeout: 10000}).then(
                (res) => {
                    this.linkitems=res.body.data;
                    console.log(this.linkitems);
                },
                () => {
                    this.linkitems=[]
                }
            )   
        },
        GetCounts(){
            Vue.http.get('https://api.na.tn/shorturl/?action=getCounts', {timeout: 10000}).then(
                (res) => {
                    this.linkCount=parseInt(res.body.data.links)
                    console.log(this.linkCount)
                },
                () => {
                    return 0
                }
            )   
        },
        HandlePageChange(page){
            this.GetLinksByPage(page, 10)
        }
    },
}
</script>

<style scoped>
</style>