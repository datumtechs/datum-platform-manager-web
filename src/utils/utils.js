export const changeSizeObj = (input, type) => {
  let value = 0
  let unit = 'B'
  if (!input) {
    return { value, unit }
  }
  if (input < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    value = `${input.toFixed(2)}`
    unit = 'B'
  } else if (input < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    value = `${(input / 1024).toFixed(2)}`
    unit = 'KB'
  } else if (input < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    value = `${(input / (1024 * 1024)).toFixed(2)}`
    unit = 'MB'
  } else {
    // 其他转化成GB
    value = `${(input / (1024 * 1024 * 1024)).toFixed(2)}`
    unit = 'GB'
  }
  return { value, unit }
}

export const changeSizeFn = input => {
  if (!input) return '0B'
  let size = ''
  if (input < 0.1 * 1024) {
    // 小于0.1KB，则转化成B
    size = `${input.toFixed(2)}B`
  } else if (input < 0.1 * 1024 * 1024) {
    // 小于0.1MB，则转化成KB
    size = `${(input / 1024).toFixed(2)}KB`
  } else if (input < 0.1 * 1024 * 1024 * 1024) {
    // 小于0.1GB，则转化成MB
    size = `${(input / (1024 * 1024)).toFixed(2)}MB`
  } else {
    // 其他转化成GB
    size = `${(input / (1024 * 1024 * 1024)).toFixed(2)}GB`
  }

  return size
}

// 用时计算
const _isZero = time => {
  if (time.toString().length < 2) {
    return `0${time}`
  }
  return time
}

export const formatDuring = time => {
  const hours = parseInt(`${time / (1000 * 60 * 60)}`, 10)
  const minutes = parseInt(`${(time % (1000 * 60 * 60)) / (1000 * 60)}`, 10)
  const seconds = parseInt(`${(time % (1000 * 60)) / 1000}`, 10)
  return `${_isZero(hours)}:${_isZero(minutes)}:${_isZero(seconds)}`
}

// 千分位符
export const formatNumber = num => {
  if (isNaN(num)) {
    return 0
  }

  return ('' + num).replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')
}
