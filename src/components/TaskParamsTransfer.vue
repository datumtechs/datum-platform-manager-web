<template>
  <div class="border-1 border-solid border-color-[#EEEEEE] w-full my-20px">
    <div class="w-full flex items-center py-20px px-30px">
      <div class="text-color-[#666666] w-150px mr-11px font-medium">{{
          locale == 'zh' ?
            t('task.selectData') : `${t('task.select')} ${props.num}st ${t('task.selectData')}`
      }} {{
    locale == 'zh' ? props.num : ''
}}：</div>
      <el-cascader v-if="sponsorList.length" @change="cascaderChange"
        class="h-40px rounded-20px border-1 w-395px border-solid border-color-[#EEEEEE]" :suffix-icon="CaretBottom"
        v-model="form.metaData" :options="sponsorList" :props="cascaderProps" />
    </div>
    <div class="transfer flex h-411px min-w-600px">
      <!--左面-->
      <div class="pl-30px pt-20px flex-1 pr-5px">
        <p class="text-color-[#333333] font-medium">{{ t('task.fieldTips') }}</p>
        <ul class="fields-main w-full h-330px overflow-auto mt-40px pr-25px" v-if="fieldsList.length">
          <li v-show="item.show"
            class="cursor-pointer border-1px border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
            v-for="(item, index) in fieldsList" @click="handFields(item)" :key="index">{{
                item.columnName
            }}</li>
        </ul>
        <el-empty :description="t('common.noData')" v-else />
      </div>
      <!--中间-->
      <div class="border-l-r flex-1 pt-20px px-30px">
        <div class="flex mb-30px items-center">
          <span class="inline-block w-100px text-color-[#333333]">{{ t('task.selectField') }}
            ：</span>
          <div class="flex flex-1 items-center justify-center text-color-[#999999]">{{
              activeItem?.columnName || undefined
          }}</div>
        </div>
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{ t('task.setTo') }}</span>
          <div v-for="item in fieldType" :key="item.type" @click="fieldActive(item)"
            class="border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
            :class="{ 'com-button': fieldTypeActive == item.type }">{{ t(`${item.name}`) }}</div>
        </div>
      </div>
      <!--右面-->
      <div class="px-30px pt-20px flex-1">
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{
              t('task.idColumn')
          }}</span>
          <div
            class="relative border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center">
            {{ form.idColumn?.columnName }}
            <el-icon v-if="form.idColumn?.columnName" class="absolute right-10px text-19px text-color-[#565656]"
              @click="form.idColumn.show = true, form.idColumn = {}, fieldTypeActive = 'idColumn'">
              <remove />
            </el-icon>
          </div>
        </div>
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{
              t('task.label')
          }}</span>
          <div
            class="relative border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center">
            {{ form.label?.columnName }}
            <el-icon v-if="form.label?.columnName"
              @click="form.label.show = true, form.label = {}, fieldTypeActive = 'idColumn'"
              class="absolute right-10px text-19px text-color-[#565656]">
              <remove />
            </el-icon>
          </div>
        </div>
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{
              t('task.feature')
          }}</span>
          <ul
            class="relative fields-main w-full h-200px overflow-auto px-10px pt-10px border-1px border-solid border-color-[#eeeeee]">
            <li
              class="cursor-pointer border-1px border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
              v-for="(item, index) in form.feature" :key="index">
              {{ item.columnName }}
              <el-icon :key="index" class="absolute right-20px text-19px text-color-[#565656]"
                @click="handfeatureList(item, index)">
                <remove />
              </el-icon>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { CaretBottom, Remove } from '@element-plus/icons-vue'
import { getDataListByOrg, queryDataDetails } from '@/api/data'
import type { CascaderOption } from 'element-plus/lib/components/cascader-panel/src/node';
const { t, locale } = useI18n()
const emit = defineEmits(['update:psiInputOne'])
const props = defineProps({
  num: {
    type: Number,
    default: 1
  },
  sponsorList: {
    default: (): CascaderOption[] => []
  }
})

const form = reactive<any>({
  metaData: [],
  idColumn: {},
  label: {},
  feature: []
})

watch(form, () => {
  emit('update:psiInputOne', form)
})

const fieldsList = ref<any[]>([])
const sponsorList = computed(() => props.sponsorList.map(v => {
  return {
    value: v.identityId,
    label: v.nodeName
  }
}))

const cascaderProps = reactive({
  lazy: true,
  lazyLoad(node: any, resolve: any) {
    const { value, level } = node
    getDataListByOrg({
      current: 1,
      size: 20,
      identityId: value,
    }).then(res => {
      const { data, code } = res
      if (code === 10000) {
        resolve(data.items.map((v: any) => ({
          value: v.metaDataId,
          label: v.metaDataName,
          leaf: true
        })))
      } else {
        resolve([])
      }
    })
  }
})



const cascaderChange = () => {
  queryDataDetails({ metaDataId: form.metaData[1] }).then(res => {
    const { data, code } = res
    if (code == 10000) {
      fieldsList.value = data.columnsList.map((v: any) => {
        return {
          ...v,
          show: true
        }
      })
    }
  })
}


const fieldTypeActive = ref('idColumn')
const activeItem = ref({ columnName: '' })



const fieldType = ref([{
  name: "task.idColumn",
  type: "idColumn"
}, {
  name: "task.label",
  type: "label"
}, {
  name: "task.feature",
  type: "feature"
}])


const handFields = (item: any) => {

  switch (fieldTypeActive.value) {
    case 'idColumn':
      if (!form.label?.columnName) {
        fieldTypeActive.value = 'label'
      } else {
        fieldTypeActive.value = 'feature'
      }
      form.idColumn = item; break;
    case 'label':
      fieldTypeActive.value = 'feature'
      form.label = item; break;
    case 'feature':
      //@ts-ignore
      form.feature?.push(item); break;
    default:
      console.log("错误")
      break;
  }
  item.show = false
  activeItem.value = item
}

const fieldActive = (item?: any) => {
  if (item.type == 'idColumn' && !form.idColumn?.columnName
    || item.type == 'label' && !form.label?.columnName
    || item.type == 'feature'
  ) {
    fieldTypeActive.value = item.type
  } else {
    ElMessage.warning(t('task.reselectLater'))
  }
}

const handfeatureList = (item: any, index: number) => {
  console.log(item, index)
  form.feature.splice(index, 1)
  fieldsList.value.forEach(v => {
    if (v.columnIdx == item.columnIdx) {
      v.show = true
    }
  })
}




</script>
<style lang="scss" scoped>
.prefix-rounded-left {
  border-radius: 20px 0 0 20px;
  border-bottom: 1px solid #eeeeee;
}

.transfer {
  border-top: 1px solid #eeeeee;
}

.border-l-r {
  border-left: 1px solid #eeeeee;
  border-right: 1px solid #eeeeee;
}

.fields-main::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 7px;
  /*高宽分别对应横竖滚动条的尺寸*/
}

.fields-main::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  height: 30px;
  border-radius: 10px;
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #d8d8d8;
}

.fields-main::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
</style>