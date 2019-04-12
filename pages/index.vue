<template>
  <div>
    <!-- 公共头部 -->
    <common-header></common-header>

    <!-- 表单主体 -->
    <form-main></form-main>

    <!-- 结果 -->
    <result></result>

    <!-- 声明 -->
    <div class="container">
      <statements></statements>
    </div>

    <!-- 统计 -->
    <index-counter></index-counter>

    <!-- 友情链接 -->
    <friendship-links v-if="flinks!=[]">
      <b-nav-item v-for="link in flinks" :key="link.id" :href="link.url" :target="link.new_window? '_blank': ''">{{ link.title }}</b-nav-item>
    </friendship-links>

    <!-- 高度占位 -->
    <div class="iloveyou"></div>

    <!-- 公共尾部 -->
    <common-footer></common-footer>
  </div>
</template>

<script>
import Vue from 'vue'
const CommonHeader = () => import('~/components/common-header.vue');
const FormMain = () => import('~/components/form-main.vue');
const Result = () => import('~/components/result.vue');
const Statements = () => import('~/components/statements.vue');
const FriendshipLinks = () => import('~/components/friendship-links.vue');
const CommonFooter = () => import('~/components/common-footer.vue');
const IndexCounter = () => import('~/components/index-counter.vue');

export default {
  components: {CommonFooter, Statements, Result, FormMain, CommonHeader, FriendshipLinks, IndexCounter},
  asyncData () {
    return Vue.http.get('https://api.na.tn/shorturl/?action=getfriendshiplinks', {timeout: 10000}).then(
      (res) => {
        return { flinks: res.body.data }
      },
      () => {
        return {flinks: []}
      }
    )
  }
}
</script>

<style>

</style>
