<template>
  <div id="app">
    <main-top-bar></main-top-bar>
    <div>
      <div class="mid">
        <main-left-bar></main-left-bar>
        <keep-alive exclude="SongListDetail,MusicDetail">
          <router-view ></router-view>
        </keep-alive>
      </div>
    </div>
    <vue-audio></vue-audio>
  </div>
</template>

<script>
import MainTopBar from "components/content/mainTopBar/MainTopBar.vue";
import MainLeftBar from "components/content/mainLeftBar/MainLeftBar.vue";
import VueAudio from "components/content/audio/VueAudio.vue";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    VueAudio,
    MainTopBar,
    MainLeftBar,
  },
  created() {},
};
</script>

<style scoped>
.mid {
  display: flex;
}
@import "./assets/css/normalize.css";
</style>
