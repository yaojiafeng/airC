<template>
  <view class="add-score-container" v-if="isShow">
    <text>+</text>
    <text class="add-score-count">{{ score }}</text>
  </view>
</template>
          
<script>
import "./index.scss";
import { ref } from "vue";
export default {
  setup(props, { expose }) {
    let isShow = ref(false);
    let score = ref(0);
    function show(count) {
      isShow.value = true;
      score.value = count;
      let timer = setTimeout(() => {
        isShow.value = false;
        clearTimeout(timer);
        timer = null;
      }, 1000);
    }
    expose({ show });

    return {
      isShow,
      score,
    };
  },
};
</script>