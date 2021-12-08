<template>
  <div class="latest-music">
    <div
      v-for="(item, index) in latestMusic"
      :key="index"
      class="latest-music-item"
      @click="latestMusicClick(item.id)"
    >
      <img :src="item.picUrl" alt="" />
      <div>
        <div class="musicName">{{ item.name }}</div>
        <div class="singerName">{{ item.song.artists[0].name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMusicUrl, getMusicInfo } from "network/findMusic.js";
export default {
  name: "LatestMusic",
  data() {
    return {
      latestMusicUrl: null,
      latestMusicPic: null,
      latestMusicName: null,
      latestMusicSinger: null,
      latestMusicId: null,
    };
  },
  props: {
    latestMusic: Array,
  },
  methods: {
    // 将item url,pic,name,singer传递给vue audio组件
    latestMusicClick(value) {
      getMusicUrl(value).then((res) => {
        this.latestMusicId = res.data[0].id;
        this.latestMusicUrl = res.data[0].url;
      });
      getMusicInfo(value).then((res) => {
        this.latestMusicPic = res.songs[0].al.picUrl;
        this.latestMusicName = res.songs[0].name;
        this.latestMusicSinger = res.songs[0].ar[0].name;
      });
      this.$bus.$emit("latestMusicClick", {
        url: this.latestMusicUrl,
        pic: this.latestMusicPic,
        name: this.latestMusicName,
        singer: this.latestMusicSinger,
        id:this.latestMusicId
      });
    },
  },
};
</script>

<style scoped>
/* 水平分布各item */
.latest-music {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}

.latest-music-item {
  width: 400px;
  margin-bottom: 20px;
  display: flex;
  font-size: 20px;
  color: white;
}
img {
  margin-left: 50px;
  width: 80px;
  border-radius: 10px;
}
.musicName {
  margin-top: 10px;
  margin-left: 20px;
}
.singerName {
  margin-top: 10px;
  margin-left: 20px;
}
</style>