<template>
  <div class="flex-1 task-wrap">
    <Banner :bg-index="4">
      <template #briefInfo>
        <p v-if="locale === 'zh'">全网共 {{ totalNode }} 个可参与隐私计算任务的节点</p>
        <p v-else>{{ totalNode }} participant nodes in the privacy computing network</p>
      </template>
    </Banner>
    <NodeIndex />
  </div>
</template>
<script lang="ts" setup>
import NodeIndex from './components/NodeIndex.vue'
const { locale } = useI18n()
const totalNode = ref(1876)

</script>