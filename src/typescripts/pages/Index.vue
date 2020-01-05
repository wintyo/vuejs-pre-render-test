<template lang="pug">
div
  p index
  router-link(to="/page1") page1
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
