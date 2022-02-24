// 判断浏览器默认语言 在切换后存入内localStorage
let browserLanguage: any
(function () {
    //@ts-expect-error
    const language = navigator.language || window.navigator.browserLanguage
    if (language) {
        browserLanguage = language.toLowerCase().substr(0, 2)
    }
}())

const getLanguage = () => {
    return localStorage.getItem('langue') || browserLanguage
}

export {
    getLanguage
}