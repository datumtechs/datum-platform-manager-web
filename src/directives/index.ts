// import { createApp, h } from 'vue'

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
  updated(el: any, binding: any) {
    if (el.querySelectorAll) {
      const label: any[] = el.querySelector('.el-table__body-wrapper').querySelectorAll('.show-ellipsis-tooltip')
      const nodeChildNode:any[] = []
      label.forEach(v => {
        nodeChildNode.push([...v.querySelectorAll('.cell')])
      })
      cleanDom()
      nodeChildNode.flat().forEach((v: any) => {
        if (v?.children?.length) {
          const dom = document.createElement('div')
          dom.classList.add('tooltip-ellipsis-content')
          const list: any = [...v?.children]
          list.forEach((item: any) => {
            dom.appendChild(item)            
          })
          dom.ondblclick = copy
          v.appendChild(dom) 
        } else {
          const text = v.innerText
          v.classList.add('tooltip-ellipsis-content')
          v.ondblclick = copy
          if (v.scrollWidth > v.offsetWidth) {
            createTips(v,text)            
          }
        }
      })
      // 更新思路直接获取 el-tooltip 标签 缺陷导致重复
    }
  }
}


const createTips = (el: any, text: string) => {
  let flag: boolean = false
  let timer: any = ''
  let newShowTimer:any
  el.onmouseover = function (e: any) {
    if(newShowTimer) clearTimeout(newShowTimer)
    newShowTimer = setTimeout(() => {
      show()      
    },15)
  }
  

  el.onmouseleave = function (e: any) {
    flag = false
    clean()
  }
  
  function _popperOnmouseenter() {
    flag = true
    clean()
  }

  function _popperOnmouseleave() { 
    flag = false
    clean()
  }


  function show() {
    flag = false
      flag = true
      const dom = document.createElement('div')
      const dom2 = document.createElement('div')
      dom.classList.add('_popper-warp')
      dom2.classList.add('_popper')
      dom2.innerHTML = text
      document.body.append(dom)
      dom.append(dom2) 
      let  greater  = 0
      if (dom.clientWidth > el.clientWidth) {
        greater =  dom.clientWidth - el.clientWidth
       }
      dom.style.left = el.getBoundingClientRect().left - (greater/2) +'px'
      dom.style.top = el.getBoundingClientRect().top - 38 + 'px'
      dom.onmouseover = _popperOnmouseenter
      dom.onmouseleave = _popperOnmouseleave
  }

  function clean() {
    if(timer) clearTimeout(timer)
    timer = setTimeout(() => {
      if (!flag) {
        cleanDom()
     }
   },10)
  }
}

function cleanDom() {
  const _popperList:any = [...document.querySelectorAll('._popper-warp')]
  if (_popperList.length) {
    _popperList.forEach((v:any) => {
      document.body.removeChild(v)
    })
  }
}

export const cleanFn = cleanDom

function copy (e:any) {
  const text:any = e.target.innerText
  e.target.style.backgroundColor="颜色值"
  const input:any = document.createElement('input');
  document.body.appendChild(input);
  input.setAttribute('value', text);
  input.value = text
  input.select();
  if (document.execCommand('copy')) {
      document.execCommand('copy');
  }
  document.body.removeChild(input)
}



// const createAppVnode = (el: any,text:string): any => {
//   const app = createApp(h(Dom, {text}, {}))
//   app.mount(el)
// }