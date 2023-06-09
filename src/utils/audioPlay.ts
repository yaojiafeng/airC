export class AudioPlay {
    // https://cdn1.u.h5mc.com/c/ks5f/g8a0/audios/646788e6ee5b5b03b509d56f.mp3
    constructor(url = '', loop = false, startTime = 0, volume = 1) {
        this.url = url;
        this.loop = loop;
        this.startTime = startTime;
        this.volume = volume;
        this.innerAudioContext = null;
        this.init();
    }
    init() {
        this.innerAudioContext = wx.createInnerAudioContext({
            useWebAudioImplement: true, // 是否使用 WebAudio 作为底层音频驱动，默认关闭。对于短音频、播放频繁的音频建议开启此选项，开启后将获得更优的性能表现。由于开启此选项后也会带来一定的内存增长，因此对于长音频建议关闭此选项
        });
        console.log('yao AudioPlay init', this.innerAudioContext)
        this.innerAudioContext.src = this.url;
        this.innerAudioContext.startTime = this.startTime;
        this.innerAudioContext.volume = this.volume;
        this.innerAudioContext.loop = this.loop;
        // this.innerAudioContext.duration = 2
    }
    play() {
        if (this.innerAudioContext) {
            this.innerAudioContext.play()
            // setTimeout(()=>{
            //     this.innerAudioContext.seek(8.049886621315192)
            // },1000)

        }
    }

    setVolume(volume) {
        console.log('yao setVolume', this.innerAudioContext, volume)
        this.innerAudioContext.volume = volume;
    }

    close() {
        if (this.innerAudioContext) {
            this.innerAudioContext.destroy();
            this.innerAudioContext = null;
        }
    }

}