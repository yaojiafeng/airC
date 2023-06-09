<template>
  <view class="mode-box mode-box-top">
    <view class="mode-btn" v-on:tap="setMode(2)">制冷</view>
    <view class="mode-btn right-mode-btn" v-on:tap="setMode(5)">制热</view>
  </view>
  <view class="mode-box">
    <view class="mode-btn mode-btn-wbg" v-on:tap="blow(true)">上下扫风</view>
    <view class="mode-btn right-mode-btn mode-btn-wbg" v-on:tap="blow(false)"
      >左右扫风</view
    >
  </view>
</template>
        
<script>
import "./index.scss";

export default {
  emits: ["blow", "setMode"],
  setup(props, ctx) {
    function blow(sign) {
      ctx.emit("blow", sign);
    }
    function setMode(mode) {
      ctx.emit("setMode", mode);
    }
    return {
      blow,
      setMode,
    };
  },
};
</script>