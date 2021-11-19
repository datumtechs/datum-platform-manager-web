import { DirectiveOptions } from 'vue'
// el-button 节流
export const preventReClick: DirectiveOptions = {
  inserted(el: any, binding) {
    const { value } = binding
    el.addEventListener('click', () => {
      if (!el.disabled) {
        el.disabled = true
        el.classList.add('disabled')
        setTimeout(() => {
          el.disabled = false
          el.classList.remove('disabled')
        }, value || 3000) // 传入绑定值就使用，默认3000毫秒内不可重复点击
      }
    })
  },
}
