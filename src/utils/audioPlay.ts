export class AudioPlay {
    url: string;
    loop: boolean;
    startTime: number;
    volume: number;
    innerAudioContext: any
    constructor(url = '', loop = false, startTime = 0, volume = 1) {
        this.url = url;
        this.loop = loop;
        this.startTime = startTime;
        this.volume = volume;
        this.innerAudioContext = null;
        this.init();
    }
    // 实例初始化
    init() {
        this.innerAudioContext = wx.createInnerAudioContext({
            useWebAudioImplement: true,
        });
        this.innerAudioContext.src = this.url;
        this.innerAudioContext.startTime = this.startTime;
        this.innerAudioContext.volume = this.volume;
        this.innerAudioContext.loop = this.loop;
    }

    // 播放
    play() {
        if (this.innerAudioContext) {
            this.innerAudioContext.play()

        }
    }

    // 暂停
    pause() {
        if (this.innerAudioContext) {
            this.innerAudioContext.pause()
        }
    }

    // 设置音量
    setVolume(volume) {
        this.innerAudioContext.volume = volume;
    }

    // 销毁
    close() {
        if (this.innerAudioContext) {
            this.innerAudioContext.destroy();
            this.innerAudioContext = null;
        }
    }

}