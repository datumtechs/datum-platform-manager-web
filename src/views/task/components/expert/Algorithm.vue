<template>
    <div class="w-242px bg-[#F7F8F9]">
        <p class="text-18px font-bold mt-16px pl-24px">{{ t('common.algorithm') }}</p>
        <div v-for="algo in algoList" class="flex flex-col items-center mt-24px">
            <p
                class="h-36px w-230px text-14px leading-20px text-[#000] font-bold pl-18px flex items-center">
                {{ algo.name }}</p>
            <ul class="mt-4px">
                <li class="h-36px w-230px drag-box cursor-pointer flex items-center pl-18px"
                    @dragstart="dragstart($event, item)" @dragend="dragend($event, item)"
                    :draggable="true" v-for="item in algo.childrenList" :key="item.id">{{
                            item.name
                    }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getAlgTree } from '@/api/algorithm'
import { useExpertMode } from '@/stores'
import { MAX_NODES } from '@/config/constants'
const { t } = useI18n()
const dragstart = (e: any, item: any) => {
    // if (this.viewModel === 'view') return
    useExpertMode().setDotted(true)
}

const nodeList = computed(() => useExpertMode().getNodeList)

const dragend = (e: any, item: any) => {
    useExpertMode().setDotted(false)
    const inBoxFlag = isBoxInStage(e)
    if (!inBoxFlag) return
    const ids = nodeList.value.map((item: any) => item.algorithmId)
    if (ids.includes(item.algorithmId)) {
        ElMessage.warning(t('task.repeatAlgo'))
    } else {
        if (nodeList.value.length < MAX_NODES) {
            const params = {
                algorithmId: item.algorithmId,
                nodeName: item.algorithmName,
                nodeAlgorithmVo: item.algDetailsVo,
                // workflowId: this.workflowId
            }
            useExpertMode().setNodeList(params)
            return
        }
        ElMessage.warning(t('task.exceedMaxNode'))
    }

}
const isBoxInStage = (event: any) => {
    const box: any = document.getElementById('mainStage')
    const x = event.clientX
    const y = event.clientY
    const x1 = box.getBoundingClientRect().left
    const y1 = box.getBoundingClientRect().top
    const x2 = box.getBoundingClientRect().right
    const y2 = box.getBoundingClientRect().bottom
    if (x < x1 || x > x2 || y < y1 || y > y2) {
        return false
    } else {
        return true
    }
}


const algoList: any = ref([
    // statisticList: {
    //     label: t('computing.privacyStatistics'),
    //     children: [
    //         {
    //             id: 1,
    //             label: '隐私加权求和'
    //         },
    //         {
    //             id: 2,
    //             label: '隐私求交集(PSI)'
    //         },
    //     ]
    // },
    // AIList: {
    //     label: t('computing.privacyAIComputing'),
    //     children: [
    //         {
    //             id: 1,
    //             label: '线性回归训练'
    //         },
    //         {
    //             id: 2,
    //             label: '线性回归预测'
    //         },
    //     ]
    // }
])

const queryAlgoList = () => {
    getAlgTree().then(result => {
        const { data, code } = result
        if (code === 10000) {
            algoList.value = data.childrenList
        }
    }).catch(err => { })
}

onMounted(() => {
    queryAlgoList()
})
</script>

<style scoped lang='scss'>
.drag-box {
    &:hover {
        background: #e6ecf8;
    }
}
</style>
