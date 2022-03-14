declare global {
  interface Window { Web3: any; eth: any, ethereum: any }
}
interface Window { Web3: any; eth: any, ethereum: any }

declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}