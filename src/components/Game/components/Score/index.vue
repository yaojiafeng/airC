<template>
  <view class="score-container">
    {{ score }}
  </view>
</template>
          
<script>
import "./index.scss";
export default {
  props:{
    score:{
      type: Number,
      default: 0
    }
  },
};
</script>