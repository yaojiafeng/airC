<template>
  <view class="page-container">
    <view class="header">
      <view class="ceil-bg"> </view>
      <view
        :class="['display-air-common', isOpen ? 'open-air' : 'close-air']"
      />
      <view class="status-common status-icon" v-if="!isOpen" />
      <text class="status-common count" v-if="isOpen && currentMode !== 1">{{
        count
      }}</text>
      <text class="status-common count-unit" v-if="isOpen && currentMode !== 1"
        >° c</text
      >
    </view>
    <view class="content-container">
      <view class="control">
        <view class="inner-display">
          <view class="top-display">
            <view class="top-left-display">
              <template v-if="isOpen">
                <text :class="currentMode === 1 ? 'show' : 'hide'">自动</text>
                <text :class="currentMode === 2 ? 'show' : 'hide'">制冷</text>
                <text :class="currentMode === 3 ? 'show' : 'hide'">除湿</text>
                <text :class="currentMode === 4 ? 'show' : 'hide'">送风</text>
                <text :class="currentMode === 5 ? 'show' : 'hide'">制热</text>
              </template>
            </view>
            <view class="top-right-display">
              <view class="top-right-top-display">
                <view class="speed-text" v-if="isOpen">
                  <text>风速</text>
                  <text v-if="currentSpeed === 0 || isConservation">自动</text>
                </view>
                <view class="status-box" v-if="isOpen">
                  <view class="speed-box">
                    <view
                      class="speed-1"
                      v-if="currentSpeed >= 1 && !isConservation"
                    ></view>
                    <view
                      class="speed-2"
                      v-if="currentSpeed >= 2 && !isConservation"
                    ></view>
                    <view
                      class="speed-3"
                      v-if="currentSpeed >= 3 && !isConservation"
                    ></view>
                    <view
                      class="speed-4"
                      v-if="currentSpeed >= 4 && !isConservation"
                    ></view>
                    <view
                      class="speed-5"
                      v-if="currentSpeed >= 5 && !isConservation"
                    ></view>
                  </view>
                  <view class="status-text"> 运行 </view>
                </view>
              </view>
              <view class="top-right-bottom-display">
                <text
                  :class="['count', isConservation ? 'count-5e' : '']"
                  v-if="isOpen && currentMode !== 1"
                  >{{ isConservation ? "5E" : count }}</text
                >
                <text
                  class="count-unit"
                  v-if="isOpen && !isConservation && currentMode !== 1"
                  >° c</text
                >
              </view>
            </view>
          </view>
          <view class="middle-display" v-if="isOpen">
            {{ colText || "" }}
            {{ rowText || "" }}
          </view>
          <view
            :class="['bottom-display', count === 10 ? 'min-message' : '']"
            v-if="isOpen"
          >
            {{ message }}
            <template v-if="currentMode !== 1 && !isConservation">
              <image
                src="../../images/emoj/10.png"
                class="emoj"
                v-if="+count === 10"
              ></image>
              <image
                src="../../images/emoj/11.png"
                class="emoj"
                v-if="+count === 11"
              ></image>
              <image
                src="../../images/emoj/12.png"
                class="emoj"
                v-if="+count === 12"
              ></image>
              <image
                src="../../images/emoj/13.png"
                class="emoj"
                v-if="+count === 13"
              ></image>
              <image
                src="../../images/emoj/14.png"
                class="emoj"
                v-if="+count === 14"
              ></image>
              <image
                src="../../images/emoj/15.png"
                class="emoj"
                v-if="+count === 15"
              ></image>
              <image
                src="../../images/emoj/16.png"
                class="emoj"
                v-if="+count === 16"
              ></image>
              <image
                src="../../images/emoj/17.png"
                class="emoj"
                v-if="+count === 17"
              ></image>
              <image
                src="../../images/emoj/18.png"
                class="emoj"
                v-if="+count === 18"
              ></image>
              <image
                src="../../images/emoj/19.png"
                class="emoj"
                v-if="+count === 19"
              ></image>
              <image
                src="../../images/emoj/20.png"
                class="emoj"
                v-if="+count === 20"
              ></image>
              <image
                src="../../images/emoj/21.svg"
                class="emoj"
                v-if="+count === 21"
              ></image>
              <image
                src="../../images/emoj/22.png"
                class="emoj"
                v-if="+count === 22"
              ></image>
              <image
                src="../../images/emoj/23.png"
                class="emoj"
                v-if="+count === 23"
              ></image>
              <image
                src="../../images/emoj/24.png"
                class="emoj"
                v-if="+count === 24"
              ></image>
              <image
                src="../../images/emoj/25.png"
                class="emoj"
                v-if="+count === 25"
              ></image>
              <image
                src="../../images/emoj/26.png"
                class="emoj"
                v-if="+count === 26"
              ></image>
              <image
                src="../../images/emoj/27.png"
                class="emoj"
                v-if="+count === 27"
              ></image>
              <image
                src="../../images/emoj/28.png"
                class="emoj"
                v-if="+count === 28"
              ></image>
              <image
                src="../../images/emoj/29.png"
                class="emoj"
                v-if="+count === 29"
              ></image>
              <image
                src="../../images/emoj/30.png"
                class="emoj"
                v-if="+count === 30"
              ></image>
              <image
                src="../../images/emoj/31.png"
                class="emoj"
                v-if="+count === 31"
              ></image>
              <image
                src="../../images/emoj/32.png"
                class="emoj"
                v-if="+count === 32"
              ></image>
              <image
                src="../../images/emoj/33.png"
                class="emoj"
                v-if="+count === 33"
              ></image>
              <image
                src="../../images/emoj/34.png"
                class="emoj"
                v-if="+count === 34"
              ></image>
              <image
                src="../../images/emoj/35.png"
                class="emoj"
                v-if="+count === 35"
              ></image>
              <image
                src="../../images/emoj/36.png"
                class="emoj"
                v-if="+count === 36"
              ></image>
              <image
                src="../../images/emoj/37.png"
                class="emoj"
                v-if="+count === 37"
              ></image>
              <image
                src="../../images/emoj/38.png"
                class="emoj"
                v-if="+count === 38"
              ></image>
              <image
                src="../../images/emoj/39.png"
                class="emoj"
                v-if="+count === 39"
              ></image>
              <image
                src="../../images/emoj/40.png"
                class="emoj"
                v-if="+count === 40"
              ></image>
            </template>
            <image src="../../images/emoj/41.png" class="emoj" v-else></image>
          </view>
        </view>
        <view class="control-btn" v-on:tap="mainSwitch()">开/关</view>
        <view class="circle-box">
          <view class="top-circle"><text class="top-circle-icon"></text></view>
          <view class="left-circle"
            ><text class="left-circle-text"> 模式 </text></view
          >
          <view class="bottom-circle"
            ><text class="bottom-circle-icon"></text
          ></view>
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
            <view
              class="circle-cover-bottom"
              v-on:tap="switchCount(false)"
            ></view>
            <view class="circle-cover-right" v-on:tap="switchSpeed()"></view>
            <view
              class="circle-cover-middle"
              v-on:tap="switchConservation()"
            ></view>
          </view>
        </view>
        <view class="mode-box">
          <view class="mode-btn" v-on:tap="setMode(2)">制冷</view>
          <view class="mode-btn right-mode-btn" v-on:tap="setMode(5)"
            >制热</view
          >
        </view>
        <view class="mode-box">
          <view class="mode-btn mode-btn-wbg" v-on:tap="blow(true)"
            >上下扫风</view
          >
          <view
            class="mode-btn right-mode-btn mode-btn-wbg"
            v-on:tap="blow(false)"
            >左右扫风</view
          >
        </view>
        <button class="share-btn" open-type="share">分享给好友凉快一下</button>
      </view>
    </view>
  </view>
