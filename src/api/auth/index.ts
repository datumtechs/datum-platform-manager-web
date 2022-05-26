import http from '@/api'

export const getUserDatumNetworkLatInfo = (): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/data/getUserDatumNetworkLatInfo',
    })
}
