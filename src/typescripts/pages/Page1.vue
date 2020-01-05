<template lang="pug">
div
  p page1
  button(@click="$router.back()") back
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  metaInfo: {
    title: 'ページ1',
  },
});
</script>

<style lang="scss" scoped>
//
</style>
