export default function useAddressDisplay(address: string) {
    if (!address) return ''
    if (!address.startsWith('0x')) return address
    return address.substring(0, 4) + '...' + address.substring(address.length - 6)
}