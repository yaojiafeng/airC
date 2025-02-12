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
    <!-- <AdComfirm
      v-if="isShowComfirm"
      @cancel="cancelVideo"
      @comfirm="comfirmVideo"
      :showComfirmTimes="false"
      adUnitId="adunit-06270f3fa65490e9"
      :title="'观看视频可查看，是否观看？'"
    /> -->
  </view>
</template>
      
  <script>
import "./index.scss";
import { ref, onMounted, onBeforeUnmount } from "vue";
import AdComfirm from '../AdComfirm';

export default {
  components: {
    AdComfirm,
  },
  setup(props) {
    let isBlur = ref(true);
    let isShowComfirm = ref(false);

    function clickShowAd() {
      // isShowComfirm.value = true;
      comfirmVideo()
    }

    function cancelVideo() {
      isShowComfirm.value = false;
    }

    function comfirmVideo() {
      isBlur.value = false;
      isShowComfirm.value = false;
      wx.showToast({
        title: "享受美好时光",
        duration: 2000,
      });
    }

    return {
      isBlur,
      isShowComfirm,
      clickShowAd,
      cancelVideo,
      comfirmVideo,
    };
  },
};
</script>