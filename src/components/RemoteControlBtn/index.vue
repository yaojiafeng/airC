<template>
  <view class="remote-control-btn"
    >遥控器
    <image
      :class="['btn-icon', isHideRemoteControl ? 'reverse-icon' : '']"
      src="../../images/btn-icon.png"
    />
    <TemplateAd v-if="!isHideRemoteControl"/>
  </view>
</template>
      
  <script>
import "./index.scss";
import TemplateAd from "../TemplateAd";
export default {
  components: {
    TemplateAd,
  },
  props: {
    isHideRemoteControl: {
      type: Boolean,
      default: false,
    },
  },
};
</script>