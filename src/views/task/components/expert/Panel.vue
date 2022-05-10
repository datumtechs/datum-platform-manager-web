<template>
    <div class="w-380px  panel-box">
        <div class="flex h-40px bg-[#fff] tab-box">
            <div class="flex flex-auto text-center text-[#333] font-medium text-14px items-center justify-center cursor-pointer tab"
                :class="{ active: currentTab === tab.value }" @click="currentTab = tab.value"
                v-for="tab in tabList" :key="tab.id">{{ tab.label }}</div>
        </div>
        <div v-if="showPanel" :key="viewKey" class="main-panel">
            <Overview v-show="currentTab === 'overview'" :overview-obj="overviewObj" />
            <Input v-show="currentTab === 'input'" v-bind="$attrs" />
            <Output v-show="currentTab === 'output'" v-bind="$attrs" />
            <Code v-show="currentTab === 'code'" v-bind="$attrs" :codeObj="codeObj" />
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
    variableList: <any>[]
})

// const queryOrgList = (): void => {
//     getUserOrgList().then((res: any) => {
//         const { data, code } = res
//         if (code === 10000) {
//             useExpertMode().setUserOrgList(data)
//         }
//     }).catch((e: any) => {
//         console.log(e);
//     })
// }

const curNodeId = computed(() => useExpertMode().getCurNodeId)

const showPanel = computed(() => useExpertMode().getShowPanel)

const curNodeIndex = computed(() => useExpertMode().getCurNodeIndex)

const currentTab = ref('overview')

watch(curNodeId, (newV, oldV) => {
    if (newV) {
        currentTab.value = 'overview'
        getPanelData(newV)
    }
})

watch(curNodeIndex, () => {
    viewKey.value++
})

const getPanelData = (id: string) => {
    const nodeList = useExpertMode().getNodeList
    nodeList.forEach((node: any) => {
        if (id === node.algorithmId) {
            const data = node.alg
            overviewObj.algorithmName = data.algorithmName
            overviewObj.algorithmDesc = data.algorithmDesc
            overviewObj.author = data.author
            overviewObj.maxNumbers = data.maxNumbers
            overviewObj.minNumbers = data.minNumbers
            overviewObj.supportLanguage = data.supportLanguage

            codeObj.code = node.nodeCode.code // TODO psi has code?
            codeObj.variableList = node.nodeCode.variableList
            envObj.costCpu = node.resource.costCpu
            envObj.costMem = node.resource.costMem
            envObj.costBandwidth = node.resource.costBandwidth
            envObj.runTime = node.resource.runTime
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
    useExpertMode().queryUserOrgList()
})

</script>

<style scoped lang='scss'>
.panel-box {
    border-left: 1px solid #eeeeee;

    .tab-box {
        .tab {
            border-bottom: 1px solid #eeeeee;

            &:not(:last-child) {
                border-right: 1px solid #eeeeee;
            }

            &.active {
                border-bottom: none;
            }
        }
    }
}

.main-panel {
    height: calc(100% - 40px);
    overflow: hidden;
}

:deep(.el-input__inner) {
    padding: 0 15px;
    height: 40px;
    background: #fff;
    border-radius: 20px;
}
</style>