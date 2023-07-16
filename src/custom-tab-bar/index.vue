<template>
  <cover-view class="tab-bar" v-if="isShowTab">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view class="tab-bar-item" @tap="switchTab('a', 0, list[0].pagePath)">
      <cover-image v-if="!isAtHome" src="../images/home.png" />
      <cover-image v-else src="../images/home_on.png" />
      <cover-view :style="{ color: isAtHome ? selectedColor : color }">{{
        list[0].text
      }}</cover-view>
    </cover-view>
    <cover-view class="tab-bar-item" @tap="switchTab('a', 1, list[1].pagePath)">
      <cover-image v-if="!isAtGame" src="../images/play.png" />
      <cover-image v-else src="../images/play_on.png" />
      <cover-view :style="{ color: isAtGame ? selectedColor : color }">{{
        list[1].text
      }}</cover-view>
    </cover-view>
    <cover-view
      class="tab-bar-item"
      @tap="switchTab('b', selected, list[2].pagePath)"
    >
      <cover-image v-if="!isAtMedia" src="../images/media.png" />
      <cover-image v-else src="../images/media_on.png" />
      <cover-view :style="{ color: isAtMedia ? selectedColor : color }">{{
        list[2].text
      }}</cover-view>
    </cover-view>
  </cover-view>
</template>
  
<script setup>
import Taro from "@tarojs/taro";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
let selected = computed(() => store.getters.getSelected);
let tabSelected = computed(() => store.getters.getTabSelected);
let isShowTab = computed(
  () => !(tabSelected.value === "a" && selected.value === 1)
);

let isAtHome = computed(
  () => tabSelected.value === "a" && selected.value === 0
);

let isAtGame = computed(
  () => tabSelected.value === "a" && selected.value === 1
);

let isAtMedia = computed(() => tabSelected.value === "b");

const color = "#000000";
// const selectedColor = "#DC143C";
const selectedColor = "#FF8981";

const list = [
  {
    pagePath: "/pages/index/index",
    text: "空调",
  },
  {
    pagePath: "/pages/index/index",
    text: "接水",
  },
  {
    pagePath: "/pages/media/index",
    text: "视频",
  },
];

function switchTab(tab, index, url) {
  setTabSelected(tab);
  setSelected(index);
  Taro.switchTab({ url });
}

function setSelected(index) {
  store.dispatch("setSelected", index);
}

function setTabSelected(tab) {
  store.dispatch("setTabSelected", tab);
}
</script>
  
  <style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 13.4vw;
  background: #fff8ee;
  display: flex;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: #ffd6b1;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 0.13vw;
  transform: scaleY(0.5);
}

.tab-bar-item {
  flex: 1;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.tab-bar-item cover-image {
  width: 7.2vw;
  height: 7.2vw;
}

.tab-bar-item cover-view {
  font-size: 2.66vw;
}
</style>