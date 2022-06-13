<template>
    <div
        class="node-line mb-10px flex h-90px border-1 border-solid border-[#eee] items-center hover-line">
        <div class="w-73px index-box">{{ useTableIndex(props.index, props.page, props.size) }}</div>
        <div class="pr-30px">
            <img class="w-36px h-36px rounded-1/2" :src="node.imageUrl"
                @error="useLoadImg($event, orgImg)" />
        </div>
        <div class="w-230px table-box">
            <p class="deep-title font-bold w-210px ellipse">{{ node.nodeName }}</p>
            <el-tooltip placement="top" effect="light" :content="node.identityId">
                <p class="shallow-text w-210px ellipse">{{ node.identityId }}</p>
            </el-tooltip>
        </div>
        <div class="w-125px table-box">
            <p class="title whitespace-nowrap">{{ t('node.credentials') }}</p>
            <p class="text">{{ node.totalDataToken }}</p>
        </div>
        <div class="w-140px table-box">
            <p class="title whitespace-nowrap">{{ t('node.computations') }}</p>
            <p class="text">{{ node.totalTask }}</p>
        </div>
        <div class="w-120px table-box">
            <p class="title whitespace-nowrap">{{ t('node.totalCpu') }}</p>
            <p class="text">{{ node.orgTotalCore }}&nbsp;{{ t('common.cores') }}</p>
        </div>
        <div class="w-140px table-box">
            <p class="title whitespace-nowrap">{{ t('node.totalMemory') }}</p>
            <p class="text">{{ useSize(node.orgTotalMemory) }}</p>
        </div>
        <div class="w-140px table-box">
            <p class="title whitespace-nowrap">{{ t('node.totalBandwidth') }}</p>
            <p class="text">{{ usedBandwidth(node.orgTotalBandwidth) + 'ps' }}</p>
        </div>
        <div class="operate text-center flex-grow">
            <p class="font-medium  leading-20px link-btn  px-10px" @click="linkToDetail">{{
                    t('node.view')
            }}</p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import orgImg from '@/assets/images/home/org.svg'
import { useSize, useTableIndex, usedBandwidth, useLoadImg } from '@/hooks'
const { t } = useI18n()
const router = useRouter()
const props = defineProps({
    index: {
        type: Number, default: 0
    },
    page: {
        type: Number,
        default: 1
    },
    size: { type: Number, default: 10 },
    node: {
        type: Object,
        default: () => { }
    }
})

const linkToDetail = () => {
    router.push({
        path: `/nodes/details/${props.node.identityId}`,
    })
}
</script>

<style scoped lang='scss'>
.box {
    overflow: hidden;
    word-wrap: break-word;
    padding: 0 10px;
}

.index-box {
    @extend .box;
    text-align: center;
}

.table-box {
    @extend .box;
    overflow: hidden;
}

.title {
    font-size: 14px;
    color: #999;
    line-height: 12px;
}

.text {
    font-size: 14px;
    color: #333;
    margin-top: 13px;
    line-height: 18px;
    font-family: Ali-Bold, DINPro-Bold;
}

.deep-title {
    font-size: 18px;
    color: #333;
}

.shallow-text {
    font-size: 12px;
    color: #999;
    margin-top: 10px;
    line-height: 12px;
}
</style>