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
    return request({
        url: `/api/private/v1/roles/${id}`,
        method: 'get'
    })
}

//跟进角色信息
export function updateRoleInfo(id, data){
    return request({
        url: `/api/private/v1/roles/${id}`,
        method: 'put',
        data
    })
}

//删除角色信息
export function deleteRoleById(id){
    return request({
        url: `/api/private/v1/roles/${id}`,
        method: 'delete'
    })
}