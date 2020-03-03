<template>
  <div>
    <Form/>
    <IndexFeatures/>
    <FriendshipLinks/>
  </div>
</template>

<script>
import Form from "../components/index-form";
import IndexFeatures from "../components/index-features/"
import FriendshipLinks from "../components/friendship-links";
export default {
  components: {
    FriendshipLinks,
    Form,
    IndexFeatures
  },
  head () {
    return {
      title: 'NA.TN 短链接服务'
    }
  }
}
</script>

<style>
</style>
