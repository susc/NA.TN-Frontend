<template>
    <div>
        <admin-header></admin-header>
        <admin-general></admin-general>
        <admin-link></admin-link>
    </div>
</template>

<script>
const AdminHeader = () => import('~/components/admin-header.vue');
const AdminGeneral = () => import('~/components/admin-general.vue');
const AdminLink = () => import('~/components/admin-link.vue');

export default {
  components: { AdminHeader, AdminGeneral, AdminLink }
}
</script>

<style>

</style>
