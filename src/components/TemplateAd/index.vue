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
      default: "adunit-49aef3527670fc61", // 空调左边
    },
  },
};
</script>