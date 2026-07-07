import request from '@/utils/request'

//登录 
export function getMenuData(){
    return request({
        url: '/api/private/v1/menus',
        method: 'get',
    })
}