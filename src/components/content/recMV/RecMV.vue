<template>
  <div class="rec-mv">
    <div v-for="(item, index) in recMV" :key="index" class="mvItem">
      <div class="playCount">
        <i class="el-icon-caret-right"></i>{{ item.playCount }}
      </div>
      <img :src="item.picUrl" alt="" />
      <div class="name">{{ item.artists[0].name }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecMV",
  props: {
    recMV: Array,
  },
};
</script>

<style scoped>
.rec-mv {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
.mvItem {
  width: 500px;
  margin-left: 100px;
  margin-bottom: 50px;
}
img {
  width: 400px;
  height: 250px;
}
.playCount {
  position: relative;
  margin-left: 340px;
  margin-bottom: -20px;
  color: white;
  text-align:justify;
}
.name{
  margin-left: 170px;
  color: white;
}
</style>