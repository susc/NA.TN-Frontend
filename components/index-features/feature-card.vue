<template>
  <div class="flex sm:w-1/2 lg:w-1/4">
    <div class="flex mt-8 sm:ml-2">
      <embed class="w-24 h-24" :src="icon">
      <div class="pl-4">
        <h2 class="text-gray-800 text-lg font-semibold">{{title}}</h2>
        <p class="text-gray-600 text-sm pr-2">{{desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "feature-card",
    props: [
      'title',
      'desc',
      'icon'
    ]
  }
</script>

<style scoped>

</style>
