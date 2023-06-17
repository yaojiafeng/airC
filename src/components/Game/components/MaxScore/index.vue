<template>
  <view class="max-score-container" v-show="gameState === 2">
    <text class="text">历史最高分：</text>{{ maxScore }}
  </view>
</template>
          
<script>
import "./index.scss";
import { computed, ref, watch } from "vue";
import { useStore } from "vuex";
import { getStorageSync, setStorageSync } from "../../../../utils/storage";
export default {
  setup() {
    const store = useStore();
    let maxScore = ref(0);
    const currentScore = computed(() => store.getters.getScore);
    let gameState = computed(() => store.getters.getGameState);
    maxScore.value = getStorageSync("maxScore", 0);
    watch(gameState, (state) => {
      if (state === 2) {
        console.log("yao max", maxScore.value);
        if (maxScore.value < currentScore.value) {
          setStorageSync("maxScore", currentScore.value);
          maxScore.value = currentScore.value;
        }
      }
    });

    return {
      maxScore,
      gameState,
    };
  },
};
</script>