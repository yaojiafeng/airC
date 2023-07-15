<template>
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
                class="speed-common speed-1"
                v-if="currentSpeed >= 1 && !isConservation"
              ></view>
              <view
                class="speed-common speed-2"
                v-if="currentSpeed >= 2 && !isConservation"
              ></view>
              <view
                class="speed-common speed-3"
                v-if="currentSpeed >= 3 && !isConservation"
              ></view>
              <view
                class="speed-common speed-4"
                v-if="currentSpeed >= 4 && !isConservation"
              ></view>
              <view
                class="speed-common speed-5"
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
    <!-- <view class="middle-display" v-if="isOpen">
      {{ colText || "" }}
      {{ rowText || "" }}
    </view> -->
    <view
      :class="['bottom-display', count === 10 ? 'min-message' : '']"
      v-if="isOpen"
    >
      <!-- {{ message }} -->
      <template v-if="!isConservation">
        <image
          src="../../images/emoj/10.png"
          :class="['emoj', freeEmoj.includes(10) ? 'emoj-free' : '']"
          v-if="+count === 10"
        ></image>
        <image
          src="../../images/emoj/11.png"
          :class="['emoj', freeEmoj.includes(11) ? 'emoj-free' : '']"
          v-if="+count === 11"
        ></image>
        <image
          src="../../images/emoj/12.png"
          :class="['emoj', freeEmoj.includes(12) ? 'emoj-free' : '']"
          v-if="+count === 12"
        ></image>
        <image
          src="../../images/emoj/13.png"
          :class="['emoj', freeEmoj.includes(13) ? 'emoj-free' : '']"
          v-if="+count === 13"
        ></image>
        <image
          src="../../images/emoj/14.png"
          :class="['emoj', freeEmoj.includes(14) ? 'emoj-free' : '']"
          v-if="+count === 14"
        ></image>
        <image
          src="../../images/emoj/15.png"
          :class="['emoj', freeEmoj.includes(15) ? 'emoj-free' : '']"
          v-if="+count === 15"
        ></image>
        <image
          src="../../images/emoj/16.png"
          :class="['emoj', freeEmoj.includes(16) ? 'emoj-free' : '']"
          v-if="+count === 16"
        ></image>
        <image
          src="../../images/emoj/17.png"
          :class="['emoj', freeEmoj.includes(17) ? 'emoj-free' : '']"
          v-if="+count === 17"
        ></image>
        <image
          src="../../images/emoj/18.png"
          :class="['emoj', freeEmoj.includes(18) ? 'emoj-free' : '']"
          v-if="+count === 18"
        ></image>
        <image
          src="../../images/emoj/19.png"
          :class="['emoj', freeEmoj.includes(19) ? 'emoj-free' : '']"
          v-if="+count === 19"
        ></image>
        <image
          src="../../images/emoj/20.png"
          :class="['emoj', freeEmoj.includes(20) ? 'emoj-free' : '']"
          v-if="+count === 20"
        ></image>
        <image
          src="../../images/emoj/21.svg"
          :class="['emoj', freeEmoj.includes(21) ? 'emoj-free' : '']"
          v-if="+count === 21"
        ></image>
        <image
          src="../../images/emoj/22.png"
          :class="['emoj', freeEmoj.includes(22) ? 'emoj-free' : '']"
          v-if="+count === 22"
        ></image>
        <image
          src="../../images/emoj/23.png"
          :class="['emoj', freeEmoj.includes(23) ? 'emoj-free' : '']"
          v-if="+count === 23"
        ></image>
        <image
          src="../../images/emoj/24.png"
          :class="['emoj', freeEmoj.includes(24) ? 'emoj-free' : '']"
          v-if="+count === 24"
        ></image>
        <image
          src="../../images/emoj/25.png"
          :class="['emoj', freeEmoj.includes(25) ? 'emoj-free' : '']"
          v-if="+count === 25"
        ></image>
        <image
          src="../../images/emoj/26.png"
          :class="['emoj', freeEmoj.includes(26) ? 'emoj-free' : '']"
          v-if="+count === 26"
        ></image>
        <image
          src="../../images/emoj/27.png"
          :class="['emoj', freeEmoj.includes(27) ? 'emoj-free' : '']"
          v-if="+count === 27"
        ></image>
        <image
          src="../../images/emoj/28.png"
          :class="['emoj', freeEmoj.includes(28) ? 'emoj-free' : '']"
          v-if="+count === 28"
        ></image>
        <image
          src="../../images/emoj/29.png"
          :class="['emoj', freeEmoj.includes(29) ? 'emoj-free' : '']"
          v-if="+count === 29"
        ></image>
        <image
          src="../../images/emoj/30.png"
          :class="['emoj', freeEmoj.includes(30) ? 'emoj-free' : '']"
          v-if="+count === 30"
        ></image>
        <image
          src="../../images/emoj/31.png"
          :class="['emoj', freeEmoj.includes(31) ? 'emoj-free' : '']"
          v-if="+count === 31"
        ></image>
        <image
          src="../../images/emoj/32.png"
          :class="['emoj', freeEmoj.includes(32) ? 'emoj-free' : '']"
          v-if="+count === 32"
        ></image>
        <image
          src="../../images/emoj/33.png"
          :class="['emoj', freeEmoj.includes(33) ? 'emoj-free' : '']"
          v-if="+count === 33"
        ></image>
        <image
          src="../../images/emoj/34.png"
          :class="['emoj', freeEmoj.includes(34) ? 'emoj-free' : '']"
          v-if="+count === 34"
        ></image>
        <image
          src="../../images/emoj/35.png"
          :class="['emoj', freeEmoj.includes(35) ? 'emoj-free' : '']"
          v-if="+count === 35"
        ></image>
        <image
          src="../../images/emoj/36.png"
          :class="['emoj', freeEmoj.includes(36) ? 'emoj-free' : '']"
          v-if="+count === 36"
        ></image>
        <image
          src="../../images/emoj/37.png"
          :class="['emoj', freeEmoj.includes(37) ? 'emoj-free' : '']"
          v-if="+count === 37"
        ></image>
        <image
          src="../../images/emoj/38.png"
          :class="['emoj', freeEmoj.includes(38) ? 'emoj-free' : '']"
          v-if="+count === 38"
        ></image>
        <image
          src="../../images/emoj/39.png"
          :class="['emoj', freeEmoj.includes(39) ? 'emoj-free' : '']"
          v-if="+count === 39"
        ></image>
        <image
          src="../../images/emoj/40.png"
          :class="['emoj', freeEmoj.includes(40) ? 'emoj-free' : '']"
          v-if="+count === 40"
        ></image>
      </template>
      <!-- {{ message }} -->
      <text class="share-tips" v-else>节能模式</text>
      <image
        src="../../images/emoj/41.png"
        class="emoj emoj-free"
        v-show="false"
      ></image>
      <text class="share-tips" v-if="isBlur && !isConservation">转发查看</text>
    </view>
  </view>
