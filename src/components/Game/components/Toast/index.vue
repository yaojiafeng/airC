<template>
  <view class="toast-container" v-if="isShowToast">{{ toastMsg }} </view>
</template>
          
<script>
import "./index.scss";
import { ref } from "vue";
export default {
  setup(props, { expose }) {
    let toastMsg = ref("");
    let isShowToast = ref(false);
    function showToast(data) {
      toastMsg.value = data.toastMsg;
      isShowToast.value = true;
      let timer = setTimeout(() => {
        isShowToast.value = false;
        clearTimeout(timer);
        timer = null;
      }, data.duration);
    }
    expose({ showToast });
    return {
      toastMsg,
      isShowToast,
    };
  },
};
</script>