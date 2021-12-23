import {
  getEncryptToBase64 as encrypt,
  getDecryptByBase64 as decrypt,
} from './encryption'
const encodeReserveRE = /[!'()*]/g
const encodeReserveReplacer = (c: any) => '%' + c.charCodeAt(0).toString(16)
const commaRE = /%2C/g

const encode = (str: string) =>
  encodeURIComponent(str)
    .replace(encodeReserveRE, encodeReserveReplacer)
    .replace(commaRE, ',')

const decode = decodeURIComponent

/**
 * 判断字符串是否是base64
 * @param { string } str
 * @returns { boolean }
 */
function isBase64(str: string) {
  if (str === '' || str.trim() === '') {
    return false
  }
  try {
    return btoa(atob(str)) == str
  } catch (err) {
    return false
  }
}

/**
 * 序列化对象 并加密
 * @param {Object} obj
 */
export const stringifyQuery = (obj: any) => {
  const res: any = obj
    ? Object.keys(obj)
        .map((key) => {
          const val = obj[key]

          if (val === undefined) {
            return ''
          }

          if (val === null) {
            return encode(key)
          }

          if (Array.isArray(val)) {
            const result: any = []
            val.forEach((val2) => {
              if (val2 === undefined) {
                return
              }
              if (val2 === null) {
                result.push(encode(key))
              } else {
                result.push(encode(key) + '=' + encode(val2))
              }
            })
            return result.join('&')
          }

          return encode(key) + '=' + encode(val)
        })
        .filter((x) => x.length > 0)
        .join('&')
    : null
  return res ? `?${encrypt(res)}` : ''
}

/**
 * 解密  反序列化字符串参数
 * @param {String}} query
 */
export const parseQuery = (query: any) => {
  const res: any = {}

  query = query.trim().replace(/^(\?|#|&)/, '')

  if (!query) {
    return res
  }

  // 解密
  query = isBase64(query) ? decrypt(query) : query

  query.split('&').forEach((param: any) => {
    const parts = param.replace(/\+/g, ' ').split('=')
    const key = decode(parts.shift())
    const val = parts.length > 0 ? decode(parts.join('=')) : null

    if (res[key] === undefined) {
      res[key] = val
    } else if (Array.isArray(res[key])) {
      res[key].push(val)
    } else {
      res[key] = [res[key], val]
    }
  })

  return res
}
