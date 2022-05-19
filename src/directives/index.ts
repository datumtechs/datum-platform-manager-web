import {ElTooltip} from 'element-plus'

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
  updated(el:any, binding:any) {
    if (el.querySelectorAll) {
      const label:any[] = el.querySelectorAll('.show-ellipsis-tooltip')
      label.forEach(v => {
        const childNode = v.childNodes[0]
        console.log(childNode)
        const dom = document.createElement('div')
        const app: any = createApp({
          // v-model:visible="visible"
              template: `<el-tooltip
                      effect="light"
                      content="${childNode.innerText}"
                      placement="top"
                    >
                      <div class="tooltip-ellipsis-content"   @dblclick="copy">${childNode.innerText} </div>
                    </el-tooltip>` ,
              data: ()=>{
                return {
                  visible:false
                }
              },
          methods: {
                // mouseenter(e:any) {
                //   const box = e.target
                //   if (box.scrollWidth > box.offsetWidth) {
                //     this.visible= true
                //   } else {
                //     console.log("没有出现省略号")
                //   }
                // },
                // mouseleave (){this.visible = false},
                copy(e: any) {
                  const text: string = e.target.innerText
                    e.target.style.backgroundColor="颜色值"
                    const input = document.createElement('input');
                    document.body.appendChild(input);
                    input.setAttribute('value', text);
                    input.value = text
                    input.select();
                    if (document.execCommand('copy')) {
                        document.execCommand('copy');
                    }
                    document.body.removeChild(input)
                }
              }
           
        }).component('el-tooltip', ElTooltip)
        if (childNode.children.length) {//子节点只查询1级
          console.log('子节点')
          const nodeChildNode: any[] = [...childNode.children]
             
          // console.log(nodeChildNode)
          nodeChildNode.forEach((v:any) => {
            v.innerText = ''
            app.mount(dom)
            v.appendChild(dom)
          })
        } else {
          // if (childNode.scrollWidth > childNode.offsetWidth) {
            childNode.innerText = ''
            app.mount(dom)
            childNode.appendChild(dom)
          // } else {
          //   console.log(childNode.className)
          //   if(childNode.className.indexOf('tooltip-ellipsis-content') < 0) childNode.className += ' tooltip-ellipsis-content'
          // }
        }
      })
      //更新思路直接获取  el-tooltip 标签 缺陷导致重复
    }
  }
}