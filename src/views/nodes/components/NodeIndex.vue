<template>
    <div class="flex-1">
        <Banner :bg-index="4">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ totalNode }} 个可参与隐私计算任务的节点</p>
                <p v-else>{{ totalNode }} participant nodes in the privacy computing network</p>
            </template>
        </Banner>
        <div class="mt-30px max-w-1200px px-25px mx-auto">
            <NodeCard
                v-for="(node, index) in nodeList"
                :size="10"
                :page="1"
                :node="node"
                :index="index"
                :key="node.id"
            />
        </div>
        <div class="flex my-50px justify-center">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import NodeCard from './NodeCard.vue'
import top1bg from '@/assets/Images/home/top1bg.png'
import { getOrgList } from '@/api/node'
const { locale } = useI18n()
const totalNode = ref(1876)
onMounted(async () => {
    const res = await getOrgList({})
    console.log(res);

})


const nodeList = reactive([
    {
        id: 1,
        orgName: '可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐',
        orgId: 'xxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 10,
        computations: 10,
        cpu: '1234',
        memory: '3456',
        bandwidth: '4567'
    },
    {
        id: 2,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 3,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 4,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 5,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 6,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 7,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 8,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
    {
        id: 9,
        orgName: '百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐百事可乐',
        orgId: 'xxxxxxxxxxxxxxxxx',
        imgUrl: top1bg,
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
])


</script>

<style scoped lang='scss'>
</style>