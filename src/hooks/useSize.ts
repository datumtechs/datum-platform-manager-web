
import useThousand from './useThousand'

export default function useSize(input: number): string {
    if (!input) return '0B'
    let size = ''
    if (input < 0.1 * 1024) {
        // 小于0.1KB，则转化成B
        size = `${input.toFixed(2)} B`
    } else if (input < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        size = `${(input / 1024).toFixed(2)} KB`
    } else if (input < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        size = `${(input / (1024 * 1024)).toFixed(2)} MB`
    } else {
        // 其他转化成GB
        size = `${(input / (1024 * 1024 * 1024)).toFixed(2)} GB`
    }
    return size
}