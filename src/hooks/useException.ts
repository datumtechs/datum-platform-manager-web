import { ElNotification } from 'element-plus'
import i18n from '@/i18n'

const useException = (exception: string | number): void => {
    if (!exception) return
    ElNotification({
        title: i18n.global.t('exception.error'),
        dangerouslyUseHTMLString: true,
        message: `
            <div>
                <p>${i18n.global.t(`exception.${exception}`)}
                </p>
            </div>
        `,
        duration: 5000,
        type: "error"
    })
}

export default useException