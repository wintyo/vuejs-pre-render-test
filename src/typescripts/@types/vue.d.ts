import Vue from 'vue';

// オプションの拡張
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    beforePreRender?: () => Promise<void>;
  }
}
