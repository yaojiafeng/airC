<template>
  <view
    :class="[
      'water',
      animationPlayState ? 'water-runging' : 'water-paused',
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
  },
  setup(props) {
    const waterStyle = computed(
      () => `width: ${props.width}vw; height: ${props.height}vw;`
    );
    return {
      waterStyle,
    };
  },
};
</script>