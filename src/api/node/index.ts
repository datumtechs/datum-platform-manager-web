import http from '@/api'

export const getOrgList = (params: any): Promise<any> => {
    return http({
        method: 'get',
        url: '/flow/org/getOrgList',
        params
    })
}


export const queryOrgDetail = (params: any): Promise<any> => {
    return http({
        method: 'get',
        url: '/flow/org/getOrgDetails',
        params
    })
}