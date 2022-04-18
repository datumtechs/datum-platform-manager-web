<template>
  <div class="flex items-center justify-center">
    <el-tooltip effect="light" :content="t(`${props.content}`)" placement="top-start">
      <img class="w-20px h-20px ml-10px cursor-pointer" src="@/assets/images/task/quest@2x.png"
        alt="">
      <template #content>
        <slot name="content"></slot>
      </template>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  content: { type: String, default: "task.modeIntroductionTips" },
  position: {
    type: String,
    default: "right"
  }
})
const { t } = useI18n()
</script>