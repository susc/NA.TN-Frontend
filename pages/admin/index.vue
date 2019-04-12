<template>
    <div>
        <admin-header></admin-header>
        <admin-general></admin-general>
    </div>
</template>

<script>
const AdminHeader = () => import('~/components/admin-header.vue');
const AdminGeneral = () => import('~/components/admin-general.vue');

export default {
  components: {AdminHeader, AdminGeneral}
}
</script>

<style>

</style>
