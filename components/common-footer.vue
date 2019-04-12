<template>
    <div class="footer bg-dark text-center py-1" id="footer">
        <p class="my-3">© 2017-{{ currentYear }} <a href="/">NA.TN 短链接服务</a> — All Rights Reserved.</p>
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

<style>
.footer {
    color: #fff;
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
