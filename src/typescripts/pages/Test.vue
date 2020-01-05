<template lang="pug">
div
  p テスト
  button(@click="$router.back()") back
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Test',
});
</script>

<style lang="scss" scoped>
//
</style>
