export default function useFormatTime(time: number): string | void {
    return new Date(time).toLocaleString()
}