<template lang="pug">
div
  p テスト
  button(@click="$data.isOpen = !$data.isOpen") toggle
  div
    SlideUpDown(
      :active="$data.isOpen"
    )
      .content content
  button(@click="$router.back()") back
</template>

<script lang="ts">
import Vue from 'vue';
const SlideUpDown = require('vue-slide-up-down').default;

export default Vue.extend({
  name: 'Test',
  components: {
    SlideUpDown,
  },
  data() {
    return {
      isOpen: false,
    };
  },
});
</script>

<style lang="scss" scoped>
.content {
  padding: 10px;
}
</style>
