<template>
  <div id="tabs">
    <el-tabs class="el-tabs" v-model="activeName"  @tab-click="handleClick">
      <el-tab-pane label="个性推荐" name="first" class="personRec">
        <person-rec @toSongList="toSongList"></person-rec>
      </el-tab-pane>
      <el-tab-pane label="专属定制" name="second">
      </el-tab-pane>
      <el-tab-pane label="歌单" name="third">
        <song-list></song-list>
      </el-tab-pane>
      <el-tab-pane label="排行榜" name="fourth"> </el-tab-pane>
      <el-tab-pane label="歌手" name="fifith"> </el-tab-pane>
      <el-tab-pane label="最新音乐" name="sixth"> </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import PersonRec from "./personRec/PersonRec.vue";
import SongList from "./songList/SongList"

export default {
  name: "Tabs",
  components: {
    PersonRec,
    SongList
  },
  data() {
    return {
      activeName: "first",
    };
  },
  methods: {
     handleClick(tab, event) {
        console.log(tab, event);
      },
    // 点击推荐歌单跳转到歌单
    toSongList() {
      this.activeName = "third";
    },
  },
};
</script>

<style scoped>
#tabs {
  height: 670px;
  background-color: rgb(43, 43, 43);
}
.el-tabs {
  width: 1220px;
}
.personRec {
  height: 616px;
  overflow: auto;
}
/* 隐藏滚动条 */
.personRec::-webkit-scrollbar {
  display: none;
}
#tabs >>> .el-tabs__nav {
  margin-left: 330px ;
}
#tabs >>> .el-tabs__item {
  margin-bottom: -10px;
  height: 50px;
  font-size: 16px;
  color: rgb(175, 175, 175);
}
/* 修改鼠标移入tab效果 */
#tabs >>> .el-tabs__item:hover {
  height: 50px;
  font-size: 16px;
  font-weight: 400;
  color: rgb(255, 255, 255);
}
/* 底部色块颜色修改 */
#tabs >>> .el-tabs__active-bar {
  background: red;
}
/* 点击时颜色改变 */
#tabs >>> .el-tabs__item.is-active {
  color: rgb(255, 255, 255);
}
#tabs >>> .el-tabs__nav-wrap::after {
  background-color: rgb(43, 43, 43);
}
#tabs >>> .el-input--mini .el-input__inner {
  border: none;
}
.active {
  display: none;
}
</style>