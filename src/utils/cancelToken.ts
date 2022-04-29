import axios from 'axios'
import qs from 'qs'
const pendingMap = new Map()

const ignoreUrl = ['/flow/workflow/getWorkflowStatus', '/flow/sys/getPlatONChainConfig', '/flow/workflow/getLog', '/flow/data/getDataListByOrg']
let ignoreFlag = false

export const removeRequest = (config: any) => {
    const { url, params, data } = config
    ignoreUrl.forEach(item => {
        if (url.indexOf(item) !== -1) ignoreFlag = true
    })
    if (ignoreFlag) {
        ignoreFlag = false
        return
    }
    const dynamicUrl = [url, qs.stringify(params), qs.stringify(data)].join('&')
    if (pendingMap.has(dynamicUrl)) {
        // _delete(url)
        pendingMap.delete(dynamicUrl)
    }
}

export const clearRequest = (config: any) => { // 路由跳转时清掉所有请求 
    if (pendingMap.size === 0) return

    for (const [url, cancel] of pendingMap) {
        cancel(url)
    }
    pendingMap.clear()
}

const _delete = (url: any) => {
    const cancel = pendingMap.get(url)
    cancel(url)
    pendingMap.delete(url)
}

export const addRequest = (config: any) => {
    const { url, params, data } = config
    ignoreUrl.forEach(item => {
        if (url.indexOf(item) !== -1) ignoreFlag = true
    })
    if (ignoreFlag) {
        ignoreFlag = false
        return
    }
    const dynamicUrl = [url, qs.stringify(params), qs.stringify(data)].join('&')
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel: any) => {
        if (pendingMap.has(dynamicUrl)) {
            _delete(dynamicUrl)
        } else {
            pendingMap.set(dynamicUrl, cancel)
        }
    })
}