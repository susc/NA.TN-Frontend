<template>
  <div class="pt-8 px-4 flex justify-center">
    <div class="w-full max-w-6xl bg-white rounded shadow-sm p-4">
      <h1 class="text-lg text-gray-800">生成结果</h1>
      <div class="flex my-4">
        <img class="w-24 h-24" v-if="qrurl !== ''" :src="qrurl" alt="QR-Code"/>
        <div class="ml-4 text-sm">
          <a class="text-blue-600" :href="s_url" target="_blank">{{s_url}}</a>
          <p class="text-gray-600 break-all">原始链接：{{url}}</p>
          <p class="text-gray-600 break-all">过期时间：{{exp_date}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import QRCode from 'qrcode'

  export default {
    name: "index-result",
    props: [
      'url',
      's_url',
      'exp_date'
    ],
    data() {
      return {
        qrurl: ''
      }
    },
    watch: {
      s_url(val, old) {
        QRCode.toDataURL(val, {
          margin: 0
        },(err, result) => {
          this.qrurl = result
        })
      }
    }
  }
</script>

<style scoped>

</style>
