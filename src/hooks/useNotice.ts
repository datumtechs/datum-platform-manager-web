import { ElNotification } from 'element-plus'
import i18n from '@/i18n'
import type { BuildPropType } from 'element-plus/es/utils'

//success/warning/info/error
export default function useNotice(
    type: BuildPropType<StringConstructor, "" | "success" | "warning" | "info" | "error", unknown> | undefined,
    content: string = '',
    urlPrefix: string = '',
    txHash: string = ''
) {
    if (type === 'success') {
        ElNotification({
            title: i18n.global.t('auth.transactionReceipt'),
            dangerouslyUseHTMLString: true,
            message: `
                <div class="leading-22px">
                    <p>${content}</p>
                </div>
                <div class="leading-22px mt-4px">
                    <a target="_blank" href="${urlPrefix}trade-detail?txHash=${txHash}"
                     class="text-color-[#0052D9]">${i18n.global.t('common.viewOnScan')}</a>
                </div>
            `,
            duration: 5000,
            type
        })
    } else if (type === 'error') {
        ElNotification({
            title: i18n.global.t('auth.transactionReject'),
            dangerouslyUseHTMLString: true,
            message: `
                <div>
                    <p>${content}
                    </p>
                </div>
            `,
            duration: 5000,
            type
        })
    }
}