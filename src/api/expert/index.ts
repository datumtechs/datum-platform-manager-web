import http from '@/api'

export const createWorkflowOfExpertMode = (data: {}): Promise<any> => {
    return http({
        method: 'POST',
        url: '/flow/workflow/expert/createWorkflowOfExpertMode',
        data
    })
}

export const getWorkflowStatusOfExpertMode = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/workflow/expert/getWorkflowStatusOfExpertMode',
        params
    })
}

export const saveWorkflowInExpert = (data: any): Promise<any> => {
    return http({
        method: 'POST',
        url: '/flow/workflow/expert/settingWorkflowOfExpertMode',
        data
    })
}

// 专家模式下查询工作流设置 /flow/workflow/expert/getWorkflowSettingOfExpertMode
export const getWorkflowSettingOfExpertMode = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/workflow/expert/getWorkflowSettingOfExpertMode',
        params
    })
}

// 查询组织方
export const queryBaseOrgList = (params: any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/org/getBaseOrgList',
        params
    })
}

// 获取算力 /flow/org/getPowerOrgList
export const getPowerOrgList = (): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/org/getPowerOrgList',
    })
}