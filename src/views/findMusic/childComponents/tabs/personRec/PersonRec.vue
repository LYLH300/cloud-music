<template>
  <div class="person-rec">
    <div class="banner">
      <banner :pic="bannerPic"></banner>
    </div>
    <div class="recommend-song-title" @click="toSongList">
      <span>推荐歌单</span> <i class="el-icon-arrow-right"></i>
    </div>
    <rec-song-list :recSongList="recSongList"></rec-song-list>

    <div class="recommend-song-title">
      <span>独家放送</span> <i class="el-icon-arrow-right"></i>
    </div>
    <exclusive :exclusive="exclusive"></exclusive>
    <div class="recommend-song-title">
      <span>最新音乐</span> <i class="el-icon-arrow-right"></i>
    </div>
    <latest-music :latestMusic="latestMusic"></latest-music>
    <div class="recommend-song-title">
      <span>推荐MV</span> <i class="el-icon-arrow-right"></i>
    </div>
    <rec-m-v :recMV='recMV'></rec-m-v>
    <div class="end">
      <span>没有啦</span>
    </div>
  </div>
</template>

<script>
import Banner from "components/content/banner/Banner.vue";
import RecSongList from "components/content/recSongList/RecSongList.vue";
import Exclusive from "components/content/exclusive/Exclusive.vue";
import LatestMusic from "components/content/latestMusic/LatestMusic.vue";
import RecMV from "components/content/recMV/RecMV.vue"
import {
  getBannerPic,
  getRecSongList,
  getExclusive,
  getlatestMusic,
  getRecMV,
} from "network/findMusic.js";
export default {
  name: "PersonRec",
  data() {
    return {
      bannerPic: null,
      recSongList: null,
      exclusive: null,
      latestMusic: null,
      recMV:null
    };
  },
  components: {
    Banner,
    RecSongList,
    Exclusive,
    LatestMusic,
    RecMV,
  },
  methods: {
    toSongList(){
      this.$emit('toSongList')
    }
  },
  created() {
    getBannerPic(0).then((res) => {
      this.bannerPic = res.banners;
    });
    getRecSongList(10).then((res) => {
      this.recSongList = res.result;
    });
    getExclusive(3).then((res) => {
      this.exclusive = res.result;
    });
    getlatestMusic(12).then((res) => {
      this.latestMusic = res.result;
    });
    getRecMV().then((res)=>{
      this.recMV = res.result
    })
  },
};
</script>

<style scoped>
.banner {
  margin-left: 50px;
  width: 1000px;
}
.recommend-song-title {
  font-size: 16px;
  color: rgb(175, 175, 175);
  margin-left: 30px;
  margin-bottom: 20px;
}
.recommend-song-title:hover {
  color: rgb(255, 255, 255);
}
.end{
  color: white;
  margin-left: 580px;
  margin-bottom: 20px;
}
</style>