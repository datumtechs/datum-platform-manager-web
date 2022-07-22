export default function useFormatTime(time: number): string {
    if (!time) return '--'
    if (typeof time !== 'number') return ''
    return new Date(time).toLocaleString()
}