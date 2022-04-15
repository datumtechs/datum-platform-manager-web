<template>
    <div class="flex-1">
        <Banner :bg-name="'network'">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ totalNode }} 个可参与隐私计算任务的节点</p>
                <p v-else>{{ totalNode }} participant nodes in the privacy computing network</p>
            </template>
        </Banner>
        <div class="main-content mt-30px max-w-1200px mx-auto overflow-hidden">
            <NodeCard v-for="(node, index) in nodeList" :size="10" :page="1" :node="node"
                :index="index" :key="index" />
        </div>
        <div class="flex my-50px justify-center">
            <el-pagination background layout="prev, pager, next"
                v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                :total="pageObj.total" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import NodeCard from './NodeCard.vue'
import { getOrgList } from '@/api/node'
const { locale } = useI18n()
const totalNode = ref(1876)

const orderBy = ref('')
const size = ref(10)
const current = ref(1)
const total = ref(0)
let nodeList: any = reactive([])

const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10
})

watch(() => pageObj.current, (newValue, oldValue) => {
    queryOrgList()
});

const queryOrgList = async () => {
    const { code, data } = await getOrgList({
        orderBy: orderBy.value, size: size.value, current: current.value
    })
    if (code === 10000) {
        nodeList.push(...data.items)
        pageObj.total = data.total
    }
}
onMounted(() => {
    queryOrgList()
})
</script>
<style scoped lang='scss'>
</style>