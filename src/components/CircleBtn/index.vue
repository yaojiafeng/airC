<template>
  <view class="circle-box">
    <view class="top-circle"><text class="top-circle-icon"></text></view>
    <view class="left-circle"
      ><text class="left-circle-text"> 模式 </text></view
    >
    <view class="bottom-circle"><text class="bottom-circle-icon"></text></view>
    <view class="right-circle"
      ><text class="right-circle-text"> 风速 </text></view
    >
    <view class="inner-circle">节能</view>
    <view class="circle-cover">
      <view class="circle-cover-top" v-on:tap="switchCount(true)"></view>
      <view
        class="circle-cover-left"
        v-on:tap="setMode(currentMode === 5 ? 1 : currentMode + 1)"
      ></view>
      <view class="circle-cover-bottom" v-on:tap="switchCount(false)"></view>
      <view class="circle-cover-right" v-on:tap="switchSpeed()"></view>
      <view class="circle-cover-middle" v-on:tap="switchConservation()"></view>
    </view>
  </view>
  <view></view>
</template>
      
      <script>
import { defaultMode } from "../../app.enum";
import "./index.scss";

export default {
  props: {
    currentMode: {
      type: Number,
      default: defaultMode,
    },
  },
  emits: ["switchCount", "switchSpeed", "switchConservation", "setMode"],
  setup(props, ctx) {
    function switchCount(sign) {
      ctx.emit("switchCount", sign);
    }
    function switchSpeed() {
      ctx.emit("switchSpeed");
    }
    function switchConservation() {
      ctx.emit("switchConservation");
    }
    function setMode(mode) {
      console.log("yao seeee");
      ctx.emit("setMode", mode);
    }
    return {
      switchCount,
      switchSpeed,
      switchConservation,
      setMode,
    };
  },
};
</script>