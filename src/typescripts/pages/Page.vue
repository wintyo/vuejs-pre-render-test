<template lang="pug">
div
  p page{{ $props.id }}
  p {{ value }}
  button(@click="$router.back()") back
</template>

<script lang="ts">
import Vue from 'vue';
import VueTypes from 'vue-types';

export default Vue.extend({
  name: 'Page',
  metaInfo() {
    return {
      title: `ページ${this.$props.id}`,
    };
  },
  /**
   * プリレンダーが行われる前の処理
   */
  async beforePreRender() {
    await new Promise((resolve) => window.setTimeout(resolve, 1000));
    this.$data.value = this.$props.id * 10;
  },
  props: {
    id: VueTypes.number.isRequired,
  },
  data() {
    return {
      value: 0,
    };
  },
});
</script>

<style lang="scss" scoped>
//
</style>
