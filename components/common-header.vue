<template>
  <header class="bg-white p-4 shadow-sm">
    <div class="flex justify-between">
      <div class="flex justify-center">
        <a class="flex justify-center" href="/">
          <img class="block w-6 h-6" src="/logo.jpg" alt="LOGO">
          <h1 class="block ml-2 text-lg m-0">NA.TN 短链接服务</h1>
        </a>
      </div>

      <div class="hidden sm:block text-gray-800 flex items-center">
        <button @click="showDeveloping" class="mr-4 transition ease-linear duration-200 hover:text-blue-600 focus:outline-none cursor-pointer">API 接口</button>
        <a class="transition ease-linear duration-200 hover:text-blue-600 focus:outline-none" href="mailto:info@na.tn">联系我们</a>
      </div>
    </div>
  </header>
</template>

<script>
  import Swal from 'sweetalert2'

  export default {
    name: "common-header",
    methods: {
      showDeveloping() {
        Swal.fire({
          icon: 'info',
          title: '提示',
          text: '开发中，敬请期待',
          confirmButtonText: '确认',
          buttonsStyling: false,
          customClass: {
            confirmButton: 'shadow-md my-3 px-8 tracking-widest bg-indigo-500 py-3 rounded text-white text-sm transition ease-linear duration-200 focus:outline-none hover:bg-indigo-700 active:bg-indigo-900'
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
