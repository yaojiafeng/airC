<template>
  <view :class="['level-container', isShake ? 'shake' : '']"
    >第{{ text }}关</view
  >
</template>
          
<script>
import { computed } from "vue";
import "./index.scss";
export default {
  props: {
    level: {
      type: Number,
      default: 1,
    },
    isShake: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    const textMap = {
      1: "一",
      2: "二",
      3: "三",
      4: "四",
      5: "五",
    };
    let text = computed(() => textMap[props.level]);
    return {
      text,
    };
  },
};
</script>