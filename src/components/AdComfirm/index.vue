<template>
  <view :class="['comfirm-container']">
    <view class="content">
      <view class="title">{{ title }}</view>
      <view class="sub-title" v-if="showComfirmTimes"
        >剩余{{ lookComfirmTimes }}次机会</view
      >
      <view class="button-box">
        <view class="button" @tap="cancel">取消</view>
        <view class="button comfirm-button" @tap="comfirm">确定</view>
      </view>
    </view>
  </view>
</template>
          
<script>
import { ref, onMounted, onBeforeUnmount } from "vue";
import "./index.scss";
export default {
  props: {
    lookComfirmTimes: {
      type: Number,
      default: 3,
    },
    showComfirmTimes: {
      type: Boolean,
      default: true,
    },
    title: {
      type: String,
      default: "是否看视频复活?",
    },
    adUnitId: {
      type: String,
      default: 'adunit-21d9ac49282ff16c' // 接水复活
    }
  },
  emits: ["cancel", "comfirm"],
  setup(props, { emit }) {
    let show = ref(false);
    let videoAd = null;
    onMounted(() => {
      if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
          adUnitId: props.adUnitId,
        });
      }
      videoAd.onError((e) => {
        console.log("yao onerror", e);
      });
      videoAd.onLoad(() => {
        console.log("yao onLoad");
      });

      videoAd.onClose(closeCallBack);
    });

    onBeforeUnmount(() => {
      videoAd.offClose(closeCallBack);
    });

    function closeCallBack(res) {
      if (res && res.isEnded) {
        // 正常播放结束，可以下发游戏奖励
        emit("comfirm");
      } else {
        // 播放中途退出，不下发游戏奖励
        // emit("cancel");
      }
    }
    function cancel() {
      emit("cancel");
    }
    function comfirm() {
      videoAd.show().catch(() => {
        // 失败重试
        videoAd
          .load()
          .then(() => videoAd.show())
          .catch((err) => {
            console.log("激励视频 广告显示失败", err);
          });
      });
    }
    return {
      show,
      cancel,
      comfirm,
    };
  },
};
</script>