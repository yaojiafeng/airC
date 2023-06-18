<template>
  <view :class="['page-container', isGame ? 'page-container-game' : '']">
    <Game v-if="isGame" ref="game"></Game>
    <template v-else>
      <AirHeader
        :isOpen="isOpen"
        :currentMode="currentMode"
        :count="count"
        :isGame="isGame"
        :class="['air-header', isNeedMin ? 'min-air-header' : '']"
      ></AirHeader>

      <view
        :class="['content-container', 'min-content-container-' + sizeClass]"
      >
        <Screen
          :isOpen="isOpen"
          :currentMode="currentMode"
          :count="count"
          :currentSpeed="currentSpeed"
          :isConservation="isConservation"
          :rowText="rowText"
          :colText="colText"
          :message="message"
        ></Screen>
        <view class="control-btn" v-on:tap="mainSwitch()">开/关</view>
        <CircleBtn
          :currentMode="currentMode"
          @switchCount="switchCount"
          @switchSpeed="switchSpeed"
          @switchConservation="switchConservation"
          @setMode="setMode"
        ></CircleBtn>
        <ModeBtn @setMode="setMode" @blow="blow"></ModeBtn>
        <button class="share-btn" open-type="share">分享给好友</button>
      </view>
    </template>
  </view>
</template>

<script>
import "./index.scss";
import { AudioPlay } from "../../utils/audioPlay";
import { throttle } from "../../utils/throttle";
import AirHeader from "../../components/AirHeader";
import Screen from "../../components/Screen";
import CircleBtn from "../../components/CircleBtn";
import ModeBtn from "../../components/ModeBtn";
import Game from "../../components/Game";
import { useStore } from "vuex";
import { ref, computed } from "vue";

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
} from "../../app.enum";

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
    if (this.isGame) {
      this.destroyBgPlayAudio();
      this.destroyGameWaterPlayAudio();
    } else {
      this.destroyPlayAudio();
    }
  },
  onShow() {
    if (this.isGame) {
      this.playGameBgAudio();
    } else {
      if (this.isOpen && !this.bgPlayer && !this.isConservation) {
        this.playBgAudio(8);
      }
    }
  },
  components: {
    AirHeader,
    Screen,
    CircleBtn,
    ModeBtn,
    Game,
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
      if (this.isGame) {
        return "空调漏水，快来接水";
      }
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
      return `isOpen=${this.isOpen}&count=${this.count}&currentMode=${this.currentMode}&currentSpeed=${this.currentSpeed}&isConservation=${this.isConservation}&colText=${this.colText}&rowText=${this.rowText}&selected=${this.selected}`;
    },
  },
  watch: {
    selected(val) {
      if (val === 1) {
        if (this.isOpen) {
          this.mainSwitch();
        }
      }
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
        selected,
      } = options;
      this.isOpen = isOpen === "true";
      this.count = +count || defaultCount;
      this.currentMode = +currentMode || defaultMode;
      this.currentSpeed = +currentSpeed || defaultSpeed;
      this.isConservation = isConservation === "true";
      const selectedMap = {
        0: 0,
        1: 1,
      };
      this.setSelected(selectedMap[selected] || 0);
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
      if (this.isOpen && !this.bgPlayer && !this.isConservation) {
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
        if (!this.isConservation) {
          this.playBgAudio(2);
        }
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
        // wx.showToast({
        //   title: "节能模式不调速",
        //   image: "../../images/emoj/41.png",
        //   duration: 1000,
        // });
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
        // wx.showToast({
        //   title: "节能模式不控温",
        //   image: "../../images/emoj/41.png",
        //   duration: 1000,
        // });
        return;
      }
      if (this.currentMode === 1) {
        // wx.showToast({
        //   title: "自动模式不控温",
        //   image: "../../images/emoj/41.png",
        //   duration: 1000,
        // });
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
        // wx.showToast({
        //   title: "制冷才能开节能",
        //   image: "../../images/emoj/41.png",
        //   duration: 1000,
        // });
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

  setup() {
    const store = useStore();
    let game = ref(null);
    let isNeedMin = ref(false);
    let ratio = ref(1);
    let selected = computed(() => store.getters.getSelected);
    let gameState = computed(() => store.getters.getGameState);
    let isGame = computed(() => selected.value !== 0);
    let sizeClass = computed(() => {
      if (ratio.value < 1.5) {
        return "less-1_5";
      }
      if (ratio.value >= 1.5 && ratio.value < 1.7) {
        return "1_5-1_7";
      }
      if (ratio.value >= 1.7 && ratio.value < 1.8) {
        return "1_7-1_8";
      }
      if (ratio.value >= 1.8 && ratio.value < 2.1) {
        return "1_8-2_1";
      }
    });
    function setSelected(index) {
      store.dispatch("setSelected", index);
    }

    function getSystemInfo() {
      const systemInfo = wx.getSystemInfoSync();
      const { windowHeight, windowWidth } = systemInfo;
      ratio.value = windowHeight / windowWidth;
      isNeedMin.value = ratio.value < 2.1;
      console.log("yao getSystemInfo", systemInfo, windowHeight / windowWidth);
      store.dispatch("setSystemInfo", systemInfo);
      store.dispatch("setWindowWidth", windowWidth);
      store.dispatch("setWindowHeight", windowHeight);
    }
    getSystemInfo();

    function destroyBgPlayAudio() {
      game.value.destroyBgPlayAudio();
    }

    function destroyGameWaterPlayAudio() {
      game.value.destroyGameWaterPlayAudio();
    }

    function playGameBgAudio() {
      game.value.playGameBgAudio();
    }

    return {
      isNeedMin,
      sizeClass,
      selected,
      isGame,
      gameState,
      game,
      getSystemInfo,
      setSelected,
      destroyBgPlayAudio,
      destroyGameWaterPlayAudio,
      playGameBgAudio,
    };
  },
};
</script>
