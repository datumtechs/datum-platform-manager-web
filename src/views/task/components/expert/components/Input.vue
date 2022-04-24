<template>
    <div class="p-30px input-box">
        <p class="text-color-[#333] font-bold">{{ t('expert.configureInput') }}</p>
        <div class="mt-40px">
            <p class="text-color-[#333] font-medium">{{ t('role.taskSponsor') }}</p>
            <el-select v-model="taskSender" class="mt-10px w-full" size="small"
                :disabled="viewModel === 'view'" filterable :placeholder="t('expert.selectModel')"
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
                    }" @change="
    e => {
        changeModelValue(e)
    }
"></el-cascader>
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
                    }" @change="
    e => {
        changeInputValue(e, index)
    }
"></el-cascader>
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
import Transfer from './Transfer.vue'
const { t } = useI18n()
const modelKey = ref('')
const taskSender = ref('')
const viewModel = ref('')
const showModel = ref(false)
let selectLayout: any = ref([{ item: '111', value: '111', }])
const minLen = 2

const cascaderKey = ref('')
const inputValue: Ref<any[]> = ref([] as any[])

const algorithms = ref([])

const columnsList = ref([])

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
    selectLayout.value = Array(minLen).fill({ item: '111', value: '111', })
}

const changeInputValue = (e: any, index: number) => { }


const inputLazyLoad = (e: any, resolve: any, index: number) => {

}

const handleSenderChange = () => { }
const modelLazyLoad = async (node: any, resolve: any) => {

}
const changeModelValue = (e: any) => { }
const orgList: any[] = [{
    identityId: '',
    nodeName: '',
    value: "item.identityId"
}]

const handleModelChange = () => { }
const curNodeIndex = ref(1)
const modelValue = ref('')
const modelOptions = reactive([{
    fileName: '',
    modelId: ''
}])

onMounted(() => {
    initInputPanel()
    console.log(selectLayout);

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