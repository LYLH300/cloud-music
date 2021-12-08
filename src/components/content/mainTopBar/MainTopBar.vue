<template>
  <div class="main-top-bar">
    <top-bar>
      <template slot="top-bar-name">
        <div class="top-bar-name" @click="backToFindMusic">
          <i class="el-icon-headset"></i>
          <span>云音乐</span>
        </div>
      </template>

      <template slot="top-bar-back">
        <div class="top-bar-back">
          <i class="el-icon-arrow-left" @click="routerBack"></i>
          <i class="el-icon-arrow-right" @click="routerForward"></i>
        </div>
      </template>

      <template slot="top-bar-search">
        <div class="top-bar-search">
          <el-input
            class="input"
            v-model="input"
            prefix-icon="el-icon-search"
            placeholder="请输入搜索内容"
            @keyup.native="myInput"
            @focus="onFocus"
            @blur="onBlur"
          ></el-input>
          <button @click="none">收起</button>
          <div class="searchData" ref="searchData" v-show="isShow">
            <div
              v-for="(item, index) in inputData"
              :key="index"
              @click="searchMusic(item.id)"
            >
              {{ item.al.name }}
            </div>
          </div>
        </div>
      </template>

      <template slot="top-bar-login">
        <div class="top-bar-login">
          <img
            :src="
              pic
            "
            alt=""
          />
          <div @click="login">登录</div>
          <div @click="out">退出</div>
        </div>
      </template>
    </top-bar>
  </div>
</template>

<script>
import { getSearch, getMusicUrl, getMusicInfo } from "network/findMusic.js";
import TopBar from "components/common/topBar/TopBar.vue";

export default {
  name: "MainTopBar",
  components: {
    TopBar,
  },
  data() {
    return {
      pic:null,
      isShow: false,
      input: "",
      inputData: null,
      latestMusicUrl: null,
      latestMusicPic: null,
      latestMusicName: null,
      latestMusicSinger: null,
      latestMusicId: null,
    };
  },
  methods: {
    routerBack() {
      this.$router.go(-1);
    },
    routerForward() {
      this.$router.go(1);
    },
    backToFindMusic() {
      this.$router.push("/findmusic");
    },
    search() {
      getSearch(this.input).then((res) => {
        this.inputData = res.result.songs;
        console.log(this.inputData);
      });
    },
    myInput(event) {
      if (event.keyCode == 13) {
        this.search();
        this.$refs.searchData.style.display = "block";
      }
    },

    displayDetail() {
      if (this.input == "") {
        this.$refs.searchData.style.display = "none";
      } else {
        this.$refs.searchData.style.display = "block";
      }
    },

    onFocus() {
      this.$refs.searchData.style.display = "none";
    },
    onBlur() {
      this.$refs.searchData.style.display = "block";
    },
    searchMusic(value) {
      getMusicUrl(value).then((res) => {
        this.latestMusicId = res.data[0].id;
        this.latestMusicUrl = res.data[0].url;
      });
      getMusicInfo(value).then((res) => {
        this.latestMusicPic = res.songs[0].al.picUrl;
        this.latestMusicName = res.songs[0].name;
        this.latestMusicSinger = res.songs[0].ar[0].name;
      });
      this.$bus.$emit("searchMusicClick", {
        url: this.latestMusicUrl,
        pic: this.latestMusicPic,
        name: this.latestMusicName,
        singer: this.latestMusicSinger,
        id: this.latestMusicId,
      });
    },
    none() {
      this.isShow = !this.isShow;
    },
    login() {
      this.pic = window.sessionStorage.getItem('uesrInfo')
      this.$router.push("/login");
      console.log(this.pic);
    },
    out(){
      window.sessionStorage.clear()
    },
   
  },
};
</script>

<style scoped>
.top-bar-name i {
  margin-right: 5%;
}
.input {
  width: 240px;
  height: 60px;
  line-height: 60px;
}
.input >>> .el-input__inner {
  border-radius: 50px;
  height: 40px;
  line-height: 40px;
}
.top-bar-login {
  display: flex;
  justify-content: right;
  position: relative;
}
.top-bar-login .content {
  width: 200px;
  height: 300px;
  position: absolute;
  right: -50px;
  background-color: rgb(33, 33, 36);
  top: 64px;
  z-index: 11;
}
.top-bar-login div {
  margin-right: 10%;
  height: 60px;
  line-height: 60px;
  padding-left: 10px;
}
.top-bar-login img {
  margin-top: 5px;
  height: 50px;
  width: 60px;
  border-radius: 30px;
}
button {
  background-color: rgb(33, 33, 36);
  color: white;
  margin-left: 30px;
  border-radius: 10px;
}

.searchData {
  background-color: rgba(54, 54, 54);
  position: relative;
  z-index: 2;
  width: 240px;
  height: 400px;
  overflow: auto;
}
.searchData::-webkit-scrollbar {
  display: none;
}
</style>