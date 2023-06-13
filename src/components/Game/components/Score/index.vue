<template>
  <view class="score-container">
    {{ score }}
  </view>
</template>
          
<script>
import "./index.scss";

export default {
  components: {},
  props: {
    score: {
      type: Number,
      default: 0,
    },
  },


  // setup() {
  //   let isTouch = ref(false);
  //   let basin = ref(null);

  //   return {};
  // },
};
</script>