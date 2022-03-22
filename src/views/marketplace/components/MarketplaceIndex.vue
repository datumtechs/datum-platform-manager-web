<script lang="ts" setup>
const { locale } = useI18n()
const totalData = ref(1876)
const router = useRouter()
// const activekey = ref(0)

// const tabsChange = (index: string) => {
//   activekey.value = +index
// }

const list = ref([
    {
        name: 'computing.privacyComputing'
    },
    {
        name: 'computing.nonPrivacyComputing'
    }
])
const tableData = reactive([
    {
        id: 1,
        orgName: '可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐可口可乐',
        orgId: 'xxxxxxxxxxxxxx',
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
        tokens: 20,
        computations: 20,
        cpu: '5555',
        memory: '6666',
        bandwidth: '7777'
    },
])
const purchase = (row: any) => {

}
const linkToViewData = (row: any) => {
    router.push({
        name: 'marketDataOverview'
    })
}
const linkToViewToken = (row: any) => {
    //TODO dex

}
</script>
<template>
    <div class="flex-1 task-wrap">
        <Banner :bg-index="'arrow'">
            <template #briefInfo>
                <p v-if="locale === 'zh'">全网共 {{ totalData }} 可参与隐私计算的有效数据</p>
                <p v-else>{{ totalData }} participant data in the privacy computing network</p>
            </template>
            <!-- <template #select>
        <ComTabs :list="list" :activekey="activekey" @change="tabsChange" />
            </template>-->
        </Banner>
        <div class="mt-30px max-w-1200px px-25px mx-auto">
            <el-table
                :header-cell-style="{ height: '50px' }"
                :row-style="{ height: '70px' }"
                :data="tableData"
                highlight-current-row
                style="width: 100%"
            >
                <el-table-column :label="$t('common.num')" width="80" />
                <el-table-column
                    show-overflow-tooltip
                    prop="dataName"
                    :label="$t('myData.dataName')"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="dataProvider"
                    :label="$t('myData.dataProvider')"
                />
                <el-table-column
                    show-overflow-tooltip
                    prop="credentialName"
                    :label="$t('myData.credentialName')"
                />
                <el-table-column prop="credentialPrice" :label="$t('common.credentialPrice')" />
                <el-table-column :label="$t('common.actions')" width="280">
                    <template #default="{ row }">
                        <el-space :size="20">
                            <span
                                class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="purchase(row)"
                            >{{ $t('common.purchase') }}</span>
                            <span
                                class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="linkToViewData(row)"
                            >{{ $t('myData.viewData') }}</span>
                            <span
                                class="text-14px text-color-[#0052D9] leading-20px cursor-pointer"
                                @click="linkToViewToken(row)"
                            >{{ $t('myData.viewCredential') }}</span>
                        </el-space>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="flex mt-50px justify-center">
            <el-pagination background layout="prev, pager, next" :total="1000" />
        </div>
    </div>
</template>