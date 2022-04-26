<template>
    <div class="p-30px input-box">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureInput') }}</p>
        <div class="mt-40px">
            <p class="text-color-[#333] font-medium">{{ t('role.taskSponsor') }}</p>
            <el-select v-model="taskSender" class="mt-10px w-full" size="small"
                :disabled="viewModel === 'view'" filterable :placeholder="t('task.selectSponsor')"
                @change="handleSenderChange">
                <el-option v-for="item in orgList" :key="item.identityId" :label="item.nodeName"
                    :value="item.identityId"></el-option>
            </el-select>
        </div>
        <div v-if="showModel">
            <p class="mt-40px text-color-[#333] font-medium">{{ t('expert.model') }}</p>
            <p class="mt-10px">
                <el-select v-if="curNodeIndex !== 0" class="w-full" v-model="modelValue"
                    size="small" :disabled="viewModel === 'view'" filterable
                    :placeholder="t('expert.selectModel')" @change="handleModelChange">
                    <el-option v-for="(item, index) in modelOptions" :key="index"
                        :label="item.fileName" :value="item.modelId"></el-option>
                </el-select>
                <el-cascader v-else class="w-full" :key="modelKey" v-model="modelValue"
                    :disabled="viewModel === 'view'" size="small" :span="12" :props="{
                        // checkStrictly: true,
                        label: 'name', // label value
                        value: 'code', // 指定选项的值为选项对象的某个属性值
                        lazy: true,
                        lazyLoad: (node, resolve) => {
                            modelLazyLoad(node, resolve)
                        }
                    }" @change="e => { changeModelValue(e) }"></el-cascader>
            </p>
        </div>
        <div v-for="(item, index) in selectLayout" :key="index" class="mt-40px">
            <p class="text-color-[#333] font-medium">
                {{ `${t('role.dataProvider')}-${index + 1}` }}
                <!-- TODO 改名称为数据提供方 -->
            </p>
            <p class>
                <!-- <el-select size="mini">
            <option v-for="item in orgs" :key="item.identityId" :label="item.label" :value="item.value"></option>
                </el-select>-->
                <el-cascader class="w-full mt-10px" :key="cascaderKey[index]"
                    v-model="inputValue[index]" :disabled="viewModel === 'view'" size="small"
                    :span="12" :props="{
                        // checkStrictly: true,
                        label: 'name', // label value
                        value: 'code', // 指定选项的值为选项对象的某个属性值
                        lazy: true,
                        lazyLoad: (node, resolve) => {
                            inputLazyLoad(node, resolve, index)
                        }
                    }" @change="e => { changeInputValue(e, index) }"></el-cascader>
                <Transfer :ref="setRef" :view-model="viewModel" :column-data="columnsList[index]"
                    :transfer-index="index" :algorithms="algorithms" @saveToStore="saveToStore">
                </Transfer>
                <!-- <i v-if="index > minLen - 1" class="el-icon-delete delete-input-btn pointer" @click="delToInput(index)"></i> -->
            </p>
        </div>
    </div>
</template>

<script setup lang='ts'>
import type { Ref } from 'vue';
import { useExpertMode } from '@/stores'
import Transfer from './Transfer.vue'
import { queryUserDataList, queryDataDetails } from '@/api/data'

const { t } = useI18n()
const modelKey = ref('')
const taskSender = ref('')
const viewModel = ref('')
const algorithm: any = computed(() => useExpertMode().getAlgorithm)
const orgList: any = computed(() => useExpertMode().getOrgList)
const showModel: any = computed(() => algorithm.value.inputModel)
let selectLayout: any = ref([{ item: '111', value: '111', }])
const minLen = 2

const cascaderKey: any = ref([])
const inputValue: Ref<any[]> = ref([] as any[])

const algorithms = ref([])

const columnsList: any = ref([])

const columnsRef = ref([] as any[])


const setRef = (el: any) => {
    columnsRef.value.push(el)
}
nextTick(() => {
    console.dir(columnsRef.value);
});


