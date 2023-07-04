<template>
  <view class="media-container">
    <image
      :class="['girl', isBlur ? 'gril-blur' : '']"
      src="../../images/gril-1.jpeg"
    />
    <view class="tap-tips" v-if="isBlur" @tap="showAd">
      <text class="text">点击查看</text>
      <image class="tap-img" src="../../images/tap.png" />
    </view>
  </view>
</template>
      
  <script>
import "./index.scss";
import { ref, onMounted } from "vue";

export default {
  props: {
    videoAd: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    let isBlur = ref(true);
    onMounted(() => {
      // showAd();
      initClose();
    });

    function showAd() {
      // 在适合的场景显示插屏广告
      // 用户触发广告后，显示激励视频广告
      if (props.videoAd) {
        props.videoAd.show().catch(() => {
          // 失败重试
          props.videoAd
            .load()
            .then(() => videoAd.show())
            .catch((err) => {
              console.log("激励视频 广告显示失败");
            });
        });
      }
    }

    function initClose() {
      if (props.videoAd) {
        props.videoAd.onClose((res) => {
          // 用户点击了【关闭广告】按钮
          if (res && res.isEnded) {
            // 正常播放结束，可以下发游戏奖励
            isBlur.value = false;
            wx.showToast({
              title: "享受美好时光",
              duration: 2000,
            });
          } else {
            // 播放中途退出，不下发游戏奖励
          }
        });
      }
    }

    return {
      isBlur,
      showAd,
    };
  },
};
</script>