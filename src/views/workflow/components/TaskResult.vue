<template>
    <div class="flex-1 task-wrap com-main">
        <Banner :back-show="true" :bg-name="'clocksWatches'" :showRouter="false"
            :detailName="props.workFlowName" @back="router.go(-1)">
            <template #select>
                <ComTabs :list="hasModel ? modelList : list" :activekey="activekey"
                    @change="tabsChange" />
            </template>
        </Banner>
        <div class="com-main-data-wrap mt-63px">
            <TaskEvents v-if="activekey === 1" :data="eventList" />
        </div>
    </div>
</template>
<script setup lang='ts'>

const props = defineProps({
    workFlowName: {
        type: String,
        default: '222222222222',
    }
})

const modelList = reactive([
    {
        name: 'computeTask.taskResult'
    },
    {
        name: 'computeTask.taskEvents'
    },
    {
        name: 'computeTask.modelEvaluation'
    }
])

const list = reactive([
    {
        name: 'computeTask.taskResult'
    },
    {
        name: 'computeTask.taskEvents'
    }
])
const eventList = ref([])
const route = useRoute()
const router = useRouter()
const activekey = ref(0)

const hasModel = computed(() => route.query.hasModel)
const tabsChange = (index: string) => {
    activekey.value = +index
}

</script>

<style scoped lang='scss'>
</style>