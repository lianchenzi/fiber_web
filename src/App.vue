<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>
<script>
export default {
  name: 'app'
}
</script>
<style lang="scss">
// 这里是坑啊，文件路径中好像不能用@符号
// 引入全局样式
@import "./assets/scss/global.scss";
</style>
