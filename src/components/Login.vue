<template>
  <el-dialog
    :model-value="props.loginShow"
    :append-to-body="true"
    :width="400"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="emit('loginShowChange')"
  >
    <template #title>
      <p>{{ $t('head.loginDialogTitle') }}</p>
    </template>
    <div>
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
  </el-dialog>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from 'vue'
import { Pointer, Cloudy } from '@element-plus/icons-vue'
const internalInstance: any = getCurrentInstance()
const { locale } = useI18n()
const emit = defineEmits(['loginShowChange'])
const props = defineProps({
  loginShow: { type: Boolean, default: false }
})
const linkToMetamask = () => {
  //window.open(`https://devdocs.platon.network/docs/${internalInstance.ctx.$i18n.locale !== 'en' ? 'zh-CN' : 'en'}/MetaMask`)
  window.open(`https://devdocs.platon.network/docs/${locale.value !== 'en' ? 'zh-CN' : 'en'}/MetaMask`)
  emit('loginShowChange')
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
</style>