// byte 转换 mb
export const formatBytes = (value: number) => {
  var res = ''
  if (value >= 1073741824) {
    res = Math.round((value / 1024 / 1024 / 1024) * 100) / 100 + ' Gb'
  } else if (value >= 1048576) {
    res = Math.round((value / 1024 / 1024) * 100) / 100 + ' Mb'
  } else if (value >= 1024) {
    res = Math.round((value / 1024) * 100) / 100 + ' Kb'
  } else {
    res = value + ' byte'
  }

  return res
}

export const getSubStr = (
  str: string,
  m = 6,
  n = 4,
  symbol = '...',
  min = 20,
) => {
  if (!str) return ''
  if (str.length <= 20) return str
  var subStr1 = str.substr(0, m)
  var subStr2 = str.substr(str.length - n, n)
  var subStr = subStr1 + symbol + subStr2
  return subStr
}
// 时间格式转化
export const formatDate = (num: number | Date, format: string) => {
  const formateArr = ['Y', 'M', 'D', 'h', 'm', 's']
  const returnArr = []
  const date = new Date(num)
  returnArr.push(date.getFullYear()) // 取得4位数的年份
  returnArr.push(formatNumber(date.getMonth() + 1)) // 取得日期中的月份，其中0表示1月，11表示12月
  returnArr.push(formatNumber(date.getDate())) // 返回日期月份中的天数（1到31）
  returnArr.push(formatNumber(date.getHours())) // 返回日期中的小时数（0到23）
  returnArr.push(formatNumber(date.getMinutes())) // 返回日期中的分钟数（0到59）
  returnArr.push(formatNumber(date.getSeconds())) // 返回日期中的秒数（0到59）

  for (const i in returnArr) {
    // 判断对象是否含有某个非继承属性
    if ({}.hasOwnProperty.call(returnArr, i)) {
      format = format.replace(formateArr[i], returnArr[i]) // 替换
    }
  }
  return format
}
export const formatNumber = (n: any) => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}
// 数组对象排序
export const formatCompareSort = (propertyName: string) => {
  return function(params1: any, params2: any) {
    var value1 = params1[propertyName]
    var value2 = params2[propertyName]
    if (value1 < value2) {
      return -1
    } else if (value1 > value2) {
      return 1
    } else {
      return 0
    }
  }
}

/**
 *AES 加解密
 */
// const DEFAULTKEY = '12345678900000001234567890000000'
// const IV = '1234567890000000'
// export const encrypto = (word: any) => {
//   var str = JSON.stringify(word)
//   var key = CryptoJS.enc.Utf8.parse(DEFAULTKEY)
//   var srcs = CryptoJS.enc.Utf8.parse(str)
//   var iv = CryptoJS.enc.Utf8.parse(IV)
//   var encrypted = CryptoJS.AES.encrypt(srcs, key, {
//     iv,
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   })
//   return encrypted.toString()
// }

// export const decrypto = (str: any) => {
//   var key = CryptoJS.enc.Utf8.parse(DEFAULTKEY)
//   var iv = CryptoJS.enc.Utf8.parse(IV)
//   var decrypt = CryptoJS.AES.decrypt(str, key, {
//     iv,
//     mode: CryptoJS.mode.ECB,
//     padding: CryptoJS.pad.Pkcs7,
//   })
//   return CryptoJS.enc.Utf8.stringify(decrypt).toString()
// }
