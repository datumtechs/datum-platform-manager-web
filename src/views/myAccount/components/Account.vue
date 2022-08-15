<template>
  <el-form :ref="(el: any) => formRef = el" :model="form" class="account-form mx-50px my-67px"
    :rules="rules" :label-position="'left'" :label-width="locale == 'zh' ? '80px' : '150px'">
    <el-form-item :label="`${t('account.walletAddress')}:`">
      <p class="text-16px w-390px address leading-22px text-color-[#333333]">
        <span id="address">
          {{ store.address }}
        </span>
        <span class="text-16px cursor-pointer ml-10px copy" data-clipboard-target="#address"
          @click="copy">
          <el-icon>
            <document-copy />
          </el-icon>
        </span>
      </p>
      <p class="text-16px ml-50px leading-22px text-color-[#0052D9] cursor-pointer">
        <a :href="`https://scan.platon.network/address-detail?address=${store.address}`"
          target="_blank" class="text-16px">
          {{
              t('account.viewExplorer')
          }}
        </a>
      </p>

      <input class="w-1 opacity-0" :value="store.address" />
    </el-form-item>
    <el-form-item :label="`${t('head.nickname')}:`" prop="name">
      <div class="flex w-400px">
        <el-input v-model="form.name" :disabled="disabled" :minlength="3" :maxlength="20"
          :input-style="{ width: '390px' }" class="w-390px"></el-input>
        <span class="ml-49px w-1px"></span>
        <div type="text w-30px" v-if="disabled" @click="disabled = !disabled">
          <span class="text-16px inline-block w-50px cursor-pointer text-color-[#2B60E9]">{{
              t('common.edit')
          }}</span>
        </div>
        <div class="flex" v-else>
          <el-button type="primary" round @click="submit">{{ t('common.preservation') }}</el-button>
          <el-button round
            @click="disabled = !disabled, formRef.clearValidate(), form.name = oldName">{{
                t('common.cancel')
            }}</el-button>
        </div>
      </div>
    </el-form-item>
  </el-form>
</template>
<script lang="ts" setup>
import { DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useUsersInfo } from '@/stores'
import { updateUserInfo } from '@/api/login'
import Clipboard from 'clipboard'

type Callback = (call?: any) => any;
const { t, locale } = useI18n()
const store = useUsersInfo()
const disabled = ref(true)
const formRef = ref()
const oldName = ref(store.userName)
const form = ref({
  name: store.userName
})

watch(store, () => {//解决form 表单不更新数据
  form.value.name = store.userName
  oldName.value = store.userName
})


console.log(store)
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
      // trigger: 'blur'
    }
  ]
})

const copy = () => {
  let clipboard = new Clipboard('.copy')
  clipboard.on('success', (e) => {
    ElMessage.success(t('account.copyStatusSuccess'))
    // 释放内存
    e.clearSelection()
    clipboard.destroy()
  })
  clipboard.on('error', (e) => {
    // 不支持复制
    ElMessage.error(t('account.copyStatusFailed'))
    // 释放内存
    clipboard.destroy()
  })
}

const submit = () => {
  formRef.value?.validate((bol: boolean) => {
    if (bol) {
      // console.log(form.value?.name)
      updateUserInfo({ address: store.address, userName: form.value?.name }).then(res => {
        const { code } = res
        if (code === 10000) {
          ElMessage.success(t('common.success'))
          store.setUsers(form.value?.name)
          oldName.value = form.value?.name
          disabled.value = !disabled.value
        }
      })
    }
  })
}

</script>
<style lang="scss" scoped>
</style>
