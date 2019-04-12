<template>
    <div class="nabbar-wrapper">
        <b-navbar toggleable="md" class="bg-light shadow-sm">
            <b-navbar-brand href="./">
                NA.TN 短链接服务
                <b-badge variant="primary">管理中心</b-badge>
            </b-navbar-brand>
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav>
                    <b-nav-item href="/admin">
                        <font-awesome-icon :icon="['fas', 'home']" />
                        后台首页
                    </b-nav-item>
                    <b-nav-item href="/">
                        <font-awesome-icon :icon="['fas', 'home']" />
                        网站首页
                    </b-nav-item>
                </b-navbar-nav>

                <b-navbar-nav class="ml-auto">
                    <b-nav-text>欢迎你</b-nav-text>
                    <b-nav-item-dropdown right>
                        <template slot="button-content">
                            <em>admin</em>
                        </template>
                        <b-dropdown-item href="#"><font-awesome-icon :icon="['fas', 'link']" class="text-primary mr-2"/>我的链接</b-dropdown-item>
                        <b-dropdown-item href="#"><font-awesome-icon :icon="['fas', 'cog']" class="text-dark mr-2"/>账号设置</b-dropdown-item>
                        <b-dropdown-divider></b-dropdown-divider>
                        <b-dropdown-item><font-awesome-icon :icon="['fas', 'sign-out-alt']" class="text-danger mr-2"/>退出登录</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
