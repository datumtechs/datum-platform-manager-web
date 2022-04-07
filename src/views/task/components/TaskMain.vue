<template>
  <div class="flex-1">
    <NormalMode v-if="mode === 'normal'">
      <template #mode>
        <PrivateSwitch :mode="'normal'" @change="change" />
      </template>
    </NormalMode>
    <ExpertModel v-else>
      <template #mode>
        <PrivateSwitch :mode="'expert'" @change="change" />
      </template>
    </ExpertModel>
  </div>
</template>
<script lang="ts" setup>

import PrivateSwitch from './PrivateSwitch.vue'
import NormalMode from './NormalMode.vue'
import ExpertModel from './ExpertModel.vue'
import { useWorkFlow } from '@/stores'

const workflowStatus = useWorkFlow()
const mode = computed(() => workflowStatus.mode)

const change = (type: string) => {
  console.log('type', type);
  workflowStatus.setMode(type)
}

</script>
<style lang="scss" scoped></style>