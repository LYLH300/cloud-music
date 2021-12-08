<template>
  <div class="song-list-describe">
    <div>
      <!-- 添加&&解决异步加载报错问题 -->
      <img :src="songListInfo && songListInfo.coverImgUrl" alt="" />
    </div>
    <div class="text">
      <div class="name">歌单：{{ songListInfo && songListInfo.name }}</div>
      <div class="create-time">
        {{ getCreateTime }}创建
      </div>
      <div class="describe">
        简介：{{ songListInfo && songListInfo.description }}
      </div>
      <div class="song-num-play-num">
        <div>
          歌曲：{{
            songListInfo && songListInfo.trackIds.length
          }}
          &nbsp;&nbsp;播放：{{
            parseInt((songListInfo && songListInfo.playCount) / 10000) + 1
          }}万
        </div>
      </div>
      <div class="tags">
        tags：
        <div v-for="item in songListInfo && songListInfo.tags" :key="item">
          {{ item }}&nbsp;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SongListDescribe",
  data() {
    return {};
  },
  props: {
    songListInfo: Object,
  },
  computed: {
    // 利用new date使时间戳转化为年月日时分秒
    getCreateTime() {
      let date = new Date(parseInt(this.songListInfo && this.songListInfo.createTime));
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d + " ";
    },
  },
  methods: {
  },
};
</script>

<style scoped>
.song-list-describe {
  color: white;
  display: flex;
  margin-top: 50px;
  margin-left: 50px;
}
.text {
  margin-left: 50px;
  margin-top: 10px;
  width: 800px;
}
.describe,
.name,
.song-num-play-num,
.tags,
.create-time {
  margin-top: 10px;
}
.describe {
  height: 20px;
  /* 省略多行文字 */
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
.name {
  font-size: 30px;
}
img {
  width: 250px;
  border-radius: 10px;
}
.tags {
  display: flex;
}
</style>