import http from '@/api'

export const getUserMetisLatInfo = (): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/data/getUserMetisLatInfo',
    })
}
