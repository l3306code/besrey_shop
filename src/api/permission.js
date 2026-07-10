import request from '@/utils/request'

//获取权限列表
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
