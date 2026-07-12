import request from '@/utils/request'

export function getCateList(params){
    return request({
        url: '/api/private/v1/categories',
        method:'get',
        params:params
    })
}