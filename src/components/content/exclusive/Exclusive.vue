<template>
  <div class="exclusive">
    <div v-for="(item,index) in exclusive" :key="index" class="exclusiveItem">
      <img :src="item.picUrl" alt="">
      <div>{{item.name}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name:'Exclusive',
  props:{
    exclusive:Array
  }
}
</script>

<style scoped>
  .exclusive{
    display: flex;
    justify-content: space-evenly;
  }
  .exclusiveItem img{
    width: 320px;
    height: 160px;
    border-radius: 10px;
  }
  .exclusiveItem div{
    width: 320px;
    color: white;
    text-align: center;
  }
</style>