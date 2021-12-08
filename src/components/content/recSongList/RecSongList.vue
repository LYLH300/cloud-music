<template>
  <div class="song-list">
    <div v-for="(item, index) in recSongList" :key="index">
      <son :item='item'></son>
      <!-- <div class="listCount">
        <i class="el-icon-caret-right"></i>
        {{ item.playCount }}
      </div>
      <img :src="item.picUrl" alt="" />
      <div class="listDescribe">
        {{ item.name }}
      </div> -->
    </div>
  </div>
</template>

<script>
import Son from '../../../views/findMusic/childComponents/tabs/songList/songListTab/songListTabItem/son/Son.vue'
export default {
  name: "RecSongList",
  components:{
    Son
  },
  props: {
    recSongList: Array,
  },
};
</script>

<style scoped>
.song-list {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
}

</style>