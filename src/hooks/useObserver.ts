import { useIntersectionObserver } from '@vueuse/core'

const useObserver = (callback: any) => {
    const target = ref()
    const result = ref([])
    const { stop } = useIntersectionObserver(target, ([{ isIntersecting }]) => {
        // 如果target对应的DOM进入可视区，那么该回调函数就触发
        if (isIntersecting) {
            // 被监听的DOM进入了可视区:此时调用接口获取数据；停止继续监听
            stop()
            callback()
        }
    })
    return { result, target }
}

export default useObserver