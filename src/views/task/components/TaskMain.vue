<template>
  <div class="flex-1">
    <NormalMode v-if="!mode">
      <template #mode>
        <PrivateSwitch :mode="mode" @change="change" />
      </template>
    </NormalMode>
    <ExpertModel v-else>
      <template #mode>
        <PrivateSwitch :mode="mode" @change="change" />
      </template>
    </ExpertModel>
  </div>
</template>
<script lang="ts" setup>
import { mapState } from 'pinia'
import PrivateSwitch from './PrivateSwitch.vue'
import NormalMode from './NormalMode.vue'
import ExpertModel from './ExpertModel.vue'
import { useWorkFlow } from '@/stores'

const workflowStatus = useWorkFlow()

const mode = computed(() => workflowStatus.mode)

const change = (type: string) => {
  workflowStatus.setMode(type)
}

</script>
<style lang="scss" scoped></style>