import i18n from '@/i18n'

export default function useGlobalTaskMap(status: number) {
    switch (status) {
        case 1:
            return i18n.global.t('status.pending')
        case 2:
            return i18n.global.t('status.running')
        case 3:
            return i18n.global.t('status.failed')
        case 4:
            return i18n.global.t('status.succeed')
        default:
            break;
    }
}