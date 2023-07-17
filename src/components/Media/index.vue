<template>
  <view class="media-container">
    <image
      :class="['girl', isBlur ? 'gril-blur' : '']"
      src="../../images/gril-1.jpeg"
    />
    <view class="tap-tips" v-if="isBlur" @tap="clickShowAd">
      <text class="text">点击查看</text>
      <image class="tap-img" src="../../images/tap.png" />
    </view>
  </view>
</template>
      
  <script>
import "./index.scss";
import { ref, onMounted, onBeforeUnmount } from "vue";
// import { videoAdInit, initClose, offClose, showAd } from "./ad";

export default {
  setup(props) {
    let isBlur = ref(true);
    // let videoAd = null;
    onMounted(() => {
      // videoAd = videoAdInit(videoAd);
      // initClose(videoAd, success);
    });

    // onBeforeUnmount(() => {
    //   offClose(videoAd);
    //   videoAd = null
    // });

    function success() {
      isBlur.value = false;
      wx.showToast({
        title: "享受美好时光",
        duration: 2000,
      });
    }

    function clickShowAd() {
      // showAd(videoAd);
      isBlur.value = false;
    }

    return {
      isBlur,
      clickShowAd,
    };
  },
};
</script>