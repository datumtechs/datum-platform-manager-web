<template>
    <div class="my-60px com-main-data-wrap main-content" main-content>
        <DescBox type="committee" :content="$t('center.committeeDesc')" />
        <div v-if="authorityList.length > 0" class="committee-wrapper">
            <div class="committee-box" v-for="box in authorityList">
                <el-avatar :size="45" :src="box.imageUrl" @error="errorHandler" />
                <p class="mt-10px text-[#000] font-bold text-16px leading-22.4px">
                    <span>{{ $t('workflow.orgName') }}:</span>
                    <span class="ml-8px">{{ box.nodeName }}</span>
                </p>
                <p class="mt-4px text-[#5D5C65] text-12px leading-16.8px">
                    <span>{{ $t('center.joinTime') }}:</span>
                    <span class="ml-8px">{{ useFormatTime(box.authorityJoinTime) }}</span>
                </p>
            </div>
        </div>
        <el-empty v-else :description="t('common.noData')" />
        <div class="flex my-50px justify-center">
            <el-pagination v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                background layout="prev, pager, next" :total="pageObj.total" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import DescBox from './DescBox.vue'
import { getAuthorityList } from '@/api/publicity'
import { useFormatTime } from '@/hooks'

const { t } = useI18n()
const authorityList = ref(<any>[])
const queryAuthList = () => {
    getAuthorityList({
        current: pageObj.current,
        size: pageObj.size
    }).then(res => {
        const { code, data } = res
        if (code === 10000) {
            authorityList.value = data.items
            pageObj.total = data.total
        }
    })
}
const errorHandler = () => true
const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10,
})
onMounted(() => {
    queryAuthList()
})
</script>

<style scoped lang='scss'>
.committee-wrapper {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: 328px 328px 328px;
    // grid-template-rows: 33.33% 33.33% 33.33%;

    .committee-box {
        width: 328px;
        height: 138px;
        border: 1px solid #EBEEF9;
        padding: 20px;
        // box-shadow: 1px 1px 1px #eee;
    }
}
</style>