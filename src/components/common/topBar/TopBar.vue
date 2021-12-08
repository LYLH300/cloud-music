<template>
  <div class="top-bar">
    <el-row >
      <el-col :span="4"><div class="top-bar-name"><slot name="top-bar-name"></slot></div></el-col>
      <el-col :span="2"><div class="top-bar-back"><slot name="top-bar-back"></slot></div></el-col>
      <el-col :span="10"><div class="top-bar-search"><slot name="top-bar-search"></slot></div></el-col>
      <el-col :span="8"><div class="top-bar-login"><slot name="top-bar-login"></slot></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "TopBar",
};
</script>

<style scoped>
.top-bar {
  width: 100%;
  height: 60px;
  background-color: rgb(33, 33, 36);
  border-bottom: 2px solid red;
  color: white;
}
.top-bar-name{
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.top-bar-back{
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.top-bar-search{
  height: 60px;
}
.top-bar-login{
  height: 60px;
}
</style>