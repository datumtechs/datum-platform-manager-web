/**
 * 函数节流
 * @param fn
 * @param interval
 * @returns {Function}
 * @constructor
 */
export function _throttle(fn: any, time = 400) {
  let last: any = null
  let timer: any = null
  const interval = time
  return () => {
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        // fn.apply(that, args)
        fn(args)
      }, interval)
    } else {
      last = now
      // fn.apply(that, args)
      fn(args)
    }
  }
}
/**
 * 函数防抖
 * @param fn
 * @param wait
 * @returns {Function}
 * @constructor
 */
export function _debounce(fn: any, wait = 400) {
  let timer: any = null
  return () => {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn(args)
    }, wait)
  }
}
