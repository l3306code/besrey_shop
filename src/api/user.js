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

//添加一个新用户
export function addUserInfo4(data){
    return request({
        url: '/api/private/v1/users',
        method: 'post',
        data:data
    })
}

//根据用户ID获取数据
export function getUserInfoById(userId){
    return request({
        url:`/api/private/v1/users/${userId}`,
        method: 'get'
    })
}


//编辑用户信息
export function updateUserInfoById(id, userInfo){
    return request({
        url:`/api/private/v1/users/${id}`,
        method:'put',
        data: userInfo
    })
}


//删除用户信息
export function deleteUserById(id){
    return request({
        url:`/api/private/v1/users/${id}`,
        method:'delete'
    })
}

//分配用户角色
export function setRoleByUserIdAndRoleId(userId, roleId){
    return request({
        url:`/api/private/v1/users/${userId}/role`,
        method: 'put',
        data: roleId
    })
}