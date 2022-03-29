<template>
  <el-form
    :ref="(el: any) => formRef = el"
    :model="form"
    class="account-form mx-50px my-67px"
    :rules="rules"
    :label-width="locale == 'zh' ? '80px' : '150px'"
  >
    <el-form-item :label="`${$t('account.walletAddress')}:`">
      <p class="text-16px w-390px address leading-22px text-color-[#333333]">{{ store.address }}</p>
      <p class="text-16px ml-50px leading-22px text-color-[#0052D9] cursor-pointer">
        <a
          :href="`https://scan.platon.network/address-detail?address=${store.address}`"
          target="_blank"
        >
          {{
            $t('account.viewExplorer')
          }}
        </a>
      </p>
      <span class="text-16px cursor-pointer ml-10px" @click="copy">
        <el-icon>
          <document-copy />
        </el-icon>
      </span>
      <input :ref="(el) => addressRef = el" class="w-1 opacity-0" :value="store.address" />
    </el-form-item>
    <el-form-item :label="`${$t('head.nickname')}:`" prop="name">
      <div class="flex w-full">
        <el-input
          v-model="form.name"
          :disabled="disabled"
          :minlength="3"
          :maxlength="20"
          :input-style="{ width: '390px' }"
          class="w-390px"
        ></el-input>
        <span class="ml-49px w-1px"></span>
        <el-button type="text" v-if="disabled" @click="disabled = !disabled">
          <span class="text-16px">{{ $t('common.edit') }}</span>
        </el-button>
        <div class="flex" v-else>
          <el-button type="primary" round @click="submit">{{ $t('common.preservation') }}</el-button>
          <el-button round @click="disabled = !disabled">{{ $t('common.cancel') }}</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { USEUSERSINFO } from '@/stores'
type Callback = (call?: any) => any;
const { t, locale } = useI18n()
const store = USEUSERSINFO()
const disabled = ref(true)
const formRef = ref()
const form = ref({
  name: ''
})

const rules = ref({
  name: [
    {
      required: true,
      validator: (rule: any, value: string, callback: Callback) => {
        if (!value) {
          callback(new Error(t('account.nickPlaceholder')))
        } else if (String(value).length < 3 || String(value).length > 20) {
          callback(new Error(t('account.nickValidateTips')))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
})

const addressRef = ref()
const copy = () => {
  // 有兼容性 暂时先这样
  try {
    const addressDom = addressRef.value
    console.log(addressDom)
    addressDom.select()
    const res = document.execCommand('copy')
    if (res) {
      ElMessage.success(t('account.copyStatusSuccess'))
      return
    }
    ElMessage.error(t('account.copyStatusFailed'))
  } catch {
    ElMessage.error(t('account.copyStatusFailed'))
  }
}

const submit = () => {
  formRef.value?.validate((bol: boolean) => {
    if (bol) {
      console.log(form.value?.name)
    }
  })
}

</script>
<style lang="scss" scoped></style>
