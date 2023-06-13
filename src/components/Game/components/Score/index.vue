<template>
  <view class="score-container" v-if="gameState === 1">
    {{ score }}
  </view>
</template>
          
<script>
import "./index.scss";
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const score = computed(() => store.getters.getScore);
    let gameState = computed(() => store.getters.getGameState);
    return {
      score,
      gameState,
    };
  },
};
</script>