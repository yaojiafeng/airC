<template>
  <view
    :class="[
      'water',
      animationPlayState ? 'water-runging' : 'water-paused',
      isBad ? 'bad-water' : '',
    ]"
  ></view>
</template>
    
  <script>
import "./index.scss";
// import { computed, ref, reactive, onMounted } from "vue";

export default {
  props: {
    height: {
      type: Number,
      default: 200,
    },
    width: {
      type: Number,
      default: 200,
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
    return {};
  },
};
</script>