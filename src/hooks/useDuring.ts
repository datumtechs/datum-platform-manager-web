import i18n from '@/i18n'
const useDuring = (time: number) => {
    let hours = parseInt(`${time / (1000 * 60 * 60)}`, 10)
    const minutes = parseInt(`${(time % (1000 * 60 * 60)) / (1000 * 60)}`, 10)
    const seconds = parseInt(`${(time % (1000 * 60)) / 1000}`, 10)
    const day = parseInt(`${hours / 24}`, 10)
    if (day) {
        hours = parseInt(`${+hours % 24}`, 10)
        return `${day}${i18n.global.t('common.day')} ${_isZero(hours)}:${_isZero(minutes)}:${_isZero(seconds)}`
    }
    return `${_isZero(hours)}:${_isZero(minutes)}:${_isZero(seconds)}`
}

const _isZero = (time: number) => {
    if (time.toString().length < 2) {
        return `0${time}`
    }
    return time
}

export default useDuring