<template>
    <div class="my-60px com-main-data-wrap main-content">
        <el-table :data="tableData">
            <el-table-column type="index" width="80">
                <template #header>{{ t('common.num') }}</template>
            </el-table-column>
            <el-table-column :label="$t('center.proposalContent')">
                <template #default="{ row }">
                    <p v-html="spliceContent(row)"></p>
                </template>
            </el-table-column>
            <el-table-column prop="submitterNodeName" :label="$t('center.proposer')">
            </el-table-column>
            <el-table-column :label="$t('center.proposalType')">
                <template #default="{ row }">
                    <div>
                        <div v-if="row.type === 1">{{ $t('center.addProposal') }}</div>
                        <div v-else-if="row.type === 2">{{ $t('center.delProposal') }}</div>
                        <div v-else></div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('center.votingTime')">
                <template #default="{ row }">
                    <div>
                        <p>{{ useFormatTime(row.voteBeginTime) }} to</p>
                        <p>{{ useFormatTime(row.voteEndTime) }}</p>
                    </div>
                </template>
            </el-table-column>
            <el-table-column :label="$t('center.proposalProgression')">
                <template #default="{ row }">
                    <div>
                        <p>{{ queryStatus(row.status) }}</p>
                    </div>
                </template>
            </el-table-column>
            <!-- <el-table-column prop="" :label="t('common.actions')">
            </el-table-column> -->
        </el-table>
        <div class="flex my-50px justify-center">
            <el-pagination v-model:current-page="pageObj.current" v-model:page-size="pageObj.size"
                background layout="prev, pager, next" :total="pageObj.total" />
        </div>
    </div>
</template>

<script setup lang='ts'>
import { getProposalList } from '@/api/publicity'
import { useFormatTime } from '@/hooks'
const { t, locale } = useI18n()
const tableData = ref([])
const queryProposalList = () => {
    getProposalList({
        current: pageObj.current,
        size: pageObj.size
    }).then(res => {
        const { code, data } = res
        if (code === 10000) {
            tableData.value = data.items
            pageObj.total = data.total
        }
    })
}

const spliceContent = (obj: any) => {
    if (locale.value === 'en') {
        if (obj.type === 1) {
            return `<span class="org">${obj.submitterNodeName}</span> nominates <span class="org">${obj.candidateNodeName}</span> to join the committee`
        } else if (obj.type === 2) {
            return `<span>${obj.submitterNodeName}</span> nominates <span class="org">${obj.candidateNodeName}</span> to leave the committee`
        } else {
            return ``
        }
    } else {
        if (obj.type === 1) {
            return `<span class="org"> ${obj.submitterNodeName}</span> 提名 <span class="org">${obj.candidateNodeName}</span> 加入委员会`
        } else if (obj.type === 2) {
            return `<span class="org"> ${obj.submitterNodeName}</span> 提名 <span class="org">${obj.candidateNodeName}</span> 退出委员会`
        } else {
            return ``
        }
    }

}

const queryStatus = (key: number) => {
    //投票状态 0-未开始; 1-投票中; 2-投票通过; 3-投票未通过; 6-已撤销 -->
    switch (key) {
        case 0:
            return t('center.notStarted')
        case 1:
            return t('center.voting')
        case 2:
            return t('center.voted')
        case 3:
            return t('center.failedToVote')
        case 6:
            return t('center.revoked')
        default:
            return '';
    }
}

const pageObj = reactive({
    total: 0,
    current: 1,
    size: 10,
    keyword: ''
})
onMounted(() => {
    queryProposalList()
})
</script>

<style scoped lang='scss'>
.org {
    color: #2b60e9;
}
</style>