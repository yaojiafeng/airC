<template>
  <view class="remote-control-btn"
    >吐槽小空调
    <!-- <image
      :class="['btn-icon', isHideRemoteControl ? 'reverse-icon' : '']"
      src="../../images/btn-icon.png"
    /> -->
  </view>
</template>
      
  <script>
import "./index.scss";
export default {
  props: {
    isHideRemoteControl: {
      type: Boolean,
      default: false,
    },
  },
};
</script>