const saveToStore = (transferIndex: any) => {
    const columnObj = columnsRef.value[transferIndex][0].getList()
    const columnLists = Array(2).fill({})
    columnLists[transferIndex] = columnObj

    const params = {
        keyColumn: Number(columnLists[transferIndex].keyColumn),
        dataColumnIds: columnLists[transferIndex].dataColumnIds,
        dataTableId: inputValue[transferIndex][1],
        identityId: inputValue[transferIndex][0],
        dependentVariable: 0
    }
    if (transferIndex === 0) {
        params.dependentVariable = Number(columnLists[transferIndex].dependentVariable)
    }
    // this.SET_VO_LIST({ params, transferIndex }) TODO
}

const initInputPanel = () => {
    selectLayout.value = Array(minLen).fill({})
}

const changeInputValue = (item: any, index: number) => {
    console.log('item', item);
    console.log('index', index);

    if (item && item.length === 0) {
        return columnsList.value[index] = []
    }

    const ids = getIdentity(inputValue.value)
    useExpertMode().setDisableOrg(ids)

    // 更新key，渲染el-cascader组件，使用options最新的值
    const upList: any = []
    // cascaderKey.map((item, i) => {
    //     if (index !== i) {
    //         upList.push(i)
    //     }
    // })
    // upList.map(i => {
    //     this.cascaderKey[i] = this.cascaderKey[i] + 1
    // })
    // // 获取列的数据
    if (item && item.length === 2) {
        getColumnList(item[item.length - 1], index)
    }
}
const getColumnList = async (metaDataId: string, index: number, params?: any) => {
    const { code, data } = await queryDataDetails({ metaDataId })
    if (code === 10000) {
        columnsList.value[index] = data.columnsList
    }
    // this.columnsList.splice(index, 1, data)
    // that.columnsList[index] = data
    // this.$forceUpdate()
    // 回显
    if (params) {
        nextTick(() => {
            // that.$refs[`Columns${index}`][0].handleEcho(params)
        })
    }
}

const getIdentity = (list: any) => {
    if (!list) return []
    return list.map((item: any) => item[0])
}


const inputValueOrg = computed(() => inputValue.value.map((item: any) => item[0]))

const inputLazyLoad = async (node: any, resolve: any, index: number) => {
    const { level, data } = node
    try {
        let nodes
        if (level === 0) {
            setTimeout(() => {
                if (inputValue.value.length) {
                    // 已做了选择
                    const isDisabled = (item: any) => {
                        if (inputValueOrg[index] === item.identityId) {
                            return false
                        } else {
                            return item.disabled
                        }
                    }
                    nodes = orgList.value.map((org: any) => ({
                        code: org.identityId,
                        name: org.nodeName,
                        leaf: level >= 2,
                        disabled: isDisabled(org)
                    }))
                } else {
                    nodes = orgList.value.map((org: any) => ({
                        code: org.identityId,
                        name: org.nodeName,
                        leaf: level >= 2,
                        disabled: org.disabled
                    }))
                }
                resolve(nodes)
            }, 300);
        } else if (level === 1) {
            const params = { current: 1, size: 1000, identityId: node.data.code }
            const { code, data } = await queryUserDataList(params)
            const nextNodes = data.items.map((item: any) => ({
                code: item.metaDataId,
                name: item.metaDataName,
                leaf: level >= 1 // >=2： 展示3级 >= 1： 展示2级
            }))
            resolve(nextNodes)
        }

    } catch (error) {

    }
}

const handleSenderChange = (value: any) => {
    useExpertMode().setSender(value)
}
const modelLazyLoad = async (node: any, resolve: any) => {

}
const changeModelValue = (e: any) => { }


const handleModelChange = () => { }
const curNodeIndex = ref(1)
const modelValue = ref('')
const modelOptions = reactive([{
    fileName: '',
    modelId: ''
}])

const saveOrgs = () => {

}


onMounted(async () => {
    // await saveOrgs() 使用当前用户的组织信息
    initInputPanel()
    // 回显
    // handleInputValue()
    // handleCascaderKey()
})


</script>

<style scoped lang='scss'>
.input-box {
    height: calc(100% - 40px);
    overflow-y: scroll;

    :deep(.el-input__inner) {
        height: 40px;
        background: #eeeeee;
        border-radius: 20px;
    }
}
</style>