//百度坐标转高德（传入经度、纬度）
export const bdDecrypt = (bd_lng: any, bd_lat: any) => {
  let X_PI = (Math.PI * 3000.0) / 180.0
  let x = bd_lng - 0.0065
  let y = bd_lat - 0.006
  let z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * X_PI)
  let theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * X_PI)
  let gg_lng = z * Math.cos(theta)
  let gg_lat = z * Math.sin(theta)
  return {
    lng: gg_lng,
    lat: gg_lat,
  }
}

export const getSubStr = (str: string, m = 6, n = 4, symbol = '...') => {
  if (!str) return ''
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
// 正则匹配 1~99 正整数
export const vailLnteger99 = (data: any) => {
  const reg = new RegExp(/^[1-9][0-9]?$/)
  return reg.test(data)
}
// 正则匹配 1~100 正整数正整数
export const vailLnteger100 = (data: any) => {
  const reg = new RegExp(/^([1-9][0-9]{0,1}|100)$/)
  return reg.test(data)
}

// 正则匹配 1~1000 正整数
export const vailLnteger1000 = (data: any) => {
  const reg = new RegExp(/^(\+?[1-9]{1}[0-9]{0,2}\d{0,0}|1000)$/)
  return reg.test(data)
}
// 正则匹配 0.1~99.9 保留一位小数
export const vailDecimal = (data: any) => {
  if (data === 0) {
    return false
  } else {
    const reg = new RegExp(/^([0-9]|[1-9][0-9])(\.\d{0,1})?$/)
    return reg.test(data)
  }
}
