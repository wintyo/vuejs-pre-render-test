<template lang="pug">
div
  p page{{ $props.id }}
  button(@click="$router.back()") back
</template>

<script lang="ts">
import Vue from 'vue';
import VueTypes from 'vue-types';

export default Vue.extend({
  metaInfo() {
    return {
      title: `ページ${this.$props.id}`,
    };
  },
  props: {
    id: VueTypes.number.isRequired,
  },
});
</script>

<style lang="scss" scoped>
//
</style>
