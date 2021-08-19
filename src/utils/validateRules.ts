export const checkName = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('  请输入用户名'))
  } else {
    callback()
  }
}
export const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('  请输入密码'))
  } else {
    callback()
  }
}
