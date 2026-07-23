import request from '@/utils/request'


//根据id获取参数列表
export function getParamsListById(id, params){
    return request({
        url: `/api/private/v1/categories/${id}/attributes`,
        method: 'get',
        params
    })
}