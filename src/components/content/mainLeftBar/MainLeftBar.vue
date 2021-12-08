<template>
  <div class="main-left-bar">
    <left-bar>
      <template slot="recommend">
        <div class="recommend">
          <div class="recommend-title">推荐</div>

          <div :class="{active:index == 1, recommendItem:true}" @click="findMusic" >
            <i class="el-icon-menu"></i>
            <span>发现音乐</span>
          </div>
          <div :class="{active:index == 2, recommendItem:true}" @click="personalFM" >
            <i class="el-icon-microphone"></i>
            <span>私人FM</span>
          </div>
          <div :class="{active:index == 3, recommendItem:true}" @click="live">
            <i class="el-icon-video-camera"></i>
            <span>直播</span>
          </div>
          <div :class="{active:index == 4, recommendItem:true}" @click="video">
            <i class="el-icon-video-play"></i>
            <span>视频</span>
          </div>
          <div :class="{active:index == 5, recommendItem:true}" @click="friends">
            <i class="el-icon-user"></i>
            <span>朋友</span>
          </div>
        </div>
      </template>

      <template slot="myMusic">
        <div class="myMusic">
            <div class="myMusic-title">我的音乐</div>
        </div>
        <div class="myMusic-item">
            <i class="el-icon-receiving"></i>
            <span>本地音乐</span>
          </div>
          <div class="myMusic-item">
            <i class="el-icon-folder-opened"></i>
            <span>下载管理</span>
          </div>
          <div class="myMusic-item">
            <i class="el-icon-upload"></i>
            <span>我的音乐云盘</span>
          </div>
      </template>

      <template slot="createPlaylist">
        <div class="createPlaylist">
            <div class="createPlaylist-title">创建的歌单</div>
        </div>
        <div class="createPlaylist-item">
            <i class="el-icon-star-off"></i>
            <span>我喜欢的音乐</span>
          </div>
      </template>
      
    </left-bar>
  </div>
</template>

<script>
import LeftBar from "components/common/leftBar/LeftBar.vue";
export default {
  name: "MainLeftBar",
  components: {
    LeftBar,
  },
  data() {
    return {
      index:1,
    };
  },
  methods: {
    findMusic(){
      this.index = 1;
      this.$router.push('/findMusic')
    },
    personalFM(){
      this.index = 2;
      this.$router.push('/personalFM')
    },
    live(){
      this.index = 3;
      this.$router.push('/Live')
    },
    video(){
      this.index = 4;
      this.$router.push('/Video')
    },
    friends(){
      this.index = 5;
      this.$router.push('/Friends')
    },
  },
};
</script>

<style scoped>
.main-left-bar{
  font-size: 16px;
}
/* .recommend {
  height: 30px;
  line-height: 30px;
} */
.recommend-title, .myMusic-title,.createPlaylist-title{
  margin-left: 1%;
  height: 30px;
  line-height: 30px;
}
.recommendItem i, .myMusic-item i, .createPlaylist-item i{
  height: 30px;
  line-height: 30px;
  margin-left: 7%;
  margin-right: 5%;
}
.active{
  background-color:rgb(51, 51, 51);
  border-left: 2px red solid;
}
</style>