<template lang="pug">
div
  transition(name="fade")
    router-view.view
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  metaInfo: {
    title: 'Untitled',
    titleTemplate: '%s | プリレンダーテスト',
    meta: [
      {
        property: 'og:title',
        content: 'タイトル',
      },
      {
        property: 'og:description',
        content: '説明文',
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        property: 'og:url',
        content: 'https://wintyo.github.io/vuejs-pre-render-test/',
      },
      {
        property: 'og:image',
        content: 'https://wintyo.github.io/vuejs-pre-render-test/images/ogp.png',
      },
    ],
  },
  created() {
    this.$router.afterEach(() => {
      this.$nextTick(() => {
        this.handleRoute();
      });
    });
  },
  mounted() {
    this.$nextTick(() => {
      this.handleRoute();
    });
  },
  methods: {
    /**
     * ルーティングのハンドリング
     */
    async handleRoute() {
      // ルートにマッチしなかった時
      if (this.$route.matched.length <= 0) {
        document.dispatchEvent(new Event('custom-render-trigger'));
        return;
      }

      // プリレンダー前の処理が設定されてない時
      const instance = this.$route.matched[0].instances.default;
      if (!instance.$options.beforePreRender) {
        document.dispatchEvent(new Event('custom-render-trigger'));
        return;
      }

      // プレレンダー前の処理が設定されている時
      await instance.$options.beforePreRender.call(instance);
      document.dispatchEvent(new Event('custom-render-trigger'));
    },
  },
});
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
