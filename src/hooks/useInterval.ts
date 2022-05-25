
import { onBeforeUnmount, onMounted } from 'vue'

const useInterval = (fn: Function, delay: number = 1000) => {
    let timer: any;
    onMounted(() => {
        process()
    })
    const process = () => {
        if (timer) clearTimeout(timer)
        timer = setTimeout(async () => {
            await fn()
            process()
        }, delay)
    }
    onBeforeUnmount(() => {
        clearTimeout(timer)
    })
}


export default useInterval