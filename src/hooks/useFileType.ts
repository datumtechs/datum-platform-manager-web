import i18n from '@/i18n'

export default function useFileType(status: number) {
    switch (status) {
        case 1:
            return 'CSV'
        default:
            break;
    }
}