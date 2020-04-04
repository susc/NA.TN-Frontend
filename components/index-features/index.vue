<template>
  <div class="pt-8 px-4 flex justify-center">
    <div class="w-full max-w-6xl bg-white rounded shadow-sm p-4">
      <div class="sm:flex sm:justify-between sm:items-center">
        <h1 class="text-lg text-gray-800">功能特性</h1>
        <p class="text-sm text-gray-600">更多功能，等你探索</p>
      </div>

      <div class="mb-4 sm:flex sm:flex-wrap">
        <FeatureCard v-for="feature in featuresList" :key="feature.id" :title="feature.title" :desc="feature.desc"
                     :icon="feature.icon"/>
      </div>
    </div>
  </div>
</template>

<script>
  import FeatureCard from "./feature-card";

  export default {
    name: "index",
    components: {FeatureCard},
    data() {
      return {
        featuresList: [
          {
            id: 1,
            title: '链接安全',
            desc: '我们通过链接安全检测系统为您的链接安全保驾护航',
            icon: 'https://static.ewrt.top/linksystem/public/svg/feature_security.svg'
          },
          {
            id: 2,
            title: '简单易用',
            desc: '只需一键即可生成专属于你的短链接',
            icon: 'https://static.ewrt.top/linksystem/public/svg/feature_happy.svg'
          },
          {
            id: 3,
            title: '加密跳转',
            desc: '你可以给短链接加上密码，无惧链接内容泄露',
            icon: 'https://static.ewrt.top/linksystem/public/svg/feature_password.svg'
          },
          {
            id: 4,
            title: '随时修改',
            desc: '你可以随时修改短链接的目标地址',
            icon: 'https://static.ewrt.top/linksystem/public/svg/feature_settings.svg'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
