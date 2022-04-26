<template>
    <div class="w-380px bg-[#F7F8F9]">
        <div class="flex h-40px bg-[#fff]">
            <div class="flex flex-auto text-center text-[#333] font-medium text-14px items-center justify-center cursor-pointer"
                :class="{ active: currentTab === tab.value }" @click="currentTab = tab.value"
                v-for="tab in tabList" :key="tab.id">{{ tab.label }}</div>
        </div>
        <div v-if="curNodeId" :key="viewKey" class="main-panel">
            <Overview v-show="currentTab === 'overview'" :overview-obj="overviewObj" />
            <Input v-if="currentTab === 'input'" v-bind="$attrs" />
            <Output v-show="currentTab === 'output'" v-bind="$attrs" />
            <Code v-show="currentTab === 'code'" :codeObj="codeObj" />
            <Environment v-show="currentTab === 'environment'" v-bind="$attrs" :env-obj="envObj" />
        </div>
        <div v-else class="px-50px pt-70px main-panel">
            <p>{{ t('expert.overviewTipForPanel') }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import Overview from './components/Overview.vue'
import Input from './components/Input.vue'
import Output from './components/Output.vue'
import Code from './components/Code.vue'
import Environment from './components/Environment.vue'
import { getUserOrgList } from '@/api/login'
import { useExpertMode } from '@/stores'
const { t } = useI18n()
const viewKey = ref(0)
const overviewObj = reactive({
    algorithmDesc: '用于跨组织的纵向联合分类模型训练',
    algorithmName: 'PSI',
    author: 'Rosetta',
    supportNum: '>=2',
    supportLanguage: 'Python',
    maxNumbers: 2,
    minNumbers: 0,
})
const envObj = reactive({
    costCpu: 1,
    costMem: 1,
    costBandwidth: 1,
    runTime: 1,
})

const codeObj = reactive({
    code: '',
    algorithmVariableList: []
})

const queryOrgList = (): void => {
    getUserOrgList().then((res: any) => {
        const { data, code } = res
        if (code === 10000) {
            useExpertMode().setOrgList(data)
        }
    }).catch((e: any) => {
        console.log(e);
    })
}

const curNodeId = computed(() => useExpertMode().getCurNodeId)
const currentTab = ref('overview')

// watch(curNodeId, (newV, oldV) => {
//     if (newV) {
//         getPanelData(newV)
//     }
// })

const getPanelData = (id: string) => {
    const nodeList = useExpertMode().getNodeList
    nodeList.forEach((node: any) => {
        if (id === node.algorithmId) {
            const data = node.nodeAlgorithmVo
            overviewObj.algorithmName = data.algorithmName
            overviewObj.algorithmDesc = data.algorithmDesc
            overviewObj.author = data.author
            overviewObj.maxNumbers = data.maxNumbers
            overviewObj.minNumbers = data.minNumbers
            overviewObj.supportLanguage = data.supportLanguage
            codeObj.code = data.algorithmCode?.calculateContractCode // TODO psi has code?
            codeObj.algorithmVariableList = data.algorithmVariableList
            envObj.costCpu = data.costCpu
            envObj.costMem = data.costMem
            envObj.costBandwidth = data.costBandwidth
            envObj.runTime = data.runTime
        }
    })
}


const tabList = computed(() => [{
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
}])

onMounted(() => {
    // queryOrgList()
})

</script>

<style scoped lang='scss'>
.active {
    background: #f7f8f9;
}

.main-panel {
    height: calc(100% - 40px);
    overflow: hidden;
}

:deep(.el-input__inner) {
    padding: 0 15px;
    height: 40px;
    background: #eeeeee;
    border-radius: 20px;
}
</style>