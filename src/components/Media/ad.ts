
let callBackFn = null
export function videoAdInit(videoAd) {
    // 在页面onLoad回调事件中创建激励视频广告实例
    if (wx.createRewardedVideoAd) {
        videoAd = wx.createRewardedVideoAd({
            adUnitId: "adunit-06270f3fa65490e9",
        });
        videoAd.onLoad(() => {
        });
        videoAd.onError((err) => { });
        // videoAd.value.onClose((res) => {});
        return videoAd
    }
}

export function showAd(videoAd) {
    // 在适合的场景显示插屏广告
    // 用户触发广告后，显示激励视频广告
    if (videoAd) {
        videoAd.show().catch(() => {
            // 失败重试
            videoAd
                .load()
                .then(() => videoAd.show())
                .catch((err) => {
                    console.log("激励视频 广告显示失败");
                });
        });
    }
}

export function initClose(videoAd, callBack, fail) {
    if (videoAd) {
        callBackFn = closeCallBack.bind(null, callBack, fail)
        videoAd.onClose(callBackFn);
    }
}

function closeCallBack(callBack, fail, res) {
    // 用户点击了【关闭广告】按钮
    if (res && res.isEnded) {
        // 正常播放结束，可以下发游戏奖励
        callBack && callBack()
    } else {
        // 播放中途退出，不下发游戏奖励
        fail && fail()
    }
}

export function offClose(videoAd) {
    if (videoAd) {
        videoAd.offClose(callBackFn);
    }
}
