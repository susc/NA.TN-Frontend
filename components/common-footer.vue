<template>
    <div>
        <!--
        <div class="footer bg-dark text-center py-1" id="footer">
            <p class="my-3"><font-awesome-icon :icon="['far', 'copyright']" />2017-{{ currentYear }} <nuxt-link to="/">NA.TN 短链接服务</nuxt-link> — All Rights Reserved.</p>
        </div>-->
        <b-container>
            <hr>
            <center>
                <p class="my-4 text-muted"><font-awesome-icon :icon="['far', 'copyright']" />2017-{{ currentYear }} <nuxt-link to="/" style="color: black;">NA.TN 短链接服务</nuxt-link> — All Rights Reserved.</p>
            </center>
        </b-container>
    </div>
</template>

<script>
export default {
    name: "common-footer",
    data: function () {
        var date = new Date();
        return {
            currentYear: date.getFullYear()
        }
    }
}
</script>

<style scoped>
p {
    font-size: 14px;
}
/*@media (min-width: 768px) {
    .footer {
        position: fixed;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1030;
    }
}*/
</style>
