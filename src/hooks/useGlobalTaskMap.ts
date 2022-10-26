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

export function useWorkflowDetailsMap(status: number) {
    switch (status) {
        case 0:
            return i18n.global.t('status.pending')
        case 1:
            return i18n.global.t('status.running')
        case 2:
            return i18n.global.t('status.succeed')
        case 3:
            return i18n.global.t('status.failed')
        default:
            break;
    }
}

export function useWorkflowSubtasksMap(status: number) {
    switch (status) {
        case 0:
        case 1:
        case 2:
        case 3:
            return useWorkflowDetailsMap(status)
        case 4:
            return i18n.global.t('status.aborted')
        default:
            break;
    }
}