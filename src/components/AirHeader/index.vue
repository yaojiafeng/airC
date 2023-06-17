<template>
  <view
    :class="['header-bg-common', isGame || isOpen ? 'header-bg-open' : 'header-bg-close']"
  >
    <view class="header-status-common header-status-icon" v-if="!isOpen && !isGame" />
    <text
      class="header-status-common header-count"
      v-if="(isGame || isOpen) && currentMode !== 1"
      >{{ count }}</text
    >
    <text
      class="header-status-common header-count-unit"
      v-if="(isGame || isOpen) && currentMode !== 1"
      >° c</text
    >
  </view>
</template>
  
<script>
import { defaultMode, defaultCount } from "../../app.enum";
import "./index.scss";

export default {
  props: {
    isOpen: {
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
    isGame: {
      type: Boolean,
      default: false,
    },
  },
};
</script>