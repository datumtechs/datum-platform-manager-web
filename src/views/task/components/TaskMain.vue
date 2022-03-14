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
import PrivateSwitch from './PrivateSwitch.vue'
import NormalMode from './NormalMode.vue'
import ExpertModel from './ExpertModel.vue'
const mode = ref(false)
const change = (type: boolean) => {
  mode.value = type
}

</script>
<style lang="scss" scoped></style>