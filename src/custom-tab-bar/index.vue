<template>
  <cover-view class="tab-bar" v-if="selected === 0">
    <cover-view class="tab-bar-border"></cover-view>
    <cover-view class="tab-bar-item" @tap="switchTab(0, list[0].pagePath)">
      <cover-image v-if="selected !== 0" src="../images/home.png" />
      <cover-image v-else src="../images/home_on.png" />
      <cover-view :style="{ color: selected === 0 ? selectedColor : color }">{{
        list[0].text
      }}</cover-view>
    </cover-view>
    <cover-view class="tab-bar-item" @tap="switchTab(1, list[1].pagePath)">
      <cover-image v-if="selected !== 1" src="../images/play.png" />
      <cover-image v-else src="../images/play_on.png" />
      <cover-view :style="{ color: selected === 1 ? selectedColor : color }">{{
        list[1].text
      }}</cover-view>
    </cover-view>
  </cover-view>
</template>
  
<script setup>
// import Taro from "@tarojs/taro";
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();
let selected = computed(() => store.getters.getSelected);

const color = "#000000";
// const selectedColor = "#DC143C";
const selectedColor = "#FF8981";

const list = [
  {
    pagePath: "/pages/index/index",
    text: "空调",
  },
  {
    pagePath: "/pages/userCenter/index",
    text: "接水",
  },
];

function switchTab(index, url) {
  setSelected(index);
  //   Taro.switchTab({ url });
}

function setSelected(index) {
  store.dispatch("setSelected", index);
}
</script>
  
  <style lang="scss">
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 13.4vw;
  background: #FFF8EE;
  display: flex;
  padding-bottom: env(safe-area-inset-bottom);
}

.tab-bar-border {
  background-color: #FFD6B1;
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