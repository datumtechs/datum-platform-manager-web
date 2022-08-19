<template>
  <div class="border-1 border-solid border-color-[#EEEEEE] w-full my-20px">
    <div class="w-full flex items-center py-20px px-30px">
      <div class="text-color-[#666666] w-150px mr-11px font-medium">
        {{ locale == 'zh' ?
            t('task.selectData') : `${t('auth.dataToken')} ${props.num}`
        }}
        {{ locale == 'zh' ? props.num : '' }}：</div>
      <el-cascader @change="cascaderChange" clearable :disabled="taskParams.isSettingCompleted"
        class="h-40px rounded-20px border-1 w-395px border-solid border-color-[#EEEEEE]" :suffix-icon="CaretBottom"
        v-model="form.metaData" :options="orgList" :props="cascaderProps" />
    </div>
    <div class="transfer flex h-411px min-w-600px">
      <!--左面-->
      <div class="pl-30px pt-20px flex-1 pr-5px">
        <p class="text-color-[#333333] font-medium">{{ t('task.fieldTips') }}</p>
        <ul class="fields-main w-full h-330px overflow-auto mt-40px pr-25px" v-if="fieldsList.length">
          <li v-show="item.show"
            class="cursor-pointer border-1px border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
            :class="{ 'border-color-[#2B60E9] text-color-[#2B60E9]': activeIndex == index }"
            v-for="(item, index) in fieldsList" @click="activeIndex = index" :key="index">{{
                item.columnName
            }}</li>
          <!--  -->
        </ul>
        <el-empty :description="t('common.noData')" v-else />
      </div>
      <!--中间-->
      <div class="border-l-r flex-1 pt-20px px-30px">
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px font-medium">{{
              t('task.setTo')
          }}</span>
          <div v-waves v-for="v in props.fieldType" :key="v.type" @click="handFields(v)"
            class="border-1px cursor-pointer border-solid border-color-[#eeeeee] text-color-[#999999] rounded-26px mb-10px h-40px w-full flex items-center justify-center"
            :class="{ 'com-button': handActiveClass(v), 'no-click': !handActiveClass(v) }"
            :style="{ background: fieldsList.length ? '' : '#fff', color: fieldsList.length ? '' : '#000' }">
            {{ t(`${v.name}`) }}
            <el-tooltip effect="light" :content="t(v.tips)" placement="right">
              <img class="w-20px h-20px ml-10px cursor-pointer" :src="handActiveClass(v) ? questWhite : questbg" alt="">
              <template #content>
                <slot name="content"></slot>
              </template>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!--右面-->
      <div class="px-30px pt-20px flex-1">
        <div>
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{
              t('task.idColumn')
          }}</span>
          <div :style="{ backgroundColor: form.idColumn?.columnName ? 'rgba(238, 238, 238, .2)' : '#fff' }"
            class="relative border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center">
            {{ form.idColumn?.columnName }}
            <el-icon v-if="form.idColumn?.columnName" @click="removeFormParams('idColumn')"
              class="absolute right-10px text-19px text-color-[#565656]">
              <remove />
            </el-icon>
          </div>
        </div>
        <div v-if="props.fieldType.some((v: { type: string }) => v.type == 'label')">
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{
              t('task.label')
          }}</span>
          <div :style="{ backgroundColor: form.label?.columnName ? 'rgba(238, 238, 238, .2)' : '#fff' }"
            class="relative border-1px cursor-pointer border-solid border-color-[#eeeeee] rounded-26px mb-10px h-40px w-full flex items-center justify-center">
            {{ form.label?.columnName }}
            <!---->
            <el-icon v-if="form.label?.columnName" @click="removeFormParams('label')"
              class="absolute right-10px text-19px text-color-[#565656]">
              <remove />
            </el-icon>
          </div>
        </div>
        <div v-if="props.fieldType.some((v: { type: string }) => v.type == 'feature')">
          <span class="inline-block w-100px text-color-[#333333] mb-10px">{{
              t('task.feature')
          }}</span>
          <ul
            class="relative fields-main w-full h-200px overflow-auto px-10px pt-10px border-1px border-solid border-color-[#eeeeee]">
            <li :style="{ backgroundColor: form.label?.columnName ? 'rgba(238, 238, 238, .2)' : '#fff' }"
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
import { queryUserDataList, queryDataDetails } from '@/api/data'
import type { CascaderOption } from 'element-plus/lib/components/cascader-panel/src/node';
import questbg from '@/assets/images/task/questBgfff.png'
import questWhite from '@/assets/images/task/questWhite.png'
const { t, locale } = useI18n()
const emit = defineEmits(['update:params'])
const fieldTypeActive = ref('idColumn')
const activeIndex = ref<any>()
const props: any = defineProps({
  num: {
    type: Number,
    default: 1
  },
  orgList: {
    default: (): CascaderOption[] | any[] => []
  },
  sellectionAlgPsi: {
    type: Boolean,
    default: false
  },
  disabledData: {
    type: Array,
    default: () => []
  },
  params: {
    type: Object,
    default: () => ({})
  },
  taskParams: {
    type: Object,
    default: () => ({})
  },
  fieldType: {
    type: Array,
    default: (): any[] => []
  }
})


const form = reactive<any>({
  metaData: [],
  idColumn: {},
  label: {},
  feature: []
})

