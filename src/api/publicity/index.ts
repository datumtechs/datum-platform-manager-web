
import http from '@/api'

//获得已认证组织列表
export const getOrgVcList = (data: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/publicity/getOrgVcList',
        params: data
    })
}
//获得提案列表
export const getProposalList = (data: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/publicity/getProposalList',
        params: data
    })
}
//获得委员会列表
export const getAuthorityList = (data: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/publicity/getAuthorityList',
        params: data
    })
}

