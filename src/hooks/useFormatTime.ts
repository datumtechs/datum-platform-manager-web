export default function useFormatTime(time: number): string | void {
    if (time) {
        return new Date(time).toLocaleString()
    }
    throw new Error('plz input time')
}