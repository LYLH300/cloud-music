import Vue from 'vue'
import Router from 'vue-router'
const FindMusic = () => import('views/findMusic/FindMusic.vue')
const Friends = () => import('views/friends/Friends.vue')
const Live = () => import('views/live/Live.vue')
const PersonalFM = () => import('views/personalFM/PersonalFM.vue')
const Video = () => import('views/video/Video.vue')
const SongListDetail = () => import('components/content/songListDetail/SongListDetail.vue') 
const MusicDetail = () => import('components/content/audio/musicDetail/MusicDetail.vue')
const Login = () => import('components/content/login/Login.vue')


Vue.use(Router)
// 连续点击报错问题
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '',
      redirect: '/findmusic',
    },
    {
      path: '/findmusic',
      component:FindMusic,
      
    },
    {
      path: '/friends',
      component: Friends,
    },
    {
      path: '/live', 
      component: Live,
    },
    {
      path: '/personalFM',
      component: PersonalFM,
    },
    {
      path: '/video',
      component: Video,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/songListDetail/:id',
      component: SongListDetail,
    },
    {
      path: '/musicDetail/:id',
      component: MusicDetail,
    },
  ]
})
