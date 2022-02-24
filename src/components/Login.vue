<template>
  <el-dialog
    :model-value="props.loginShow"
    :append-to-body="true"
    :width="400"
    :top="'30vh'"
    ref="doalog"
    :destroy-on-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="emit('loginShowChange')"
  >
    <template #title>
      <p class="text-[18px] font-bold">{{ $t('head.loginDialogTitle') }}</p>
    </template>
    <div v-if="!isWallet">
      <div class="flex mb-30px items-center gap-10px justify-center">
        <el-icon>
          <pointer />
        </el-icon>
        <p class>{{ $t('head.intallTipOne') }}</p>
      </div>
      <div class="flex mb-30px items-center gap-10px justify-center">
        <el-icon>
          <cloudy />
        </el-icon>
        <p>{{ $t('head.installTipTwo') }}</p>
      </div>
      <el-button
        type="primary"
        class="ml-110px w-140px h-40px rounded-[20px]"
        @click="linkToMetamask"
      >{{ $t('head.install') }}</el-button>
    </div>
    <div v-else class="h-157px flex items-center justify-center flex-col">
      {{ checked }}
      <div
        @click="login"
        :class="{ 'cursor-not-allowed': !checked, 'cursor-pointer': checked }"
        class="flex w-264px h-70px flex items-center justify-center rounded-4px bg-color-[#F7F8F9] border-1 border-solid border-[#EEEEEE]"
      >
        <img :src="metamask" class="w-43px h-43px mr-28px" />
        <span class="font-bold text-[20px] text-color-[#333333]">MetaMask</span>
      </div>
      <div
        @click="checked = !checked"
        class="agreement w-264px mt-19px flex items-flex-start text-[12px] text-color-[#999999] cursor-pointer"
      >
        <el-checkbox class="checkbox" :model-value="checked" size="large">&nbsp;</el-checkbox>
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
  </el-dialog>
</template>

<script lang="ts" setup>
import { Pointer, Cloudy } from '@element-plus/icons-vue'
import metamask from '@/assets/Images/header/metamask-fox.svg'
import Web3Service from '@/utils/Web3Service';
import { USEWALLET, USEUSERSINFO } from '@/stores'
import { Login, LoginNonceId } from '@/api/login'
import type { ElDialog } from 'element-plus';
const emit = defineEmits(['loginShowChange'])
const { locale } = useI18n()
const checked = ref(false)
const islogin = ref(false)
const props = defineProps({ loginShow: { type: Boolean, default: false } })
const doalog = ref<InstanceType<typeof ElDialog> | null>(null)
const Web3 = new Web3Service()
const isWallet = USEWALLET().getIsWallet

const closeDialog = () => {
  checked.value = false
  doalog.value?.close()
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
      USEUSERSINFO().setToken(data.token)
      USEUSERSINFO().setUsers(data.userName)
      closeDialog()
    }
    islogin.value = false
  } catch (error) {
    islogin.value = false
    console.log(error)
  }
}

const getLoginNonce = async () => {
  try {
    const address: string = USEUSERSINFO().getAddress
    const {
      data, code
    } = await LoginNonceId(address)
    if (code !== 10000) {
      throw new Error('Wallet address exception')
    }
    USEWALLET().setNonceId(data.nonce)
  } catch (error) {
    console.log(error)
  }
}

const login = async () => {
  try {
    islogin.value = true
    await Web3.connectWallet()
    await getLoginNonce()
    const res = await Web3.signForWallet('login')
    res && getLogin(Web3.loginParams())
  } catch (error) {
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