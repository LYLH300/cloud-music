<template>
  <div class="music-detail">
    <div class="top">
      <div>
        <img
          :src="musicInfo && musicInfo.al.picUrl"
          alt=""
          :class="{ active: true, pause: $store.state.playing }"
        />
      </div>
      <div>
        <ul>
          <li class="musicName">
            {{ musicInfo && musicInfo.name }}
          </li>
          <li class="musicsinger">{{ musicInfo && musicInfo.ar[0].name }}</li>
          <li class="musicVolumn">{{ musicInfo && musicInfo.al.name }}</li>
        </ul>
        <div class="musicLyricWrapper">
          <div class="lyric" ref="lyric">
            <div
              class="musicLyric"
              :class="{active2:currentTime > allIndex[index] &&
        currentTime < allIndex[index + 1]}"
              ref="musicLyric"
              v-for="(item, key, index) in formateLyric"
              :key="index"
            >
              <p>{{ item }}{{ scroll(index) }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commentWrapper">
      <ul v-for="(item, index) in musicComment" :key="index" class="comment">
        <li><img :src="item.user.avatarUrl" alt="" /></li>
        <li class="nickname">{{ item.user.nickname }}：</li>
        <li class="content">{{ item.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {
  getMusicInfo,
  getMusicLyric,
  getMusicComment,
} from "network/findMusic.js";
export default {
  name: "MusicDetail",
  data() {
    return {
      musicId: null,
      musicInfo: null,
      musicLyric: "",
      musicComment: null,
      isActive: false,
      currentMUsicLyric: {},
      currentTime: null,
      maxTime: null,
      allIndex: [],
      lrcArr: {},
    };
  },
  methods: {
    scroll(index) {
      if (
        this.currentTime > this.allIndex[index] &&
        this.currentTime < this.allIndex[index + 1]
      ) {
        this.$refs.lyric.style.top = -(46 * (index - 2)) + "px";
      }
    },
  },
  computed: {
    formateLyric() {
      // 处理歌词，转化成key为时间，value为歌词的对象
      let lyrics = this.musicLyric.split("\n");
      let lrcObj = {};
      for (let i = 0; i < lyrics.length; i++) {
        let lyric = decodeURIComponent(lyrics[i]);
        // eslint-disable-next-line no-useless-escape
        let timeReg = /\[\d*:\d*((\.|\:)\d*)*\]/g;
        let timeRegExpArr = lyric.match(timeReg);
        if (!timeRegExpArr) continue;
        let clause = lyric.replace(timeReg, "");
        for (let k = 0, h = timeRegExpArr.length; k < h; k++) {
          let t = timeRegExpArr[k];
          // eslint-disable-next-line one-var
          let min = Number(String(t.match(/\[\d*/i)).slice(1)),
            // eslint-disable-next-line no-useless-escape
            sec = Number(String(t.match(/\:\d*/i)).slice(1));
          let time = min * 60 + sec;
          lrcObj[time] = clause;
        }
      }
      this.lrcArr = lrcObj;
      for (let key in lrcObj) {
        this.allIndex.push(key);
      }
      console.log(lrcObj);
      return lrcObj;
      // let newLyric = [];
      // let fullLyric = this.musicLyric.split("\n");
      // let row = fullLyric.length;
      // for (let i = 0; i < row; i++) {
      //   let temp_row = fullLyric[i];
      //   let temp_arr1 = temp_row.split("]");
      //   let temp_arr2 = temp_arr1[0].split('[');
      //   let temp_text = temp_arr1[1];
      //   let temp_time = temp_arr2[1];

      //  v-if="
      //           currentTime > allIndex[index] &&
      //           currentTime < allIndex[index + 1]
      //         "

      //   let temp_obj = {};
      //   temp_obj.time = temp_time;
      //   temp_obj.text = temp_text;

      //   newLyric.push(temp_obj);
      // }
      // return newLyric;
    },
    // getAllIndex(){
    //   for(let key in this.lrcArr){
    //     console.log(lrcArr);
    //     this.allIndex.push(key)
    //   }

    // }
  },
  created() {
    this.musicId = this.$route.params.id;

    getMusicInfo(this.musicId).then((res) => {
      this.musicInfo = res.songs[0];
    });
    getMusicLyric(this.musicId).then((res) => {
      console.log(res.lrc.lyric);
      this.musicLyric = res && res.lrc.lyric;
    });

    this.$bus.$on("startCircle", ({ circle }) => {
      this.isActive = circle;
    });

    this.$bus.$on("startLyric", ({ currentTime, maxTime }) => {
      this.currentTime = currentTime;
      this.maxTime = maxTime;
    });
    getMusicComment(this.musicId, 100).then((res) => {
      this.musicComment = res.comments;
    });
  },
  // beforeDestroy() {
  //   this.$Bus.$off("startCircle");
  // },
};
</script>

<style scoped>
.music-detail {
  position: fixed;
  background-color: rgb(43, 43, 43);
  width: 2240px;
  height: 670px;
  overflow: auto;
}
.top {
  display: flex;
  color: white;
  margin-top: 30px;
  margin-left: 300px;
}
.top img {
  height: 250px;
  width: 250px;
  border-radius: 50%;
  margin-top: 80px;
  margin-right: 100px;
}
.active {
  animation: circle 10s linear infinite forwards;
}
.active2{
  color: red;
}
.pause {
  animation-play-state: paused;
}

@keyframes circle {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.top ul {
  text-align: center;
  display: block;
  padding-inline-start: 0px;
}
.musicName {
  font-size: 40px;
}
.musicLyricWrapper {
  text-align: center;
  height: 300px;
  width: 300px;
  overflow: auto;
  position: relative;
}
.musicLyricWrapper::-webkit-scrollbar {
  display: none;
}
.lyric{
  position: absolute;
 
}
.musicLyric {
  margin-bottom: 30px;
  font-size: 14px;
  font-weight: 100;
  
}
.musicLyric p {
  height: 16px;
  text-align: center;
}
.commentWrapper {
  margin-top: 50px;
  margin-left: 250px;
  color: white;
  height: 222px;
  width: 1000px;
  text-align: left;
  
}
.comment::-webkit-scrollbar {
  display: none;
}
.commentWrapper .comment {
  color: white;
  display: flex;
  font-weight: 100;
  border-top: 1px solid rgb(52, 52, 52);
  height: 30px;
  line-height: 30px;
  padding-top: 12px;
}
.commentWrapper .comment img {
  width: 30px;
  height: 30px;
  border-radius: 15px;
  margin-top: -1px;
  margin-left: 30px;
  margin-right: 30px;
}
.comment .nickname {
  height: 30px;
  line-height: 30px;
  color: rgb(156, 220, 254);
}
.comment .content {
  height: 30px;
  line-height: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>