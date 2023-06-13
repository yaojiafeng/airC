<template>
  <view
    class="basin"
    v-on:touchmove="move"
    :style="styleObj"
    v-on:touchstart="start"
    v-on:touchend="end"
  ></view>
</template>
      
<script>
import "./index.scss";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
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

  setup(props, { emit }) {
    let translateX = ref(150);
    const store = useStore();

    let diff = ref(0);
    let isFirst = true;
    const windowWidth = computed(() => store.getters.getWindowWidth);

    let styleObj = computed(() => {
      return `transform: translateX(${translateX.value}px);`;
    });
    // 移动过程
    async function move(e) {
      // console.log("yao eeeee", props.getWaterInfo);
      const clientX = e.touches[0].clientX;
      const left = clientX - diff.value;
      console.log("yao left", left, windowWidth.value);
      if (left <= 0) {
        translateX.value = 0;
      } else {
        translateX.value = left;
      }

      // try {
      //   const info = await props.getWaterInfo();
      //   console.log("yao info uuuuu", info);
      //   const { top } = info;
      //   if (top >= 515) {
      //     wx.showToast({
      //       title: "老位置，接到水了",
      //       image: "../../images/emoj/41.png",
      //       duration: 1000,
      //     });
      //   }
      // } catch (e) {
      //   console.log("yao 333eeeeee", e);
      // }

      if (isFirst) {
        isFirst = false;
        // const observer = wx.createIntersectionObserver();
        // console.log("yao  observer", observer);
        // observer.relativeTo(".basin").observe(".water", (res) => {
        //   console.log("yao  res.intersectionRatio", res.intersectionRatio);
        //   if (res.intersectionRatio > 0) {
        //     wx.showToast({
        //       title: "老位置，接到水了",
        //       image: "../../images/emoj/41.png",
        //       duration: 1000,
        //     });
        //   }
        // });
      }
    }
    // 点击开始
    function start(e) {
      const clientX = e.touches[0].clientX;
      diff.value = clientX - translateX.value;
      emit("getIsTouch", true);

      console.log("yao touchstart111", diff.value, translateX.value);
    }

    function end() {
      emit("getIsTouch", false);
    }

    return {
      translateX,
      styleObj,
      start,
      move,
      end,
    };
  },
};
</script>