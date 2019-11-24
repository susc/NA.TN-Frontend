<template>
    <b-container class="mt-5">
        <el-collapse-transition>
            <div v-show="flinks != []">
                <!--<h5 v-if="flinks !== []" class="fl-title pb-3 pl-4">
                    <font-awesome-icon :icon="['fas', 'heart']" class="text-danger" />
                    友情链接
                    <small class="fl-apply">
                        <b-link href="mailto:fl_apply@na.tn" style="text-decoration-line: none;">
                            <font-awesome-icon :icon="['far', 'envelope']" />
                            申请友情链接
                        </b-link>
                    </small>
                </h5>-->
                
                <el-divider v-if="flinks != []">
                    <font-awesome-icon :icon="['fas', 'heart']" class="text-danger" />
                    <span>友情链接</span>
                </el-divider>

                <!--<b-container class="flinks" v-if="flinks !== []">
                    <b-nav v-if="flinks!=[]">
                        <b-nav-item v-for="link in flinks" :key="link.id" :href="link.url" :target="link.new_window? '_blank': ''">{{ link.title }}</b-nav-item>
                    </b-nav>
                </b-container>-->

                <el-row>
                    <el-col :sm="{span: 6}" :span="12" v-for="link in flinks" :key="link.id">
                        <div class="flink-content">
                            <el-link :underline="false" :href="link.url" :target="link.new_window? '_blank': ''">{{ link.title }}</el-link>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-collapse-transition>
    </b-container>
</template>

<script>
import Vue from 'vue'
import { Divider, Row, Col, Link } from 'element-ui'

Vue.use(Divider)
Vue.use(Row)
Vue.use(Col)
Vue.use(Link)

export default {
    data() {
        return {
            flinks: []
        }
    },
    mounted() {
        Vue.http.get('https://api.na.tn/shorturl/?action=getfriendshiplinks', {timeout: 10000}).then(
            (res) => {
                this.flinks = res.body.data;
            },
            (res) => {
                this.$notify.error({
                    title: '错误',
                    message: '友情链接加载失败，请刷新页面重试',
                    duration: 0
                });
                this.flinks = [];
            }
        )
    }
}
</script>

<style scoped>
.flinks {
    font-size: 15px;
}

.flink-content {
    margin: 0 10px;
    text-align: center;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
</style>
