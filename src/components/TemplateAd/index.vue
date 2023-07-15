<template>
  <view class="temp-ad-container" :style="style">
    <ad-custom :unit-id="unitId"></ad-custom>
  </view>
</template>
      
<script>
import "./index.scss";
export default {
  props: {
    style: {
      type: String,
      default: "",
    },
    unitId: {
      type: String,
      default: "adunit-502b9dfc1a1deaa8", // 空调右边
    },
  },
};
</script>