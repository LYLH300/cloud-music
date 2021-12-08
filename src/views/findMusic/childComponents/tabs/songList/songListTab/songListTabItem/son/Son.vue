<template>
  <div class="son" >
    <div class="listCount" >
        <i class="el-icon-caret-right"></i>
        {{ item.playCount }}
      </div>
      <img :src="item.coverImgUrl || item.picUrl" alt=""  @click="itemClick(item.id)"/>
      <div class="listDescribe">
        {{ item.name }}
      </div>
  </div>
</template>

<script>
import {getSongListMusic} from 'network/findMusic.js'
export default {
  name:'Son',
  props:{
    item:Object
  },
  methods: {
     itemClick(id) {  
      this.$router.push(
        '/songListDetail/' + id
      );
      getSongListMusic(id).then((res)=>{
        
        for(let i of res.songs){  
          console.log(i);
          this.$store.commit('addMusic',i)
        }
        console.log(this.$store.state.musicList);
      })
    },
  },
  
}
</script>

<style scoped>
  
img {
  width: 200px;
  height: 200px;
  margin-left: 30px;
  border-radius: 10px;
}
.listDescribe {
  width: 200px;
  margin-left: 30px;
  color: white;
  text-align: center;
  margin-bottom: 20px;
}
.listCount {
  position: relative;
  color: white;
  font-size: 14px;
  text-align: right;
  margin-left: 30px;
  width: 200px;
  margin-bottom: -15px;
  background-color: rgba(100, 100, 100, 0.5);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
}
</style>