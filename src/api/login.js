import request from '@/utils/request'

//登录 
export function doLogin(data){
    return request({
        url: '/api/private/v1/login',
        method: 'post',
        data
    })
}