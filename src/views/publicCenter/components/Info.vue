<template>
    <div class="flex-1 task-wrap com-main">
        <Banner :back-show="true" :bg-name="'market'" @back="router.go(-1)"
            :detailName="'A组织提名xxxx成为委员会成员'" :showRouter="false">
        </Banner>
        <div class="com-main-data-wrap">
            <div class="mt-30px">
                <p class="detail-title pb-20px font-bold text-14px text-[#333]">
                    {{ $t('center.certificationDetails') }}
                </p>
                <el-table :data="tableData" :span-Method="arraySpanMethod" border class="mb-30px"
                    row-key="lName" :show-header="false">
                    <el-table-column class-name="h-100px">
                        <template #default="{ row }">
                            <div class="px-32px">
                                <p class="text-color-[#999999]">{{ $t(`${row.lName}`) }}:</p>
                                <p class="text-color-[#393939] font-bold">{{ row.lProp }}</p>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column class-name="h-100px">
                        <template #default="{ row }">
                            <div class="px-32px" v-if="!row.last">
                                <p class="text-color-[#999999]">{{ 111111111111 }}:</p>
                                <p class="text-color-[#393939] font-bold">{{ 11111111111 }}</p>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="mt-30px">
                <p class="detail-title pb-20px font-bold text-14px text-[#333]">
                    {{ $t('center.publicInfo') }}
                </p>
                <div class="info-box" v-if="0">
                    <div class="info-img-box">
                        <img src="" alt="">
                    </div>
                    <div class="info-desc-box">
                        <p class="detail-title pb-20px font-bold text-14px text-[#333]">
                            {{ $t('center.dataDesc') }}
                        </p>

                    </div>
                </div>
                <el-empty :description="$t('common.noData')" v-else />
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
interface SpanMethodProps {
    row: any
    column: TableColumnCtx<any>
    rowIndex: number
    columnIndex: number
}
const router = useRouter()

const tableData = ref([{}, {}])

const arraySpanMethod = ({ row }: SpanMethodProps): [number, number] | undefined => {
    if (row.last) {
        return [1, 2]
    }
}
</script>

<style scoped lang='scss'>
.info-box {
    height: 424px;
    border: 1px solid #eeeeee;
    display: flex;



    .info-img-box {
        flex: 1;
        border-right: 1px solid #eeeeee;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 465px;
            height: 364px;
        }
    }

    .info-desc-box {
        flex: 1;
        padding: 30px;
    }
}
</style>