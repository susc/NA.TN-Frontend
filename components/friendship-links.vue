<template>
  <div class="pt-8 px-4 flex justify-center">
    <div class="w-full max-w-6xl bg-white rounded shadow-sm p-4">
      <div class="sm:flex sm:justify-between sm:items-center">
        <h1 class="text-lg text-gray-800">友情链接</h1>
        <p class="text-sm text-gray-600">可爱的邻居们</p>
      </div>

      <div class="my-4 flex flex-wrap">
        <a v-for="link in friendshipLinkList"
           :target="link.new_window ? '_blank' : ''"
           :key="link.id"
           class="block px-4 py-1 my-2 bg-gray-100 rounded-full mx-2 text-center text-gray-800 transition ease-linear duration-200 hover:bg-gray-800 hover:text-white"
           :href="link.url">{{link.title}}</a>
      </div>

      <div v-if="friendshipLinkList.length === 0" class="text-center my-10">
        <p class="text-base text-gray-700">加载中...</p>
      </div>

      <div v-if="friendshipLinkList.length !== 0 && friendshipLinkList[0] === 'error'" class="text-center my-10">
        <p class="text-base text-gray-700">友情链接加载失败，请刷新页面重试</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "friendship-links",
    data() {
      return {
        friendshipLinkList: []
      }
    },
    mounted() {
      this.getFriendshipLinks()
    },
    methods: {
      getFriendshipLinks() {
        axios.get('https://api.url.ewrt.top/v1/friendship_links').then((res) => {
          this.friendshipLinkList = res.data.data
        }).catch((err) => {
            this.friendshipLinkList.push('error')
          }
        )
      }
    }
  }
</script>

<style scoped>

</style>
