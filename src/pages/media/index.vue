<template>
  <view class="media-page-container">
    <video
      id="myVideo"
      adUnitId="adunit-f95b866f759ca714"
      src="https://v26-web.douyinvod.com/ceba2ec0b11510b9e9c52b6912cb1816/64b3d80f/video/tos/cn/tos-cn-ve-15c001-alinc2/oQ7zxJgEh6zAsNXfe7BxqkyRLDBA9AQdIYUOtJ/?a=6383&ch=26&cr=0&dr=0&lr=all&cd=0%7C0%7C0%7C0&br=250&bt=250&cs=0&ds=6&ft=GN7rKGVVywSyRKJ80mo~ySqTeaApXVjp6vrKDAWvmto0g3&mime_type=video_mp4&qs=0&rc=ZjRkZTY3NTRpODo2PDNmOUBpamg3dmU6Znd2bDMzNGkzM0BeLl82MjVhNV4xMy42Ly0yYSNsZjYtcjRfZW1gLS1kLWFzcw%3D%3D&l=20230716184222F2FC70F69842F521A2BE&btag=e00028000"
    ></video>
    <TemplateAd
      unitId="adunit-e4333a6f2dcce721"
      :style="'left: 0;right: 0; padding-bottom: calc(13.4vw + constant(safe-area-inset-bottom));padding-bottom: calc(13.4vw + env(safe-area-inset-bottom));'"
    />
  </view>
</template>
    
<script setup>
import "./index.scss";
import { onMounted } from "vue";
import TemplateAd from "../../components/TemplateAd";
let videoContext = null;
onMounted(() => {
  videoContext = wx.createVideoContext("myVideo");
});
</script>