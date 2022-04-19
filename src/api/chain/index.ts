import http from '@/api'

export const queryCurrentChainInfo = (): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/sys/getPlatONChainConfig',
    })
}

