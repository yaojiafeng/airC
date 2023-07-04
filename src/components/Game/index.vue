<template>
  <Score :score="score" v-if="gameState === 1" />
  <MaxScore />
  <movable-area class="area" scale-area>
    <template v-if="gameState === 0">
      <view class="game-title">接一接</view>
      <view class="play-common-btn">
        <GoHomeBtn @tap="goHome" />
        <BeginBtn @tap="startGame()" />
      </view>
      <ShareBtn />
    </template>
    <view v-show="gameState === 1">
      <Water
        :class="'water' + index"
        :animationPlayState="isTouch"
        :style="item.waterPoint"
        :width="waterWidth"
        :height="waterHeight"
        :isBad="item.isBad"
        v-show="item.isShowWater"
        v-for="(item, index) in waters"
        :key="index"
        :speed="waterSpeed"
      />
      <movable-view
        class="basin"
        direction="all"
        :x="windowWidth / 2 - 26"
        :y="windowHeight * 0.8 - 80"
        v-on:touchstart="start"
        v-on:touchend="end"
      >
        <AddScore ref="addScore" />
      </movable-view>
      <view class="ad-banner">
        <ad unit-id="adunit-19a28913cd82631c"></ad>
      </view>
    </view>
    <template v-if="gameState === 2">
      <view class="play-after-score"
        ><text class="current-score-text">本次得分</text
        >{{ currentScore }}</view
      >
      <ShareBtn />
      <view class="play-common-btn">
        <GoHomeBtn @tap="goHome" />
        <PlayAgainBtn @tap="playAgain()" />
      </view>
    </template>
    <view class="bottom-view"></view>
  </movable-area>
</template>
        
  <script>
