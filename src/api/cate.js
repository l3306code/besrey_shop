import request from '@/utils/request'

export function getCateList(params){
    return request({
        url: '/api/private/v1/categories',
        method:'get',
        params
    })
}


export function addCateInfo(data){
    return request({
        url: '/api/private/v1/categories',
        method: 'post',
        data
    })
}

export function getCateInfoById(id){
    return request({
        url: `/api/private/v1/categories/${id}`,
        method: 'get'
    })
}

//编辑分类信息
export function updateCateInfoById(id, data){
    return request({
        url:`/api/private/v1/categories/${id}`,
        method: 'put',
        data
    })
}

//删除分类信息
export function removeCateInfoById(id){
    return request({
        url:`/api/private/v1/categories/${id}`,
        method: 'delete'
    })
}