<template>
    <div>
        <common-header></common-header>
        <div class="urlerrortips container mt-5">
            <center class="h1"><font-awesome-icon :icon="['fas', 'info-circle']" class="text-info mr-2"/>提示</center>
            <center class="mt-5 text-secondary">您访问的链接不存在</center>
            <center class="mt-3 text-secondary">请<nuxt-link to="/">返回首页</nuxt-link></center>
        </div>
        <div class="iloveyou"></div>
        <common-footer></common-footer>
    </div>
</template>

<script>
const CommonHeader = () => import('~/components/common-header.vue');
const CommonFooter = () => import('~/components/common-footer.vue');

export default {
    components: { CommonFooter, CommonHeader }
}
</script>

<style>

</style>
