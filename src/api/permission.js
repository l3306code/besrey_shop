import request from '@/utils/request'

//获取权限列表(列表形式)
export function getPermissionList(){
    return request({
        url: '/api/private/v1/rights/list',
        method: 'get'
    })
}


//删除用户对应的权限
export function deletePermByRoleId(roleId, permId){
    return request({
        url: `/api/private/v1/roles/${roleId}/rights/${permId}`,
        method:'delete'
    })
}

//获取权限列表(树形结构)
export function getPermissionInfoByTree(){
    return request({
        url: '/api/private/v1/rights/tree',
        method: 'get'
    })
}

//角色授权
export function updatePermissionByRoleId(roleId, data){
     return request({
        url: `/api/private/v1/roles/${roleId}/rights`,
        method: 'post',
        data
    })
}
