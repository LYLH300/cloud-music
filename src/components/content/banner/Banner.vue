<template>
  <div class="banner">
    <el-carousel :interval="4000" type="card" height="250px" class="el-banner">
      <el-carousel-item v-for="(item, index) in pic" :key="index">
        <img :src="item.imageUrl" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "Banner",
  props:{
    pic:Array
  },
};
</script>

<style scoped>
.banner >>> .el-carousel__item{
  border-radius:20px;
}
.banner >>> .el-carousel__button {
  height: 6px;
  width: 6px;
  border-radius: 3px;
  background-color: red;
}
img{
  height: 250px;
  width: 500px;
}
</style>