import { createPinia } from "pinia";
import language from './modules/language'
import Wallet from './modules/wallet'
import usersInfo from './modules/usersInfo'

export default createPinia();
export const USELANGUAGE = language
export const USEWALLET = Wallet
export const USEUSERSINFO = usersInfo