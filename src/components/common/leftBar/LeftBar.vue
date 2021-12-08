<template>
  <div class="left-bar">
    <div class="left-bar-item">
      <div><slot name="recommend"></slot></div>
      <div><slot name="myMusic"></slot></div>
      <div><slot name="createPlaylist"></slot></div>
    </div>
  </div>
</template>

<script>
export default {
  name:'LeftBar'
}
</script>

<style scoped>
  .left-bar{
    width: 270px;
    height: 670px;
    background-color:rgb(43, 43, 43);
    color:white;
    border-right: 2px red solid;
  }
</style>