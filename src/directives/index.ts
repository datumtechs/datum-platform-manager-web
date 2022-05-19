import { createApp, h } from 'vue'
import Dom from './TooltipEllipsis.vue'

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


export const tableTooltip = {
  updated(el:any, ) {
    if (el.querySelectorAll) {
      const label:any[] = el.querySelector('.el-table__body-wrapper').querySelectorAll('.show-ellipsis-tooltip')
      label.forEach(v => {
        const childNode = v.childNodes[0]
        if (childNode?.children?.length) {//子节点只查询1级
          const nodeChildNode: any[] = [...childNode.children]
          nodeChildNode.forEach((v: any) => {
            const text = childNode.innerText
            const app: any = createAppVnode(v, text)
            if(v.querySelector('.tooltip-ellipsis-content')) return
            if(v)app.mount(v)
          })
        } else {
          if(v.querySelector('.tooltip-ellipsis-content')) return
          const text = childNode?.innerText
          const app: any = createAppVnode(childNode, text)
          app.mount(childNode)
        }
      })
      //更新思路直接获取  el-tooltip 标签 缺陷导致重复
    }
  }
}

const createAppVnode = (e: any,text:string): any => {
  const dom = createApp(h(Dom, {text}, {}))
  return dom
}