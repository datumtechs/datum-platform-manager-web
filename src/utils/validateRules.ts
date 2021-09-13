// 检查字符长度
export const strlen = (str: string) => {
  let len = 0
  for (let i = 0; i < str.length; i++) {
    const c = str.charCodeAt(i)
    //单字节加1
    if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
      len++
    } else {
      len += 2
    }
  }
  return len
}

// 昵称
export const validateNickName = (value: string, callback: any): void => {
  if (value === '' || value === undefined) {
    callback(new Error('昵称不能为空'))
  } else {
    if (strlen(value) > 40) {
      callback(new Error('昵称最大支持20个汉字'))
    }
    callback()
  }
}
