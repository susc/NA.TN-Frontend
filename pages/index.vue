<template>
  <div>
    <!-- 公共头部 -->
    <common-header></common-header>

    <!-- 表单主体 -->
    <form-main></form-main>

    <!-- 结果 -->
    <!-- <result></result> -->

    <!-- 声明 -->
    <!--<div class="container">
      <statements></statements>
    </div>-->

    <!-- 统计 -->
    <index-counter></index-counter>

    <!-- 友情链接 -->
    <friendship-links>
    </friendship-links>

    <!-- 高度占位 -->
    <!--<div class="iloveyou"></div>-->

    <!-- 公共尾部 -->
    <common-footer></common-footer>
  </div>
</template>

<script>
const CommonHeader = () => import('~/components/common-header.vue');
const FormMain = () => import('~/components/form-main.vue');
//const Result = () => import('~/components/result.vue');
//const Statements = () => import('~/components/statements.vue');
const FriendshipLinks = () => import('~/components/friendship-links.vue');
const CommonFooter = () => import('~/components/common-footer.vue');
const IndexCounter = () => import('~/components/index-counter.vue');

export default {
  //components: {CommonFooter, Statements, Result, FormMain, CommonHeader, FriendshipLinks, IndexCounter},
  components: {CommonFooter, FormMain, CommonHeader, FriendshipLinks, IndexCounter},
}
</script>

<style>

</style>
