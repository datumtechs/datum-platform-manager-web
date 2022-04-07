import http from '@/api'

export const getOrgList = (data: any): Promise<any> => {
    return http({
        method: 'get',
        url: '/flow/org/getOrgList',
        data
    })
}
