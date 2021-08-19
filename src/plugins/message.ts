import { Message } from 'element-ui'
let messageInstance: any = null
let mainMessage: any = function DoneMessage(options: any) {
  //如果弹窗已存在先关闭
  if (messageInstance) {
    messageInstance.close()
  }
  messageInstance = Message(options)
}
let arr = ['success', 'warning', 'info', 'error']
arr.forEach(function(type) {
  mainMessage[type] = function(options: any) {
    if (typeof options === 'string') {
      options = {
        message: options,
      }
    }
    options.type = type
    return mainMessage(options)
  }
})
export const message = mainMessage