import "./index.scss";
import { computed, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import Water from "./components/Water";
// import Basin from "./components/Basin";
import GoHomeBtn from "./components/GoHomeBtn";
import ShareBtn from "./components/ShareBtn";
import BeginBtn from "./components/BeginBtn";
import PlayAgainBtn from "./components/PlayAgainBtn";
import Score from "./components/Score";
import MaxScore from "./components/MaxScore";
import AddScore from "./components/AddScore";
import { AudioPlay } from "../../utils/audioPlay";
import { throttle } from "../../utils/throttle";
import {
  WATER_HEIGHT,
  WATER_WIDTH,
  gameBgUrl,
  waterUrl,
  gameOverUrl,
} from "../../app.enum";

export default {
  components: {
    Water,
    // Basin,
    Score,
    MaxScore,
    GoHomeBtn,
    ShareBtn,
    BeginBtn,
    PlayAgainBtn,
    AddScore,
  },
  props: {
    height: {
      type: Number,
      default: 200,
    },
    width: {
      type: Number,
      default: 200,
    },
    getWaterInfo: {
      type: Function,
      default: () => {},
    },
    interstitialAd: {
      type: Object,
      default: null,
    },
  },

  setup(props, { expose }) {
    const store = useStore();
    let waterWidth = ref(WATER_WIDTH);
    let waterHeight = ref(WATER_HEIGHT);
    let isTouch = ref(false);
    let basin = ref(null);
    let score = ref(0);
    let query = ref(null);
    let waters = ref([]);
    let addWaters = ref([]);
    let detectIntervalTimer = null;
    let bgPlayer = null;
    let gameOverPlay = null;
    let gameWaterPlay = null;
    let throttleGameOverPlay = throttle(playGameOverAudio, 3000);
    let addScore = ref(null);

    // 等级由分数决定
    let level = computed(() => {
      if (score.value <= 6) {
        return 1;
      }
      if (score.value > 6 && score.value <= 18) {
        return 2;
      }
      if (score.value > 18 && score.value <= 42) {
        return 3;
      }
      if (score.value > 42 && score.value <= 80) {
        return 4;
      }
      return 5;
    });
    let gameState = computed(() => store.getters.getGameState);
    const currentScore = computed(() => store.getters.getScore);
    let windowWidth = computed(() => store.getters.getWindowWidth);
    let windowHeight = computed(() => store.getters.getWindowHeight);
    const waterSpeed = computed(() => {
      if (level.value === 1) {
        return 1;
      }
      if (level.value === 2 || level.value === 3) {
        return 2;
      }
      if (level.value === 4 || level.value === 5) {
        return 3;
      }
      return 1;
    });

    // 等级变化后,创建更多水滴
    watch(level, (val) => {
      let addWatersTimer = setTimeout(() => {
        addWaters.value = createWaters(val);
        initSelectorQuery(addWaters.value);
        clearTimeout(addWatersTimer);
        addWatersTimer = null;
      }, 1000);
    });

    onMounted(() => {
      initGame();
      showInterstitialAd();
    });

    function showInterstitialAd() {
      // 在适合的场景显示插屏广告
      if (props.interstitialAd) {
        props.interstitialAd.show().catch((err) => {
          console.error(err);
        });
      }
    }

    // 初始化等级、水滴和水桶
    function initGame() {
      query.value = null;
      score.value = 0;
      store.dispatch("setScore", 0);
      waters.value = [];
      addWaters.value = createWaters(level.value);
      initSelectorQuery(addWaters.value);
    }

    // 创建水滴
    function createWaters(level) {
      let total = 0;
      if (level === 1) {
        total = 3;
      } else if (level === 5) {
        total = 9;
      } else {
        total = (level - 1) * 2 + 2;
      }
      let arr = [];
      const len = level === 1 ? 0 : waters.value.length;
      const num = total - len;
      let isBad = true;
      for (let i = 0; i < num; i++) {
        if (!len && i === 0) {
          isBad = false;
        } else {
          isBad = true;
        }
        arr.push({
          index: i + len,
          isBad,
          waterPoint: setWaterPoint(isBad),
          isShowWater: level === 1,
        });
      }
      if (level === 1) {
        waters.value = arr;
      } else {
        waters.value.push(...arr);
      }
      return arr;
    }
    // 设置水滴样式
    function setWaterPoint(isBad) {
      const xStyle = `left: ${Math.random() * 80 + WATER_WIDTH / 2}vw;`; // 5vw - 85vw
      const yStyle = `top: -${Math.random() * 8 + WATER_HEIGHT}vw;`;
      return xStyle + yStyle;
    }

    // 初始化水滴的位置监听
    function initSelectorQuery(waterInfos) {
      if (!query.value) {
        query.value = wx.createSelectorQuery();
        query.value.select(".basin").boundingClientRect();
        query.value.select(".bottom-view").boundingClientRect();
      }
      let n = waterInfos.length;
      const firstIndexInWaters = waters.value.length - n;
      for (let i = 0; i < n; i++) {
        query.value.select(`.water${waterInfos[i].index}`).boundingClientRect();
        waters.value[firstIndexInWaters + i].isShowWater = true;
      }
    }

    // 重设水滴状态
    function resetWater(index, currentWater, co2s) {
      if (!waters.value[index]) {
        // 预防报错
        return;
      }
      if (!waters.value[index].isShowWater) {
        return;
      }
      const isBad = waters.value[index].isBad;
      if (isBad) {
        // 碰到坏的，游戏结束
        setGameState(2);
        // 为再玩一局提前初始化准备
        score.value = 0;
        throttleGameOverPlay(gameOverUrl);
        destroyGameWaterPlayAudio();
        destroyBgPlayAudio();
        return;
      }
      waters.value[index].isShowWater = false;
      let currentCount = createScore(currentWater, co2s); // 分数
      score.value += currentCount;
      playGameWaterAudio(waterUrl);
      addScore.value.show(currentCount);
      store.dispatch("setScore", currentScore.value + currentCount);
      let timer = setTimeout(() => {
        if (!waters.value[index]) {
          clearTimeout(timer);
          timer = null;
          return;
        }
        waters.value[index].waterPoint = setWaterPoint(isBad);
        waters.value[index].isShowWater = true;
        clearTimeout(timer);
        timer = null;
      }, 3000);
    }

    function reachBottomResetWater(index) {
      if (!waters.value[index] || !waters.value[index].isShowWater) {
        return;
      }
      const isBad = waters.value[index].isBad;
      waters.value[index].isShowWater = false;
      let timer = setTimeout(() => {
        if (!waters.value[index]) {
          clearTimeout(timer);
          timer = null;
          return;
        }
        waters.value[index].waterPoint = setWaterPoint(isBad);
        waters.value[index].isShowWater = true;
        clearTimeout(timer);
        timer = null;
      }, 500);
    }

    // 碰撞检测
    function getIscollision(movableRect, otherRect) {
      if (!movableRect || !otherRect) {
        return;
      }
      if (
        movableRect.left < otherRect.left + otherRect.width - 20 &&
        movableRect.left + movableRect.width > otherRect.left + 20 &&
        movableRect.top < otherRect.top + otherRect.height &&
        movableRect.top + movableRect.height > otherRect.top
      ) {
        return true;
      } else {
        return false;
      }
    }

    // 比较水滴和co2的距离来算分
    function createScore(water, co2s) {
      const waterLeft = water.left;
      const waterTop = water.top;
      let count = 1;
      let levelScore = 0;
      if (level.value === 3) {
        levelScore = 1;
      }
      if (level.value === 4) {
        levelScore = 2;
      }
      if (level.value === 5) {
        levelScore = 3;
      }
      for (let i = 0; i < co2s.length; i++) {
        const x = Math.abs(co2s[i].left - waterLeft);
        const y = Math.abs(co2s[i].top - waterTop);

        if (x > 70 || y > 70) {
          count = Math.max(1 + levelScore, count);
          if (count === 3) {
            break;
          }
        }
        if (
          (x >= 45 && x <= 70 && y <= 70) ||
          (y >= 45 && y <= 70 && x <= 70)
        ) {
          count = Math.max(2 + levelScore, count);
          if (count === 3) {
            break;
          }
        }
        if (x < 45 && y < 45) {
          count = Math.max(3 + levelScore, count);
          if (count === 3) {
            break;
          }
        }
      }
      return count;
    }

    function detect() {
      if (query.value) {
        query.value.exec(function (res) {
          let waterInfos = res.slice(2);
          let n = waterInfos.length;
          const movableRect = res[0];
          const bottomView = res[1];
          for (let i = 0; i < n; i++) {
            const result = getIscollision(movableRect, waterInfos[i]);
            if (result) {
              resetWater(i, waterInfos[i], waterInfos.slice(1));
            }
            let isReachBottom = getIscollision(bottomView, waterInfos[i]);
            if (isReachBottom) {
              reachBottomResetWater(i);
            }
          }
        });
      }
    }

    function startDetectInterval() {
      endDetectInterval;
      detectIntervalTimer = setInterval(() => {
        detect();
      }, 50);
    }

    function endDetectInterval() {
      if (detectIntervalTimer) {
        clearInterval(detectIntervalTimer);
        detectIntervalTimer = null;
      }
    }

    // 判断是否拖着桶
    function start(e) {
      isTouch.value = true;
      startDetectInterval();
    }

    // 拖桶结束
    function end() {
      isTouch.value = false;
      endDetectInterval();
    }

    function startGame() {
      setGameState(1);
      playGameBgAudio();
    }

    function playGameBgAudio() {
      if (gameState.value === 1) {
        destroyBgPlayAudio();
        bgPlayer = new AudioPlay(gameBgUrl, true, 0, 1);
        bgPlayer.play();
      }
    }
    function destroyBgPlayAudio() {
      if (bgPlayer && bgPlayer.close) {
        // 销毁音频
        bgPlayer.close();
        bgPlayer = null;
      }
    }

    function playGameOverAudio(url) {
      if (!gameOverPlay) {
        gameOverPlay = new AudioPlay(url, false, 0, 1);
      }
      gameOverPlay.play();
      destroyGameOverPlayAudio();
    }

    function playGameWaterAudio(url) {
      if (!gameWaterPlay) {
        gameWaterPlay = new AudioPlay(url, false, 0, 1);
      }
      gameWaterPlay.play();
    }

    function destroyGameWaterPlayAudio() {
      if (gameWaterPlay) {
        let timer = setTimeout(() => {
          gameWaterPlay.close();
          gameWaterPlay = null;
          clearTimeout(timer);
          timer = null;
        }, 500);
      }
    }

    function destroyGameOverPlayAudio() {
      if (gameOverPlay) {
        let timer = setTimeout(() => {
          gameOverPlay.close();
          gameOverPlay = null;
          clearTimeout(timer);
          timer = null;
        }, 500);
      }
    }

    // setGameState
    function setGameState(state) {
      store.dispatch("setGameState", state);
    }

    // 再玩一次
    function playAgain() {
      initGame();
      startGame();
      showInterstitialAd();
    }

    //   goHome
    function goHome() {
      query.value = null;
      score.value = 0;
      destroyGameWaterPlayAudio();
      destroyBgPlayAudio();
      store.dispatch("setScore", 0);
      setGameState(0);
      store.dispatch("setSelected", 0);
    }

    expose({ playGameBgAudio, destroyGameWaterPlayAudio, destroyBgPlayAudio });

    return {
      waterWidth,
      waterHeight,
      windowWidth,
      windowHeight,
      waters,
      currentScore,
      isTouch,
      // isMove,
      score,
      gameState,
      addScore,
      waterSpeed,
      startGame,
      playAgain,
      setGameState,
      goHome,
      resetWater,
      start,
      end,
    };
  },
};
</script>