import {request} from './request'

export function cellPhone(phone,password){
  return request({
    url:'/login/cellphone',
    params:{
      phone,
      password
    }
  })
}