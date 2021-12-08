import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    musicList:[],
    playing:true,
    musicIndex:[],
    empty:[],
    userInfo:1
  },
  mutations: {
    addMusic(state,payload){
      state.musicList.push(payload)
    },
    addMusicIndex(state,payload){
      state.musicIndex.push(payload)
    },
    changePlaying(state,payload){
      state.playing = payload
    },
    clearAll(state,payload){
      state.musicList = []
    },
    getUserInfo(state,payload){
      state.userInfo = payload
    }
  },
  actions: {

  }
})
