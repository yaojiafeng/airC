// 展示插屏广告
let interstitialAd = null
export function showInterstitialAd() {
    // 在适合的场景显示插屏广告
    if (interstitialAd) {
        (interstitialAd as any).show().catch((err) => {
            console.error(err);
        });
    }
}

// 初始化插屏广告
// 默认接水中切换
export function interstitialAdInit(adUnitId = 'adunit-073dad6cbb57e4c0') {
    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
        interstitialAd = wx.createInterstitialAd({
            adUnitId,
        });
        // interstitialAd.value.onLoad(() => {});
        // interstitialAd.value.onError((err) => {});
        // interstitialAd.value.onClose(() => {});
    }
}