</template>
    
<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import {
  defaultMode,
  defaultCount,
  defaultSpeed,
  MIN_COUNT,
  MAX_COUNT,
} from "../../app.enum";
// import { getStorageSync, setStorageSync } from "../../utils/storage";
import "./index.scss";

export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    isConservation: {
      type: Boolean,
      default: false,
    },
    count: {
      type: Number,
      default: defaultCount,
    },
    currentMode: {
      type: Number,
      default: defaultMode,
    },
    currentSpeed: {
      type: Number,
      default: defaultSpeed,
    },
    colText: {
      type: String,
      default: "",
    },
    rowText: {
      type: String,
      default: "",
    },
    message: {
      type: String,
      default: "",
    },
  },
  setup(props) {
    const store = useStore();
    let freeEmoj = computed(() => store.getters.getFreeEmoj
    // {
      // 一进来，看现在的温度count, 如果已经分享过了，那就读取store的
      // let result = "";
      // if (props.count > MIN_COUNT && props.count < MAX_COUNT) {
      //   result = `${props.count - 1},${props.count},${props.count + 1}`;
      // }
      // if (props.count === MIN_COUNT) {
      //   result = `${props.count},${props.count + 1},${props.count + 2}`;
      // }
      // if (props.count === MAX_COUNT) {
      //   result = `${props.count - 2},${props.count - 1},${props.count}`;
      // }
      // let storeFreeEmoj = store.getters.getFreeEmoj;
      // if (storeFreeEmoj) {
      //   return storeFreeEmoj;
      // }
      // store.dispatch("setFreeEmoj", result);
      // return result;
    // }
    );

    let isBlur = computed(() => !freeEmoj.value.includes(props.count));
    return {
      freeEmoj,
      isBlur,
    };
  },
};
</script>