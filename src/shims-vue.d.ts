declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}

declare module '*.ts'
declare module 'element-ui'
declare module 'element-ui/lib/locale/lang/*' {
  export const elementLocale: any
}
