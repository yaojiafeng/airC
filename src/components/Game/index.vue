<template>
  <movable-area class="area" scale-area>
    <template v-if="gameState === 0">
      <view class="game-title">接一接</view>
      <view class="begin-btn" @tap="setGameState(1)">
        <image class="begin-icon" src="../../images/action-icon.png" />
        开始游戏</view
      >
    </template>
    <view v-show="gameState === 1">
      <Water
        :class="'water' + index"
        :animationPlayState="isTouch && item.isShowWater"
        :style="item.waterPoint"
        :isBad="item.isBad"
        v-show="item.isShowWater"
        v-for="(item, index) in waters"
        :key="index"
        :data-index="index"
      />
      <movable-view
        class="basin"
        direction="all"
        :x="windowWidth / 2 - 20 + 'px'"
        :y="windowHeight * 0.8 - 100"
        @change="change"
        v-on:touchstart="start"
        v-on:touchend="end"
      >
      </movable-view>
    </view>
    <template v-if="gameState === 2">
      <view class="play-after-score">本次得分{{ score }}</view>
      <view class="play-after-btn">
        <GoHomeBtn @tap="goHome" />
        <PlayAgainBtn @tap="playAgain()" />
      </view>
    </template>
    <view class="bottom-view"></view>
  </movable-area>
</template>
        
  <script>
import "./index.scss";
import { computed, ref, watch, onMounted, nextTick, reactive } from "vue";
import { useStore } from "vuex";
import Water from "./components/Water";
// import Basin from "./components/Basin";
import GoHomeBtn from "./components/GoHomeBtn";
import PlayAgainBtn from "./components/PlayAgainBtn";

import { throttle } from "../../utils/throttle";
import { animation } from "@tarojs/shared";

export default {
  components: {
    Water,
    // Basin,
    GoHomeBtn,
    PlayAgainBtn,
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
  },
  emits: ["getIsTouch"],

  setup() {
    const store = useStore();
    let isTouch = ref(false);
    let basin = ref(null);
    let waterPoint = ref(Math.random() * 92);
    let score = ref(0);
    let query = ref(null);
    let waters = ref([]);

    // 等级由分数决定
    let level = computed(() => {
      if (score.value <= 12) {
        return 1;
      }
      if (score.value <= 30 && score.value > 12) {
        return 2;
      }
      if (score.value > 30 && score.value <= 48) {
        return 3;
      }
      if (score.value > 48 && score.value <= 60) {
        return 4;
      }
      if (score.value > 60 && score.value <= 80) {
        return 5;
      }
      return 6;
    });

    let gameState = computed(() => store.getters.getGameState);
    let windowWidth = computed(() => store.getters.getWindowWidth);
    let windowHeight = computed(() => store.getters.getWindowHeight);
    // 等级变化后,创建更多水滴
    watch(level, (val) => {
      const addWaters = createWaters(val);
      initSelectorQuery(addWaters);
    });

    onMounted(() => {
      initGame();
    });

    // 初始化等级、水滴和水桶
    function initGame() {
      query.value = null;
      //   level.value = 1;
      score.value = 0;
      store.dispatch("setScore", 0);
      waters.value = [];
      const addWaters = createWaters(level.value);
      initSelectorQuery(addWaters);
    }

    // 创建水滴
    function createWaters(level) {
      let total = (level - 1) * 2 + 2;
      let arr = [];
      const len = waters.value.length;
      const num = total - len;
      for (let i = 0; i < num; i++) {
        const isBad = i % 2 === 0;
        arr.push({
          index: i + len,
          isBad,
          waterPoint: setWaterPoint(isBad),
          isShowWater: true,
          isRun: isTouch.value,
        });
      }
      waters.value = waters.value.concat(arr);
      return arr;
    }
    // 设置水滴样式
    function setWaterPoint(isBad) {
      // transform: translateY(${
      //   Math.random() * 20
      // }vw);
      // animation-duration: 3s;
      const xStyle = `left: ${Math.random() * 80 + 5}vw;`; // 5vw - 85vw
      const yStyle = `transform: translateY(${Math.random() * 20}vw;`;
      return xStyle + yStyle;
    }

    // 重设水滴状态
    function resetWater(index, isReachBottom = false) {
      if (!waters.value[index].isShowWater) {
        console.log("yao resetWater");
        return;
      }
      const isBad = waters.value[index].isBad;
      if (isBad && !isReachBottom) {
        setGameState(2);
        return;
      }
      waters.value[index].isShowWater = false;
      let timer = setTimeout(() => {
        waters.value[index].isShowWater = true;
        waters.value[index].waterPoint = setWaterPoint(isBad);
        score.value += level.value;
        console.log("yao   score.value", score.value, level.value);
        store.dispatch("setScore", score.value);
        clearTimeout(timer);
        timer = null;
      }, 800);
    }

    // 初始化水滴的位置监听
    function initSelectorQuery(waterInfos) {
      if (gameState.value === 0 || gameState.value === 1) {
        let timer = setTimeout(() => {
          if (!query.value) {
            query.value = wx.createSelectorQuery();
            query.value.select(".basin").boundingClientRect();
            query.value.select(".bottom-view").boundingClientRect();
          }
          let n = waterInfos.length;
          for (let i = 0; i < n; i++) {
            query.value
              .select(`.water${waterInfos[i].index}`)
              .boundingClientRect();
            waters.value[i].isShowWater = true;
          }
          clearTimeout(timer);
          timer = null;
        }, 3000);
      }
    }

    // 碰撞检测
    function getIscollision(movableRect, otherRect) {
      if (
        movableRect.left < otherRect.left + otherRect.width &&
        movableRect.left + movableRect.width > otherRect.left &&
        movableRect.top < otherRect.top + otherRect.height &&
        movableRect.top + movableRect.height > otherRect.top
      ) {
        return true;
      } else {
        return false;
      }
    }

    // 移动过程
    function change(e) {
      if (query.value) {
        query.value.exec(function (res) {
          let waterInfos = res.slice(2);
          let n = waterInfos.length;
          const movableRect = res[0];
          const bottomView = res[1];
          for (let i = 0; i < n; i++) {
            const result = getIscollision(movableRect, waterInfos[i]);
            if (result) {
              throttle(resetWater, 1000)(i);
            }
            let isReachBottom = getIscollision(bottomView, waterInfos[i]);
            if (isReachBottom) {
              throttle(resetWater, 1000)(i, true);
            }
          }
        });
      }
    }

    // 判断是否拖着桶
    function start(e) {
      isTouch.value = true;
    }

    function end() {
      isTouch.value = false;
    }

    // setGameState
    function setGameState(state) {
      //   level.value = 1;
      store.dispatch("setGameState", state);
    }
    function playAgain() {
      initGame();
      setGameState(1);
    }

    //   goHome
    function goHome() {
      score.value = 0;
      store.dispatch("setScore", 0);
      setGameState(0);
      store.dispatch("setSelected", 0);
    }

    return {
      windowWidth,
      windowHeight,
      waters,
      score,
      isTouch,
      gameState,
      playAgain,
      setGameState,
      goHome,
      resetWater,
      start,
      end,
      change,
    };
  },
};
</script>