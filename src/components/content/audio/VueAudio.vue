<template>
  <div class="audio">
    <div class="audio-info"></div>
    <div class="song-pic" @click="songDetail">
      <img :src="songPic" alt="" />
    </div>
    <div class="name-singer">
      <div class="songName">{{ songName }}</div>
      <div class="singer">{{ singer }}</div>
    </div>
    <div class="control">
      <div class="last-song" @click="prevClick">
        <i class="el-icon-caret-left"></i>
      </div>

      <div class="play-pause" @click="startPlayOrPause">
        <i v-if="!audio.playing" class="el-icon-video-play"></i>
        <i v-else class="el-icon-video-pause"></i>
      </div>

      <div class="next-song" @click="nextClick">
        <i class="el-icon-caret-right"></i>
      </div>

      <div class="time-progress">
        <div class="song-time-now">{{ getSongNowTime }}</div>
        <el-slider
          v-model="sliderTime"
          @change="changeCurrentTime"
          :format-tooltip="formatProcessToolTip"
          class="slider"
        ></el-slider>
        <div class="song-time-max">{{ getSongMaxTime }}</div>
        <div class="song-voice">
          <div class="song-voice-icon" @click="mute">
            <i v-if="!voice" class="el-icon-turn-off-microphone"></i>
            <i v-else class="el-icon-microphone"></i>
          </div>
          <el-slider
            class="slider-voice"
            v-model="sliderVoice"
            @change="changeCurrentVoice"
          >
          </el-slider>
        </div>
      </div>
    </div>

    <audio
      :src="url"
      ref="audio"
      @pause="onPause"
      @play="onPlay"
      @timeupdate="onTimeupdate"
      @loadedmetadata="onLoadedmetadata"
      @ended="ended"
      autoplay
    ></audio>

    <div class="storage">
      <div @click="contentDisplay" class="contentDisplay"><i class="el-icon-s-unfold"></i></div>
      <div @click="clearAll" class="clearAll"><i class="el-icon-close"></i></div>
      <div class="content" ref="content" v-show="show">
        <div
          v-for="(item, index) in $store.state.musicList"
          :key="index"
          :data-index="index"
          :musicId="item.id"
          ref="reMusic"
          @click="listMusicClick(item.id, index)"
          :class="{ activeRed: currentRed == index }"
        >
          <div>{{ item.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicUrl, getMusicInfo } from "network/findMusic.js";
export default {
  name: "VueAudio",
  props: {
    latestMusicUrl: Number,
  },
  data() {
    return {
      itemId:null,
      currentRed: -1,
      show: false,
      id: null,
      songPic: null,
      singer: null,
      songName: null,
      voiceIndex: null,
      url: null,
      voice: true,
      sliderTime: 0,
      sliderVoice: 50,
      audio: {
        playing: false,
        // 音频当前播放时长
        currentTime: 0,
        // 音频最大播放时长
        maxTime: 0,
      },
    };
  },
  methods: {
    // 控制音频的播放与暂停
    startPlayOrPause() {
      this.$bus.$emit("startCricle", {
        circle: this.audio.playing,
      });
      this.$store.commit("changePlaying", this.audio.playing);
      return this.audio.playing ? this.pause() : this.play();
    },
    // 播放音频
    play() {
      this.$refs.audio.play();
    },
    // 暂停音频
    pause() {
      this.$refs.audio.pause();
    },
    // 当音频播放
    onPlay() {
      this.audio.playing = true;
    },
    // 当音频暂停
    onPause() {
      this.audio.playing = false;
    },
    onLoadedmetadata(res) {
      this.audio.maxTime = res.target.duration;
    },
    onTimeupdate(res) {
      this.audio.currentTime = res.target.currentTime;
      this.sliderTime = parseInt(
        (this.audio.currentTime / this.audio.maxTime) * 100
      );
      this.$bus.$emit("startLyric", {
        currentTime: this.audio.currentTime,
        maxTime: this.audio.maxTime,
      });
    },
    changeCurrentTime(index) {
      this.$refs.audio.currentTime = parseInt(
        (index / 100) * this.audio.maxTime
      );
    },
    formatProcessToolTip() {
      return this.getSongNowTime;
    },
    changeCurrentVoice(index) {
      this.voiceIndex = index;
      this.$refs.audio.volume = index / 100;
      if (this.$refs.audio.volume == 0) {
        this.voice = false;
      } else {
        this.voice = true;
      }
    },
    mute() {
      this.voice = !this.voice;
      if (this.voice !== false) {
        this.$refs.audio.volume = this.voiceIndex / 100;
      } else {
        this.$refs.audio.volume = 0;
      }
    },
    songDetail() {
      this.$router.push("/musicDetail/" + this.id);
    },
    contentDisplay() {
      this.show = !this.show;
    },
    prevClick() {
       this.currentRed = this.currentRed - 1
      console.log(this.$store.state.musicList[this.currentRed].id);
      getMusicUrl(this.$store.state.musicList[this.currentRed].id).then((res) => {
        this.id = res.data[0].id;
        this.url = res.data[0].url;
      });
      getMusicInfo(this.$router.state.musicList[this.currentRed].id).then((res) => {
        this.songPic = res.songs[0].al.picUrl;
        this.songName = res.songs[0].name;
        this.singer = res.songs[0].ar[0].name;
      });
      this.currentRed = index;
      console.log(index);
      console.log(value);
     
    },
    nextClick() {
      this.currentRed = this.currentRed + 1
      console.log(this.$store.state.musicList[this.currentRed].id);
      getMusicUrl(this.$store.state.musicList[this.currentRed].id).then((res) => {
        this.id = res.data[0].id;
        this.url = res.data[0].url;
      });
      getMusicInfo(this.$router.state.musicList[this.currentRed].id).then((res) => {
        this.songPic = res.songs[0].al.picUrl;
        this.songName = res.songs[0].name;
        this.singer = res.songs[0].ar[0].name;
      });
      this.currentRed = index;
      console.log(index);
      console.log(value);
    },
    listMusicClick(value, index) {
      this.itemId = value;
      getMusicUrl(this.itemId).then((res) => {
        this.id = res.data[0].id;
        this.url = res.data[0].url;
      });
      getMusicInfo(value).then((res) => {
        this.songPic = res.songs[0].al.picUrl;
        this.songName = res.songs[0].name;
        this.singer = res.songs[0].ar[0].name;
      });
      this.currentRed = index;
      console.log(index);
      console.log(value);
    },
    clearAll(){
      this.$store.commit('clearAll')
    },
    ended(){
      this.nextClick()
    }
  },
  computed: {
    getSongNowTime() {
      let time = parseInt(this.audio.currentTime);
      let min =
        parseInt(time / 60) < 10
          ? "0" + parseInt(time / 60)
          : parseInt(time / 60);
      let second =
        parseInt(time % 60) < 10
          ? "0" + parseInt(time % 60)
          : parseInt(time % 60);
      return min + ":" + second;
    },
    getSongMaxTime() {
      let time = parseInt(this.audio.maxTime);
      let min =
        parseInt(time / 60) < 10
          ? "0" + parseInt(time / 60)
          : parseInt(time / 60);
      let second =
        parseInt(time % 60) < 10
          ? "0" + parseInt(time % 60)
          : parseInt(time % 60);
      return min + ":" + second;
    },
  },
  created() {
    // 接收latestMusic组件传来的歌曲url并赋值
    this.$bus.$on("latestMusicClick", ({ url, pic, name, singer, id }) => {
      console.log(this.url);
      this.url = url;
      this.songPic = pic;
      this.songName = name;
      this.singer = singer;
      this.id = id;

      // console.log(name)
    });
    // 接收listMusic组件传来的歌曲url并赋值
    this.$bus.$on("listMusicClick", ({ url, pic, name, singer, id }) => {
      this.url = url;
      this.songPic = pic;
      this.songName = name;
      this.singer = singer;
      this.id = id;

      // console.log(name)
    });
    // 接收searchMusic组件传来的歌曲url并赋值
    this.$bus.$on("searchMusicClick", ({ url, pic, name, singer, id }) => {
      this.url = url;
      this.songPic = pic;
      this.songName = name;
      this.singer = singer;
      this.id = id;

      // console.log(name)
    });

    // request({
    //   url: "/song/url?id=33894311",
    // }).then((res) => {
    //   this.url = res.data[0].url;
    // });

    //  this.$axios.get('/api/song/url?id=33894312').then(res =>{
    //    this.url = res.data.data[0].url;
    //    console.log(this.url);
    //  })
  },
  // beforeDestroy() {
  //   this.$Bus.$off("latestMusicClick");
  //   this.$Bus.$off("listMusicClick");
  // },
};
</script>

<style  scoped>
.audio {
  display: flex;
  background-color: rgb(33, 33, 36);
  width: 100%;
  height: 59px;
}
.control {
  display: flex;
  color: white;
  font-size: 30px;
  padding-left: 85px;
}
.control i {
  padding-right: 35px;
  padding-top: 14px;
}
.time-progress {
  display: flex;
  font-size: 14px;
  width: 650%;
}
.song-time-now {
  width: 40px;
  height: 59px;
  line-height: 59px;
}
.song-time-max {
  width: 40px;
  height: 59px;
  line-height: 59px;
}
.slider {
  box-sizing: border-box;
  padding-right: 15px;
  padding-left: 10px;
  padding-top: 10px;
  width: 600px;
  height: 59px;
  line-height: 59px;
}
.song-voice {
  display: flex;
}
.song-voice i {
  padding-left: 10px;
  padding-top: 21px;
  font-size: 16px;
}
.slider-voice {
  box-sizing: border-box;
  margin-left: -10px;
  padding-right: 15px;
  padding-top: 10px;
  width: 100px;
  height: 59px;
  line-height: 59px;
}
/* 修改进度条颜色 */
.slider >>> .el-slider__bar {
  background: #ff0000;
}

/* 修改进度条按钮样式 */
.slider >>> .el-slider__button {
  width: 10px;
  height: 10px;
  background: #ff0000;
  border: solid 2px #ff0000;
}
.slider-voice >>> .el-slider__bar {
  background: #ff0000;
}

/* 修改进度条按钮样式 */
.slider-voice >>> .el-slider__button {
  width: 10px;
  height: 10px;
  background: #ff0000;
  border: solid 2px #ff0000;
}
.song-pic img {
  margin-left: 20px;
  width: 59px;
  height: 59px;
}
.songName,
.singer {
  margin-left: 10px;
  font-size: 12px;
  color: white;
}
.songName {
  width: 100px;
  margin-top: 8px;
  height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.singer {
  width: 100px;
  margin-top: 2px;
  height: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.storage {
  position: relative;
}
.storage .contentDisplay i{
  color: white;
  position: absolute;
  font-size: 20px;
  right: -50px;
  bottom: 20px;
  
}
.storage .clearAll i{
  color: white;
  position: absolute;
  font-size: 20px;
  right: -100px;
  bottom: 20px;
  
}

.storage .content {
  width: 340px;
  height: 670px;
  background-color: rgba(54, 54, 54);
  position: absolute;
  bottom: 59px;
  right: -192px;
  overflow: auto;
  z-index: 2;
}
.storage .content::-webkit-scrollbar {
  display: none;
}
.activeRed {
  color: #ff0000;
}
</style>