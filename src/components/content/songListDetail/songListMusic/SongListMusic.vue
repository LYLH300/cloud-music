<template>
  <div id="song-list-music">
    <el-tabs class="el-tabs" v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="歌曲列表" name="first">
        <table class="item">
          <th>
            <tr>
              <td class="title">标题</td>
              <td class="singer">歌手</td>
              <td class="volumn">专辑</td>
            </tr>
          </th>
          <tbody>
            <tr
              v-for="(item, index) in musicInfo"
              :key="index"
              @click="musicClick(item.id, index)"
            >
              <td :class="[{ title: true }, { active: currentIndex == index }]">
                {{ item.name }}
              </td>
              <td
                :class="[{ singer: true }, { active: currentIndex == index }]"
              >
                {{ item.ar[0].name }}
              </td>
              <td
                :class="[{ volumn: true }, { active: currentIndex == index }]"
              >
                {{ item.al.name }}
              </td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>

      <el-tab-pane label="评论" name="second">
        <ul
          class="comment"
          v-for="(item, index) in musicListComment"
          :key="index"
        >
          <li><img :src="item.user.avatarUrl" alt="" /></li>
          <li class="nickname">{{ item.user.nickname }}：</li>
          <li class="content">{{ item.content }}</li>
        </ul>
      </el-tab-pane>
      <el-tab-pane label="收藏者" name="fourth">
        <div class="wrapper">
          <div
            class="subscriber"
            v-for="(item, index) in musicListSubscriber"
            :key="index"
          >
            <div class="subscriberPic">
              <img :src="item.avatarUrl" alt="" />
            </div>
            <div class="subscriber-name-signature">
              <div class="name">{{ item.nickname }}</div>
              <div class="signature">{{ item.signature }}</div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {
  getSongListMusic,
  getMusicUrl,
  getMusicInfo,
  getSongListComment,
  getSongListSubscriber,
} from "network/findMusic.js";
export default {
  name: "SongListMusic",
  data() {
    return {
      activeName: "first",
      musicInfo: null,
      latestMusicId: null,
      latestMusicUrl: null,
      latestMusicPic: null,
      latestMusicName: null,
      latestMusicSinger: null,
      currentIndex: -1,
      isActive: false,
      musicListComment: null,
      musicListSubscriber: null,
    };
  },
  props: {
    songListId: String,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    musicClick(value, index) {
      getMusicUrl(value).then((res) => {
        this.latestMusicUrl = res.data[0].url;
        this.latestMusicId = res.data[0].id;
      });
      getMusicInfo(value).then((res) => {
        this.latestMusicPic = res.songs[0].al.picUrl;
        this.latestMusicName = res.songs[0].name;
        this.latestMusicSinger = res.songs[0].ar[0].name;
      });
      this.$bus.$emit("listMusicClick", {
        url: this.latestMusicUrl,
        pic: this.latestMusicPic,
        name: this.latestMusicName,
        singer: this.latestMusicSinger,
        id:this.latestMusicId,
      });
      this.isActive = !this.isActive;
      this.currentIndex = index;
      console.log(this.currentIndex);
      console.log(index);
    },
  },
  created() {
    getSongListMusic(this.songListId).then((res) => {
      this.musicInfo = res.songs;
    });
    getSongListComment(this.songListId, 100).then((res) => {
      this.musicListComment = res.comments;
      console.log(this.musicListComment);
    });
    getSongListSubscriber(this.songListId, 100).then((res) => {
      this.musicListSubscriber = res.subscribers;
    });
  },
};
</script>

<style scoped>
#song-list-music {
  height: 170px;
  background-color: rgb(43, 43, 43);
}
.el-tabs {
  width: 1203px;
  height: 367px;
}
/* 隐藏滚动条 */
.el-tabs::-webkit-scrollbar {
  display: none;
}
#song-list-music >>> .el-tabs__nav {
  margin-top: 20px;
  margin-left: 70px;
}
#song-list-music >>> .el-tabs__item {
  margin-bottom: -10px;
  height: 50px;
  font-size: 16px;
  color: rgb(175, 175, 175);
}
/* 修改鼠标移入tab效果 */
#song-list-music >>> .el-tabs__item:hover {
  height: 50px;
  font-size: 16px;
  font-weight: 400;
  color: rgb(255, 255, 255);
}
/* 底部色块颜色修改 */
#song-list-music >>> .el-tabs__active-bar {
  background: red;
}
/* 点击时颜色改变 */
#song-list-music >>> .el-tabs__item.is-active {
  color: rgb(255, 255, 255);
}
#song-list-music >>> .el-tabs__nav-wrap::after {
  background-color: rgb(43, 43, 43);
}
#song-list-music >>> .el-input--mini .el-input__inner {
  border: none;
}
.active {
  display: none;
}
.item td {
  /* td默认内容撑开，设置为inline-block相当于在外面套了一层div */
  display: inline-block;
  padding-top: 5px;
  padding-bottom: 5px;
  height: 18px;
  color: rgb(238, 236, 226);
  font-weight: 100;
  font-size: 14px;
  overflow: hidden;
}

.item .title {
  text-align: left;
  width: 400px;
  margin-left: 180px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item .singer {
  text-align: left;
  width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item .volumn {
  text-align: left;
  width: 300px;
  height: 30px;
  line-height: 30px;
  text-overflow: ellipsis;
  overflow: hidden;
}

.item tbody tr:nth-of-type(2n + 1) {
  background-color: rgb(46, 46, 46);
}
.item tbody tr:hover {
  background-color: rgb(55, 55, 55);
}
.item .active {
  color: red;
}

.comment {
  color: white;
  display: flex;
  font-weight: 100;
  border-top: 1px solid rgb(52, 52, 52);
  height: 30px;
  line-height: 30px;
  padding-top: 12px;
}
.comment img {
  height: 30px;
  border-radius: 15px;
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
.wrapper{
    display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.subscriber {
  margin-left: 60px;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  width: 400px;
}
.subscriber .subscriberPic img {
  width: 140px;
  height: 140px;
  border-radius: 70px;
}
.subscriber .subscriber-name-signature {
  width: 140px;
  height: 140px;
  color: white;
  font-weight: 100;
  text-align: left;
}
.subscriber .subscriber-name-signature .name {
  height: 70px;
  line-height: 70px;
  margin-left: 10px;
}
.subscriber .subscriber-name-signature .signature {
  height: 70px;
  margin-left: 10px;
}
</style>