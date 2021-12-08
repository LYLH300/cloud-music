<template>
  <div class="song-list-tab-item" >
    <div v-for="(item, index) in songListInfo" :key="index">
      <son :item='item'></son>
    </div>
  </div>
</template>

<script>
import { getSongListTabItem } from "network/findMusic.js";
import Son from './son/Son.vue'
export default {
  name: "SongListTabItem",
  data() {
    return {
      songListInfo: null,
    };
  },
  components:{
    Son
  },
  props: {
    cat: String,
  },
  created() {
    getSongListTabItem(this.cat, 100).then((res) => {
       this.songListInfo =  res && res.playlists;
    });
  },
  methods: {
   
  },
};
</script>

<style scoped>
.song-list-tab-item::-webkit-scrollbar {
  display: none;
}
.song-list-tab-item {
  display: flex;
  flex-wrap: wrap;
  margin-left: 10px;
  height: 562px;
  overflow: auto;
}
</style>