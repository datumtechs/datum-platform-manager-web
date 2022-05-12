
export const waves = {
  bind(el:any, binding:any) {
    el.addEventListener('click', (e:any) => {
      const customOpts = Object.assign({}, binding.value)
      const opts = Object.assign({
        ele: el, // 波纹作用元素
        type: 'hit', // hit 点击位置扩散 center中心点扩展
        color: 'rgba(255,255,255,0.3)' // 波纹颜色
      }, customOpts)
      const target: HTMLElement = opts.ele
      if (target) {
        target.style.position = 'relative'
        target.style.overflow = 'hidden'
        // 返回的结果是包含完整元素的最小矩形，并且拥有left, top, right, bottom, x, y, width, 和 height
        const rect = target.getBoundingClientRect()
        // console.log('rect: ', rect);
        let ripple = target.querySelector('.waves-ripple') as HTMLElement
        if (!ripple) {
          ripple = document.createElement('span')
          ripple.className = 'waves-ripple'
          ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + 'px'
          target.appendChild(ripple)
        } else {
          ripple.className = 'waves-ripple'
        }
        switch (opts.type) {
          case 'center':
            ripple.style.top = rect.height / 2 - ripple.offsetHeight / 2 + 'px'
            ripple.style.left = rect.width / 2 - ripple.offsetWidth / 2 + 'px'
            break
          default:
            ripple.style.top =
              (e.pageY - rect.top - ripple.offsetHeight / 2 - document.documentElement.scrollTop ||
                document.body.scrollTop) + 'px'
            ripple.style.left =
              (e.pageX - rect.left - ripple.offsetWidth / 2 - document.documentElement.scrollLeft ||
                document.body.scrollLeft) + 'px'
        }
        ripple.style.backgroundColor = opts.color
        ripple.className = 'waves-ripple z-active'
        return false
      }
    }, false)
  }
}