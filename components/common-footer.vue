<template>
    <div>
        <b-container>
            <el-divider></el-divider>
            <div class="footer-content">
                <p id="footer-left" class="text-muted small">© 2017-{{ currentYear }} <nuxt-link to="/">NA.TN 短链接服务</nuxt-link> — All Rights Reserved.</p>
                <span id="footer-right" class="text-muted small">
                    <a @click="showDisclaimer">免责声明</a>
                    |
                    <el-popover
                        placement="top-end"
                        title="滥用举报"
                        width="256"
                        trigger="click">
                        <p>如发现滥用现象，欢迎发送邮件至<a href="mailto:abuse@na.tn">abuse@na.tn</a>进行举报</p>
                        <a slot="reference">滥用举报</a>
                    </el-popover>
                    |
                    <a href="mailto:fl_apply@na.tn">申请友链</a>
                </span>
            </div>
        </b-container>
    </div>
</template>

<script>
import Vue from 'vue'
import { Divider, Popover } from 'element-ui'

Vue.use(Divider)
Vue.use(Popover)

export default {
    name: "common-footer",
    data: function () {
        var date = new Date();
        return {
            currentYear: date.getFullYear(),
            disclaimerText: '本站短链接均由用户生成，所跳转网站内容均与本站无关! 其一切因使用本服务而可能遭致的意外、疏忽、侵权及其造成的损失（包括因下载被搜索链接到的第三方网站内容而感染电脑病毒），NA.TN 短链接服务对其概不负责，亦不承担任何法律责任。',
        }
    },
    methods: {
        showDisclaimer() {
            this.$alert(this.disclaimerText, '免责声明', {
                showClose: false,
                confirmButtonText: '确定'
            });
        }
    },
}
</script>

<style scoped>
.footer-content {
    position: relative;
}

#footer-right {
    display: inline;
}

#footer-left, #footer-right {
    text-align: center;
}

#footer-left a {
    color: black;
}

#footer-right a {
    cursor: pointer;
    color: black;
}

#footer-right a:hover {
    text-decoration: underline;
}

@media (min-width: 768px) {
    #footer-left {
        float: left;
    }

    #footer-right {
        float: right;
    }
}
</style>
