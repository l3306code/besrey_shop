import request from '@/utils/request'

//获取角色列表
export function getAllRolesData(){
    return request({
        url: '/api/private/v1/roles',
        method: 'get'
    })
}

//添加角色
export function addRole4(data){
    return request({
            url: '/api/private/v1/roles',
            method: 'post',
            data
        })
}

//根据id获取角色信息
export function getRoleInfoById(id){
    
}