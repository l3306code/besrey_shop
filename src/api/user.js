import request from '@/utils/request'

//登录 
export function getMenuData(){
    return request({
        url: '/api/private/v1/menus',
        method: 'get',
    })
}


//获取用户信息
export function getUserData(params){
    return request({
        url:'/api/private/v1/users',
        method: 'get',
        params: params
    })
}

//更新用户状态
export function updateUserState(id, state){
    return request({
        url:`/api/private/v1/users/${id}/state/${state}`,
        method: 'put'
    })
}