<template>
  <view
    :class="[
      'water',
      animationPlayState ? 'water-runging' : 'water-paused',
      speedClass,
      isBad ? 'bad-water' : '',
    ]"
    :style="waterStyle"
  ></view>
  <!-- <view class="water"></view> -->
</template>
    
  <script>
import "./index.scss";
import { computed, ref } from "vue";

export default {
  props: {
    height: {
      type: Number,
      default: 14,
    },
    width: {
      type: Number,
      default: 14,
    },
    top: {
      type: Number,
      default: 200,
    },
    animationPlayState: {
      type: Boolean,
      default: true,
    },
    isBad: {
      type: Boolean,
      default: false,
    },
    speed: {
      type: Number,
      default: 1, // 1 , 2 , 3 , 4 , 5 
    },
  },
  setup(props) {
    const speedMap = {
      1: "",
      2: "water-2_3",
      3: "water-2_0",
      4: "water-1_8",
      5: "water-1_5",
    };
    const waterStyle = computed(
      () => `width: ${props.width}vw; height: ${props.height}vw;`
    );
    const speedClass = computed(() => speedMap[props.speed]);
    return {
      waterStyle,
      speedClass
    };
  },
};
</script>