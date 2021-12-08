import {request} from './request'

export function getBannerPic (type){
  return request({
    url:'/banner',
    params:{
      type
    }
  })
}

export function getRecSongList(limit){
  return request({
    url:'/personalized',
    params:{
      limit
    }
  })
}

export function getExclusive(limit){
  return request({
    url:'/personalized/privatecontent/list',
    params:{
      limit
    }
  })
}

export function getlatestMusic(limit){
  return request({
    url:'/personalized/newsong',
    params:{
      limit
    }
  })
}

export function getRecMV(){
  return request({
    url:'/personalized/mv',
    // params:{
    //   limit
    // }
  })
}

export function getMusicUrl(id){
  return request({
    url:'/song/url',
    params:{
      id
    }
  })
}

export function getMusicInfo(ids){
  return request({
    url:'/song/detail',
    params:{
      ids
    }
  })
}

export function getMusicLyric(id){
  return request({
    url:'/lyric',
    params:{
      id
    }
  })
}

export function getMusicComment(id,limit){
  return request({
    url:'/comment/music',
    params:{
      id,
      limit
    }
  })
}

export function getSongListTabItem(cat,limit){
  return request({
    url:'/top/playlist/highquality',
    params:{
      cat,
      limit
    }
  })
}

export function getSongListMusic(id){
  return request({
    url:'/playlist/track/all',
    params:{
      id
    }
  })
}

export function getSongListInfo(id){
  return request({
    url:'/playlist/detail',
    params:{
      id
    }
  })
}

export function getSongListComment(id,limit){
  return request({
    url:'/comment/playlist',
    params:{
      id,
      limit
    }
  })
}

export function getSongListSubscriber(id,limit){
  return request({
    url:'/playlist/subscribers',
    params:{
      id,
      limit
    }
  })
}

export function getSearch(keywords){
  return request({
    url:'/cloudsearch',
    params:{
      keywords
    }
  })
}