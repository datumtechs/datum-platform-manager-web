<template>
  <div
    class="rounded-1/2 ml-13px w-18px h-18px border-1 border-solid border-[#333333] text-color-[#333333] text-12px flex items-center justify-center"
  >
    <el-tooltip effect="dark" :content="$t(`${props.content}`)" placement="top-start">
      ?
      <template #content>
        <slot name="content"></slot>
      </template>
    </el-tooltip>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({ content: { type: String, default: "task.modeIntroductionTips" } })
</script>