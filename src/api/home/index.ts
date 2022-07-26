import http from '@/api'

// 获得数据凭证使用量排行
export const getDataTokenUsedTop = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/getDataUsedTop',
        params
    })
}

// 获得全网统计数据
export const getGlobalStats = (): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/getGlobalStats',
    })
}

// 获得最新的模型列表
export const getLatestModelList = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/getLatestModelList',
        params
    })
}

// 获得组织算力排行
export const getOrgPowerTop = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/getOrgPowerTop',
        params
    })
}

// 获得15天隐私计算走势
export const getTaskTrend = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/getTaskTrend',
        params
    })
}

// 获得15天隐私计算走势
export const queryNavigation = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/queryNavigation',
        params
    })
}

// 获取最新的任务列表
export const getLatestTaskList = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/home/getLatestTaskList',
        params
    })
}
