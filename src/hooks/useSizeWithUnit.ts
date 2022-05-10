
import useThousand from './useThousand'

export default function useSizeWithUnit(input: number) {
    let value = '', unit = 'B'
    if (!input) return {
        value, unit
    }
    if (input < 0.1 * 1024) {
        // 小于0.1KB，则转化成B
        value = `${input.toFixed(2)}`
        unit = 'B'
    } else if (input < 0.1 * 1024 * 1024) {
        // 小于0.1MB，则转化成KB
        value = `${(input / 1024).toFixed(2)}`
        unit = 'KB'
    } else if (input < 0.1 * 1024 * 1024 * 1024) {
        // 小于0.1GB，则转化成MB
        value = `${(input / (1024 * 1024)).toFixed(2)}`
        unit = 'MB'
    } else {
        // 其他转化成GB
        value = `${(input / (1024 * 1024 * 1024)).toFixed(2)}`
        unit = 'GB'
    }
    return { value, unit }
}