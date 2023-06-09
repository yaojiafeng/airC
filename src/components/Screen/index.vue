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
</template>
    
<script>
import { defaultMode, defaultCount, defaultSpeed } from "../../app.enum";
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
};
</script>