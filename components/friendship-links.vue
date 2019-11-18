<template>
    <b-container class="mt-5">
        <h5 class="fl-title pb-3 pl-4">
            <font-awesome-icon :icon="['fas', 'heart']" class="text-danger" />
            友情链接
            <small class="fl-apply">
                <b-link href="mailto:fl_apply@na.tn" style="text-decoration-line: none;">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                    申请友情链接
                </b-link>
            </small>
        </h5>
        
        <b-container>
            <b-nav v-if="flinks!=[]">
                <b-nav-item v-for="link in flinks" :key="link.id" :href="link.url" :target="link.new_window? '_blank': ''">{{ link.title }}</b-nav-item>
            </b-nav>
        </b-container>
    </b-container>
</template>

<script>
import Vue from 'vue'

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
                    message: '友情链接加载失败'
                });
                this.flinks = [];
            }
        )
    }
}
</script>

<style scoped>
.fl-title {
    border-bottom: 1px solid #DDD;
}

.fl-apply {
    float: right;
}
</style>
