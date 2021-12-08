<template>
  <div class="song-list">
    <song-list-tab></song-list-tab>
  </div>
</template>

<script>
import SongListTab from './songListTab/SongListTab.vue'
export default {
  name:'SongList',
  components:{
    SongListTab
  }
}
</script>

<style scoped>
 
</style>