export default function useFormatTime(time: number): string {
    return new Date(time).toLocaleString()
}