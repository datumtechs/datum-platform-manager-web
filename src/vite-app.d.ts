declare global {
  interface Window { Web3: any; eth: any, ethereum: any,location:any }
}
interface Window { Web3: any; eth: any, ethereum: any ,location:any}

(window as any)['global'] = window;
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const componentOptions: ComponentOptions
  export default componentOptions
}