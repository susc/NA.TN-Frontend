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
            <b-nav>
                <slot></slot>
            </b-nav>
        </b-container>
    </b-container>
</template>

<script>
export default {
    
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
