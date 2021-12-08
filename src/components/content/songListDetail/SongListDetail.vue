<template>
  <div class="song-list-detail">
    <song-list-describe :songListInfo='songListInfo'></song-list-describe>
    <song-list-music :songListId='id'></song-list-music>
  </div>
</template>

<script>
import SongListDescribe from './songListDescribe/SongListDescribe.vue'
import SongListMusic from './songListMusic/SongListMusic'
import { getSongListMusic, getSongListInfo } from "network/findMusic.js";

export default {
  name:'SongListDetail',
  data() {
    return {
      id:null,
      songListMusic:null,
      songListInfo:null
    }
  },
  components:{
    SongListDescribe,
    SongListMusic
  },
  created() {
    this.id = this.$route.params.id
    getSongListMusic(this.id).then((res)=>{
      this.songListMusic = res.songs
    });
    getSongListInfo(this.id).then((res)=>{
      this.songListInfo = res.playlist
    })
  },
}
</script>

<style scoped>
.song-list-detail{
  width:1220px ;
  background-color:rgb(43, 43, 43) ;
  overflow: auto;
}
.song-list-detail::-webkit-scrollbar {
  display: none;
}
</style>>
