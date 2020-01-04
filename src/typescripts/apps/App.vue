<template lang="pug">
#app
  transition(name="fade")
    router-view.view
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="scss" scoped>
.view {
  position: absolute;
  width: 100%;
  height: 100%;
  transition: all 0.5s;
}

// フェードアニメーション
.fade {
  // 入る時のアニメーション
  &-enter {
    // 初期設定
    &-active {
      transition: opacity 0.5s;
      opacity: 0;
    }
    // 目標
    &-to {
      opacity: 1;
    }
  }

  // 消える時のアニメーション
  &-leave {
    // 初期設定
    &-active {
      transition: opacity 0.5s;
      opacity: 1;
    }
    // 目標
    &-to {
      opacity: 0;
    }
  }
}
</style>
