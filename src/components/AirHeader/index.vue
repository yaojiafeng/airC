<template>
  <view
    :class="['header-bg-common', isOpen ? 'header-bg-open' : 'header-bg-close']"
  >
    <view class="header-status-common header-status-icon" v-if="!isOpen" />
    <text
      class="header-status-common header-count"
      v-if="isOpen && currentMode !== 1"
      >{{ count }}</text
    >
    <text
      class="header-status-common header-count-unit"
      v-if="isOpen && currentMode !== 1"
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
  },
};
</script>