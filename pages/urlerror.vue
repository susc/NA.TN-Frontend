<template>
  <div class="pt-8 px-4 flex justify-center">
    <div class="w-full max-w-6xl bg-white rounded shadow-sm p-4">
      <div class="my-4 sm:flex">

        <div class="flex justify-center">
          <embed class="w-48 h-48 sm:ml-4 sm:mr-8" src="https://static.ewrt.top/linksystem/public/svg/urlerror_error.svg">
        </div>

        <div class="mt-4">
          <h1 class="text-center text-xl sm:text-left">错误</h1>
          <p class="text-center text-sm mt-3 sm:text-left">您访问的链接不存在 <nuxt-link class="text-blue-600" to="/">返回首页</nuxt-link></p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
    export default {

        name: "urlerror",
      head() {
          return {
            title: '错误 - NA.TN 短链接服务'
          }
      }
    }
</script>

<style scoped>

</style>
