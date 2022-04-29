<template>
  <el-dialog :model-value="props.loginShow" :append-to-body="true" :width="400" :top="'30vh'"
    ref="dialog" :destroy-on-close="true" :close-on-click-modal="false"
    :close-on-press-escape="false" @close="emit('loginShowChange')">
    <template #title>
      <p class="text-[18px] font-bold">{{ t('head.loginDialogTitle') }}</p>
    </template>
    <div v-if="!isWallet">
      <div class="flex mb-30px items-center gap-10px justify-center">
        <el-icon>
          <pointer />
        </el-icon>
        <p class>{{ t('head.installTipOne') }}</p>
      </div>
      <div class="flex mb-30px items-center gap-10px justify-center">
        <el-icon>
          <cloudy />
        </el-icon>
        <p>{{ t('head.installTipTwo') }}</p>
      </div>
      <el-button type="primary" class="ml-110px w-140px h-40px rounded-[20px]"
        @click="linkToMetamask">{{ t('head.install') }}</el-button>
    </div>
    <div v-else class="h-157px flex items-center justify-center flex-col">
      <div @click="login" :class="{ 'cursor-not-allowed': !checked, 'cursor-pointer': checked }"
        class="flex w-264px h-70px flex items-center justify-center rounded-4px bg-color-[#F7F8F9] border-1 border-solid border-[#EEEEEE]">
        <img :src="metamaskImg" class="w-43px h-43px mr-28px" />
        <span class="font-bold text-[20px] text-color-[#333333]">MetaMask</span>
      </div>
      <div
        class="agreement w-264px mt-19px flex items-flex-start text-[12px] text-color-[#999999] cursor-pointer">
        <el-checkbox class="checkbox" v-model="checked" size="large">&nbsp;</el-checkbox>
        <div @click="checked = !checked" class="flex">
          <span v-if="locale === 'zh'">
            <span>阅读并同意</span>
            <i class="text-color-[#0052D9]">用户协议</i>和
            <i class="text-color-[#0052D9]">隐私声明</i>
          </span>
          <span v-else>
            <span>I have read and agreed to the</span>
            <i class="text-color-[#0052D9]">Term of Use</i> and
            <i class="text-color-[#0052D9]">Privacy Policy</i>
          </span>
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Pointer, Cloudy } from '@element-plus/icons-vue'
import metamaskImg from '@/assets/Images/header/metamask-fox.svg'
import { useWallet, useUsersInfo } from '@/stores'
import { Login, LoginNonceId } from '@/api/login'

const emit = defineEmits(['loginShowChange'])
const { t, locale } = useI18n()
const checked = ref<any>(false)
const isLoginIng = ref(false)
const props = defineProps({ loginShow: { type: Boolean, default: false } })
const web3: any = inject('web3')
const walletStore = useWallet()
const userInfoStore = useUsersInfo()
const isWallet = walletStore.getIsWallet

const closeDialog = () => {
  checked.value = false
  emit('loginShowChange')
}

const linkToMetamask = () => {
  closeDialog()
  window.open(`https://devdocs.platon.network/docs/${locale.value !== 'en' ? 'zh-CN' : 'en'}/MetaMask`)
}

const getLogin = async (params: any) => {
  try {
    const res: any = await Login(params)
    const { data, code } = res
    if (code === 10000) {
      userInfoStore.setToken(data.token)
      userInfoStore.setUsers(data.userName)
    }
    isLoginIng.value = false
    closeDialog()
  } catch (error) {
    isLoginIng.value = false
  }
}

const getLoginNonce = async () => {
  try {
    const address: string | null = userInfoStore.getAddress
    if (address) {
      const {
        data, code
      } = await LoginNonceId(address)
      if (code !== 10000) {
        return new Error('Wallet address exception')
      }
      walletStore.setNonceId(data.nonce)
    } else {
      console.log('get address error');
    }
  } catch (error) {
    console.log(error)
  }
}

const login = async () => {
  if (!checked.value || isLoginIng.value) return
  try {
    isLoginIng.value = true
    await web3.connectWallet()
    await getLoginNonce()
    const res = await web3.signForWallet('login')
    res && getLogin(web3.loginParams())
  } catch (error) {
    isLoginIng.value = false
    console.log(error)
  }
}

</script>

<style scoped lang="scss">
:global(.el-dialog__header) {
  height: 62px;
  border: 1px solid #eeeeee;
  font-size: 18px;
  font-weight: 900 !important;
  color: #333333;
  line-height: 22px;
}

:global(.el-overlay) {
  background-color: rgba(0, 0, 0, 0.3) !important;
}

:global(.el-dialog) {
  border-radius: 12px !important;
  overflow: hidden;
}

.agreement {
  .checkbox {
    height: 16px;
  }
}
</style>