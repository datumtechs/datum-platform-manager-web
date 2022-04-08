export default function useTableIndex(index: number, current: number, size: number): number {
    return (current - 1) * size + index + 1
}