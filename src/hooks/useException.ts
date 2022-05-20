import { ElNotification } from 'element-plus'
import i18n from '@/i18n'
import { EXCEPTION_MAP } from '@/config/constants'



const useException = (exception: string | number): void => {
    let text = ''
    if (!exception) return
    if (!EXCEPTION_MAP.includes(exception.toString())) {
        text = 'unknown'
    } else {
        text = exception.toString()
    }
    ElNotification({
        title: i18n.global.t('exception.error'),
        dangerouslyUseHTMLString: true,
        message: `
                <div>
                    <p>${i18n.global.t(`exception.${text}`)}
                    </p>
                </div>
            `,
        duration: 5000,
        type: "error"
    })

}

export default useException