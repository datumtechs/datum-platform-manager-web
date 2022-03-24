<template>
    <div class="w-360px bg-[#F7F8F9]">
        <div class="flex h-40px bg-[#fff]">
            <div
                class="flex flex-auto text-center text-[#333] font-medium text-14px items-center justify-center cursor-pointer"
                :class="{ active: currentTab === tab.value }"
                @click="currentTab = tab.value"
                v-for="tab in tabList"
                :key="tab.id"
            >{{ tab.label }}</div>
        </div>
        <div v-if="showNodePanel" :key="viewKey" class="main-panel">
            <Overview v-show="currentTab === 'overview'" :overview-obj="overviewObj" />
            <Input v-show="currentTab === 'input'" v-bind="$attrs" />
            <Output v-show="currentTab === 'output'" v-bind="$attrs" />
            <Code v-show="currentTab === 'code'" :code="code" />
            <Environment v-show="currentTab === 'environment'" v-bind="$attrs" :env-obj="envObj" />
        </div>
        <div v-else class="px-50px pt-70px main-panel">
            <p>{{ $t('expert.overviewTipForPanel') }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Overview from './components/Overview.vue'
import Input from './components/Input.vue'
import Output from './components/Output.vue'
import Code from './components/Code.vue'
import Environment from './components/Environment.vue'
const { t } = useI18n()
const viewKey = ref(0)
const overviewObj = reactive({

})
const envObj = reactive({

})

const showNodePanel = ref(true)
const code = ref('')
const currentTab = ref('overview')
const tabList = reactive([
    {
        id: 1,
        value: "overview",
        label: t('expert.overview')
    },
    {
        id: 2,
        value: "input",
        label: t('expert.input')
    },
    {
        id: 3,
        value: "output",
        label: t('expert.output')
    },
    {
        id: 4,
        value: "code",
        label: t('expert.code')
    },
    {
        id: 5,
        value: "environment",
        label: t('expert.environment')
    }
])
</script>

<style scoped lang='scss'>
.active {
    background: #f7f8f9;
}
.main-panel {
    height: calc(100% - 40px);
    overflow: hidden;
}
</style>