watch(form, () => {
  emit('update:params', form)
})

watch(() => props.params, (e) => {
  const metaDataId = e.metaDataId,
    identityId = e.identityId
  if (!identityId || !metaDataId) return
  form.metaData = [identityId, metaDataId]
  cascaderChange('init')
})
const nextActiveIndex = computed(() => {
  return fieldsList.value.find(v => v.show == true) || {}
})

const fieldsList = ref<any[]>([])
const orgList = computed(() => props.orgList.map((v: any) => {
  return {
    value: v.identityId,
    label: v.nodeName,
    leaf: false,
    disabled: props.disabledData[0] == v.identityId
  }
}))

const cascaderProps = ref({
  lazy: true,
  lazyLoad(node: any, resolve: any) {
    const { value, level } = node
    if (!value) {
      resolve([])
      return
    }
    queryUserDataList({
      current: 1,
      size: 20,
      identityId: value,
    }).then(res => {
      const { data, code } = res
      if (code === 10000) {
        const list: any[] = []
        // 0-密文算法，1-明文算法
        const algorithmType: any = props?.taskParams?.algorithmType
        data.items.forEach((v: any) => {
          if (algorithmType == 1 && v.isSupportPtAlg) {
            list.push({
              value: v.metaDataId,
              label: v.metaDataName,
              leaf: true
            })
          }
          if (algorithmType == 0 && v.isSupportCtAlg) {
            list.push({
              value: v.metaDataId,
              label: v.metaDataName,
              leaf: true
            })
          }
        })

        resolve(list)
      } else {
        resolve([])
      }
    })
  }
})

const handActiveClass = (v: any) => {
  if (v.type == 'idColumn' && !form.idColumn?.columnName) return true
  if (v.type == 'label' && !form.label?.columnName) return true
  if (v.type == 'feature' && !fieldsList.value.length) return true
  if (v.type == 'feature' && fieldsList.value.length && (nextActiveIndex.value?.index > -1)) return true
  // if(v.type == 'feature') return true
  return false
}

const cascaderChange = (e: any) => {
  if (!e) {
    form.metaData = []
    fieldsList.value = []
    clearableCascader()
    return
  }

  queryDataDetails({ metaDataId: form.metaData[1] }).then(res => {
    const { data, code } = res
    if (code == 10000) {
      clearableCascader()
      fieldsList.value = data.columnsList.map((v: any, index: number) => {
        return {
          ...v,
          show: true,
          index
        }
      })
      if (e !== 'init') {
        activeIndex.value = 0
        form.idColumn = fieldsList.value[activeIndex.value]
        fieldsList.value[activeIndex.value] = false
        activeIndex.value = 1
      }
      if (e == 'init') initParams()
    }
  })
}

const initParams = () => {
  const { keyColumn, dependentVariable, dataColumnIds } = props.params || {}
  form.feature = []
  fieldsList.value.forEach(item => {
    if (item.columnIdx == keyColumn) {
      item.show = false
      form.idColumn = item
    }
    if (item.columnIdx == dependentVariable) {
      item.show = false
      form.label = item
    }
    if (dataColumnIds) {
      const list: any = dataColumnIds.split(',')
      if (list.includes(String(item.columnIdx))) {
        item.show = false
        form.feature.push(item)
      }
    }
    activeIndex.value = fieldsList.value.findIndex((v: any) => v.show)
  })
  //@ts-ignore
  fieldTypeActive.value = props.fieldType[props.fieldType.length - 1].type
  activeIndex.value = nextActiveIndex.value.index || null
}

const clearableCascader = () => {
  form.idColumn = {}
  form.label = {}
  form.feature = []
  fieldTypeActive.value = 'idColumn'
}


const handFields = (v: any) => {
  if (!activeIndex.value && activeIndex.value !== 0) return
  if (!fieldsList.value[activeIndex.value].show) return
  switch (v.type) {
    case 'idColumn':
      if (!form.label?.columnName) {
        fieldTypeActive.value = 'label'
      } else {
        fieldTypeActive.value = 'feature'
      }
      if (form.idColumn.columnName) return
      form.idColumn = fieldsList.value[activeIndex.value]; break;
    case 'label':
      if (form.label?.columnName) {
        fieldTypeActive.value = 'feature'
        return
      }
      fieldTypeActive.value = 'feature'
      form.label = fieldsList.value[activeIndex.value]; break;
    case 'feature':
      //@ts-ignore
      form.feature?.push(fieldsList.value[activeIndex.value]); break;
    default:
      console.log("错误")
      break;
  }
  fieldsList.value[activeIndex.value].show = false
  activeIndex.value = nextActiveIndex.value.index || 0
}

const handfeatureList = (item: any, index: number) => {
  form.feature.splice(index, 1)
  fieldsList.value.forEach((v, i) => {
    if (v.columnIdx == item.columnIdx) {
      v.show = true
      activeIndex.value = i
    }
  })
}

const removeFormParams = (name: string) => {
  console.log(name, form[name])
  activeIndex.value = form[name]?.index
  fieldsList.value[activeIndex.value].show = true
  form[name] = {}
  fieldTypeActive.value = name
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

.no-click {
  cursor: no-drop;
  background: rgba(238, 238, 238, .5);
}

.com-button {
  color: #fff;
}
</style>