<template>
    <div class="statements">
        <b-card header-tag="header" class="mb-3 shadow-sm" header-bg-variant="primary" header-text-variant="white">
            <h2 class="h6 mb-0" slot="header">
                <font-awesome-icon :icon="['fas', 'exclamation-circle']" />
                免责声明
            </h2>
            <p class="text-secondary mb-0">本站短链接均由用户生成，所跳转网站内容均与本站无关! 其一切因使用本服务而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），NA.TN 短链接服务对其概不负责，亦不承担任何法律责任。</p>
        </b-card>

        <b-card header-tag="header" header-bg-variant="danger" header-text-variant="white" class="shadow-sm">
            <h2 class="h6 mb-0" slot="header">
                <font-awesome-icon :icon="['fas', 'exclamation-triangle']" />
                滥用举报
            </h2>
            <p class="text-secondary mb-0">
                如发现滥用现象，欢迎发送邮件至
                <b-link href="mailto:abuse@na.tn" style="text-decoration-line: none;">
                    <font-awesome-icon :icon="['far', 'envelope']" />
                    abuse@na.tn
                </b-link>
                进行举报
            </p>
        </b-card>
    </div>
</template>

<script>
import Vue from 'vue'
import { Card } from 'element-ui'

Vue.use(Card)

export default {

}
</script>

<style>
.info-title {
    background: #409EFF;
    color: white;
}

.statements {
    margin-top: 48px;
}
</style>
