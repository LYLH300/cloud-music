import axios from 'axios'

export function request(config){
  const instance = axios.create({
    baseURL:'/api',
    timeout:'2000'
  })
  instance.interceptors.request.use((config)=>{
    return config
  },(err)=>{

  })
  instance.interceptors.response.use((config)=>{
    return config.data
  },(err)=>{

  })
  return instance(config)
}