</template>

<script>
import "./index.scss";
import { AudioPlay } from "../../utils/audioPlay";
import {
  MIN_COUNT,
  MAX_COUNT,
  COLD_MAX_COUNT,
  HOT_MIN_COUNT,
  defaultMode,
  defaultCount,
  defaultSpeed,
  bgAudioUrl,
  clickAudioUrl,
  msgMap,
} from "./config";

export default {
  onShareAppMessage(from) {
    return {
      title: this.shareTitle,
      path: `/pages/index/index?${this.shareParams}`,
    };
  },
  onShareTimeline(res) {
    return {
      title: this.shareTitle,
      query: this.shareParams,
      imageUrl: "",
    };
  },
  onLoad(options) {
    this.setStatus(options);
  },
  onHide() {
    this.destroyPlayAudio();
  },
  onShow() {
    if (this.isOpen && !this.bgPlayer) {
      this.playBgAudio(8);
    }
  },
  data() {
    return {
      isOpen: false,
      count: defaultCount,
      currentMode: defaultMode,
      currentSpeed: defaultSpeed, // 自动
      isConservation: false,
      colText: "",
      rowText: "",
      bgAudioUrl,
      clickAudioUrl,
      msgMap,
    };
  },
  computed: {
    message() {
      if (this.isConservation) {
        return "节能模式已开启";
      }
      if (this.currentMode === 1) {
        return "当前自动模式";
      }
      return this.msgMap[this.count] || "";
    },
    volume() {
      console.log("yao ", this.currentSpeed);
      if (this.currentSpeed === 4) {
        return 0.9;
      }
      if (this.currentSpeed === 5) {
        return 1;
      }
      return +(this.currentSpeed * 0.2 + 0.2).toFixed(1);
    },
    shareTitle() {
      if (this.isOpen) {
        if (this.count <= 28) {
          return `天气太热，给你开个${this.count}度的空调凉快凉快吧！`;
        } else {
          return `开了个${this.count}度的空调给你，舒服舒服😌！`;
        }
      } else {
        return "天气太热，不妨给你的好友开个空调凉快一下吧！";
      }
    },
    shareParams() {
      return `isOpen=${this.isOpen}&count=${this.count}&currentMode=${this.currentMode}&currentSpeed=${this.currentSpeed}&isConservation=${this.isConservation}&colText=${this.colText}&rowText=${this.rowText}`;
    },
  },
  methods: {
    setStatus(options) {
      const {
        isOpen,
        count,
        currentMode,
        currentSpeed, // 自动
        isConservation,
        rowText,
        colText,
      } = options;
      this.isOpen = isOpen === "true";
      this.count = +count || defaultCount;
      this.currentMode = +currentMode || defaultMode;
      this.currentSpeed = +currentSpeed || defaultSpeed;
      this.isConservation = isConservation === "true";
      if (!colText || colText === "undefined") {
        this.colText = "";
      } else {
        this.colText = colText;
      }
      if (!rowText || rowText === "undefined") {
        this.rowText = "";
      } else {
        this.rowText = rowText;
      }
      if (this.isOpen && !this.bgPlayer) {
        this.playBgAudio(8);
      }
    },
    mainSwitch() {
      this.playClickAudio();
      if (this.isOpen) {
        // 关闭音效
        if (this.bgPlayer) {
          this.bgPlayer.close();
          this.bgPlayer = null;
        }
      } else {
        this.playBgAudio(2);
      }
      this.isOpen = !this.isOpen;
    },

    // 设置模式
    setMode(mode) {
      if (!this.isOpen) {
        return;
      }
      this.playClickAudio();
      this.isConservation = false;
      if (!this.bgPlayer) {
        // 如果没有声音，则播放
        this.playBgAudio(8);
      }
      this.currentMode = mode;
      if (this.currentMode === 2 && this.count >= COLD_MAX_COUNT) {
        this.count = COLD_MAX_COUNT;
      }
      if (this.currentMode === 5 && this.count <= HOT_MIN_COUNT) {
        this.count = HOT_MIN_COUNT;
      }
    },
    // 风速
    switchSpeed() {
      if (!this.isOpen) {
        return;
      }
      this.playClickAudio();
      if (this.isConservation) {
        wx.showToast({
          title: "节能模式不调速",
          image: "../../images/emoj/41.png",
          duration: 1000,
        });
        return;
      }
      if (this.currentSpeed === 5) {
        this.currentSpeed = 0;
      } else {
        this.currentSpeed++;
      }
      this.bgPlayer.setVolume(this.volume);
    },
    // 改变温度
    switchCount(sign) {
      if (!this.isOpen) {
        return;
      }
      this.playClickAudio();
      if (this.isConservation) {
        wx.showToast({
          title: "节能模式不控温",
          image: "../../images/emoj/41.png",
          duration: 1000,
        });
        return;
      }
      if (this.currentMode === 1) {
        wx.showToast({
          title: "自动模式不控温",
          image: "../../images/emoj/41.png",
          duration: 1000,
        });
        return;
      }
      if (sign) {
        if (this.currentMode === 2) {
          // 制冷模式
          if (this.count >= COLD_MAX_COUNT) {
            wx.showToast({
              title: "制冷最高30",
              image: "../../images/emoj/41.png",
              duration: 1000,
            });
            return;
          }
        }
        if (this.count >= MAX_COUNT) {
          wx.showToast({
            title: "已到最高温度",
            image: "../../images/emoj/41.png",
            duration: 1000,
          });
          return;
        }
        this.count++;
      } else {
        if (this.currentMode === 5) {
          // 制热模式
          if (this.count <= HOT_MIN_COUNT) {
            wx.showToast({
              title: "制热最低16",
              image: "../../images/emoj/41.png",
              duration: 1000,
            });
            return;
          }
        }
        if (this.count <= MIN_COUNT) {
          wx.showToast({
            title: "已到最低温度",
            image: "../../images/emoj/41.png",
            duration: 1000,
          });
          return;
        }
        this.count--;
      }
    },
    // 节能
    switchConservation() {
      if (!this.isOpen) {
        return;
      }
      this.playClickAudio();
      if (this.currentMode !== 2) {
        wx.showToast({
          title: "制冷才能开节能",
          image: "../../images/emoj/41.png",
          duration: 1000,
        });
        return;
      }
      if (!this.isConservation && this.bgPlayer) {
        this.bgPlayer.close();
        this.bgPlayer = null;
      }
      if (this.isConservation) {
        this.playBgAudio(8);
      }
      this.isConservation = !this.isConservation;
    },
    // 扫风
    blow(sign) {
      if (!this.isOpen) {
        return;
      }
      this.playClickAudio();
      if (sign) {
        if (this.colText) {
          this.colText = "";
          return;
        }
        this.colText = "上下扫风";
      } else {
        if (this.rowText) {
          this.rowText = "";
          return;
        }
        this.rowText = "左右扫风";
      }
    },

    playClickAudio() {
      if (this.clickAudioPlayer) {
        this.clickAudioPlayer.play();
      } else {
        this.clickAudioPlayer = new AudioPlay(this.clickAudioUrl, false);
        this.clickAudioPlayer.play();
      }
    },

    playBgAudio(startTime = 0) {
      this.bgPlayer = new AudioPlay(
        this.bgAudioUrl,
        true,
        startTime,
        this.volume
      );
      this.bgPlayer.play();
    },

    destroyPlayAudio() {
      if (this.bgPlayer && this.bgPlayer.close) {
        // 销毁音频
        this.bgPlayer.close();
        this.bgPlayer = null;
      }
      if (this.clickAudioPlayer && this.clickAudioPlayer.close) {
        this.clickAudioPlayer.close();
        this.clickAudioPlayer = null;
      }
    },
  },
};
</script>
