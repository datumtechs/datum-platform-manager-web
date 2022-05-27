export default function useFormatTime(time: number): string {
    if(!time) return '--'
    return new Date(time).toLocaleString()
}