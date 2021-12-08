<template>
  <div id="song-list-tab">
    <el-tabs class="el-tabs" v-model="activeName" @tab-click="handleClick">
      <!-- 可以直接在el-tab-pane中遍历 -->
      <el-tab-pane
        :label="label[index]"
        :name="name[index]"
        v-for="(item, index) in label"
        :key="index"
      >
     <song-list-tab-item :cat='item'></song-list-tab-item>
      </el-tab-pane>
    </el-tabs>
    
  </div>
</template>

<script>
import SongListTabItem from "./songListTabItem/SongListTabItem.vue";
export default {
  name: "SongListTab",
  data() {
    return {
      activeName: "first",
      label: [
        "华语",
        "流行",
        "摇滚",
        "民谣",
        "电子",
        "另类/独立",
        "轻音乐",
        "综艺",
        "影视原声",
        "ACG",
      ],
      name: [
        "first",
        "second",
        "third",
        "fourth",
        "fifth",
        "sixth",
        "seventh",
        "eighth",
        "ninth",
        "tenth",
      ],
    };
  },
  components: {
    SongListTabItem,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
};
</script>

<style scoped>
.song-list-tab {
  height: 610px;
  background-color: rgb(43, 43, 43);
}
.el-tabs {
  width: 1203px;
}
.chineseMusic {
  height: 616px;
  overflow: auto;
}
/* 隐藏滚动条 */
.personRec::-webkit-scrollbar {
  display: none;
}
/* 注意添加.el-tab单独控制样式 */
#song-list-tab >>> .el-tabs .el-tabs__nav {
  margin-left: 220px;
}
#song-list-tab >>> .el-tabs .el-tabs__item {
  margin-bottom: -10px;
  height: 50px;
  font-size: 16px;
  color: rgb(175, 175, 175);
}
/* 修改鼠标移入tab效果 */
#song-list-tab >>> .el-tabs .el-tabs__item:hover {
  height: 50px;
  font-size: 16px;
  font-weight: 400;
  color: rgb(255, 255, 255);
}
/* 底部色块颜色修改 */
#song-list-tab >>> .el-tabs .el-tabs__active-bar {
  width: 32px;
  background: red;
}
/* 点击时颜色改变 */
#song-list-tab >>> .el-tabs .el-tabs__item.is-active {
  color: rgb(255, 255, 255);
}
#song-list-tab >>> .el-tabs .el-tabs__nav-wrap::after {
  background-color: rgb(43, 43, 43);
}
#song-list-tab >>> .el-tabs .el-input--mini .el-input__inner {
  border: none;
}
.active {
  display: none;
}
</style>