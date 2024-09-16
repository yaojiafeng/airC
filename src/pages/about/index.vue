<template>
  <view class="about-page-container">
    <!-- https://7465-test-6g7fnu9462fb8180-1319743773.tcb.qcloud.la/images/icon/%E6%94%B6%E6%AC%BE%E7%A0%81.jpg?sign=977f13a75ebf534ff6d7262e2f5f3aad&t=1711279748 -->
    <view class="header-text">
      <view class="des">本小程序功能仅供娱乐</view>
      <view>吹空调的爱因斯坦的脑子</view>
      <view>转发后自动长到你的大脑上</view>
    </view>
    <image class="brain" @tap="previewImage(brainImg)" :src="brainImg" mode="widthFix" />
    <button class="share-btn" open-type="share">转发拿下</button>
    <!-- <view class="pay-des">
      <view>下面是付款码，扫码支持也行</view>
      <view>谢谢您！</view>
    </view>
    <image @tap="previewImage(payImg)" :src="payImg" mode="widthFix" /> -->
    <ad-custom :unit-id="'adunit-e4333a6f2dcce721'"></ad-custom>
    <!-- <TemplateAd unitId="adunit-e4333a6f2dcce721"
      :style="'left: 0;right: 0; padding-bottom: calc(13.4vw + constant(safe-area-inset-bottom));padding-bottom: calc(13.4vw + env(safe-area-inset-bottom));'" /> -->
  </view>
</template>

<script>
import "./index.scss";
import { ref, onMounted } from "vue";
import TemplateAd from "../../components/TemplateAd";
import { useStore } from "vuex";
export default {
  components: {
    TemplateAd
  },
  onShareAppMessage(from) {
    return {
      title: this.shareTitle,
      path: `/pages/about/index`,
      imageUrl: this.brainImg
    };
  },
  onShareTimeline(res) {
    return {
      title: `${this.shareTitle}用过的都说好！`,
      path: `/pages/about/index`,
      imageUrl: this.brainImg
    };
  },
  onShow(options) {
    this.setTabSelected('b')
  },

  setup() {
    const store = useStore();
    function setTabSelected(tab) {
      store.dispatch("setTabSelected", tab);
    }
    function previewImage(url) {
      wx.previewImage({
        current: url,
        urls: [url]
      })
    }
    let shareTitle = ref('吹空调的爱因斯坦的脑子，转发后自动长到你的大脑上！')
    const brainImg = ref('https://7465-test-6g7fnu9462fb8180-1319743773.tcb.qcloud.la/images/icon/R-C.jfif?sign=589743300b014e4df7a5c938097088f6&t=1711279435')
    const payImg = ref('https://7465-test-6g7fnu9462fb8180-1319743773.tcb.qcloud.la/images/icon/%E6%94%B6%E6%AC%BE%E7%A0%81.jpg?sign=977f13a75ebf534ff6d7262e2f5f3aad&t=1711279748')

    return {
      shareTitle,
      payImg,
      brainImg,
      setTabSelected,
      previewImage
    };
  },
};

</script>