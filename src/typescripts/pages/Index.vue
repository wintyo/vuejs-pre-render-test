<template lang="pug">
div
  p index
  div
    router-link(to="/test") test
  div
    router-link(to="/page/1") page1
    router-link(to="/page/2") page2
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  metaInfo: {
    title: 'トップページ',
  },
});
</script>

<style lang="scss" scoped>
//
</style>
