<template>
  <div class="container">
    <div class="error_box">
      <h1 v-if="error.statusCode === 403">用户未登录</h1>
      <h1 v-else-if="error.statusCode === 404">页面不存在</h1>
      <h1 v-else>应用发生错误异常</h1>
      <el-button
        type="danger"
        style="margin-top:20px;"
      >
        <nuxt-link to="/">回首页</nuxt-link>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: '',
  data() {
    return {

    }
  },
  props: ['error']
}
</script>

<style>
.container {
  width: 1200px;
  margin: 50px auto;
}
.error_box {
  width: 800px;
  margin: 0 auto;
}
</style>