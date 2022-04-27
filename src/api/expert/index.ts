import http from '@/api'

export const createWorkflowOfExpertMode = (data: {}): Promise<any> => {
    return http({
        method: 'POST',
        url: '/flow/workflow/expert/createWorkflowOfExpertMode',
        data
    })
}

export const getWorkflowStatusOfExpertMode = (params:any): Promise<any> => {
    return http({
        method: 'GET',
        url: '/flow/workflow/expert/getWorkflowStatusOfExpertMode',
        params
    })
}