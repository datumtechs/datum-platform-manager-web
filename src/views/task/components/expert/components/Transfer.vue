<template>
  <div v-if="true" class="transfer mt-10px">
    <div class="columns-box">
      <p class="text-12px text-color-[#999999] leading-17px">{{ t('task.field') }}</p>
      <div class="columns mt-5px">
        <div v-for="(item, index) in list" :key="index" class="columns-item"
          :class="{ 'columns-item-active': columnIndex === index, 'view-model': isReadonly }"
          @click="handleColumn(index)">{{ item.columnName }}</div>
      </div>
    </div>
    <div class="arrow">
      <div class="arrow-icon" @click="handleTransfer('ids', ids.length)">
        <img v-if="ids.length" src="@/assets/images/task/left-arrow.png" class="normal-arrow"
          :class="{ 'view-model': isReadonly }" />
        <img v-else src="@/assets/images/task/right-arrow.png" class="normal-arrow"
          :class="{ 'view-model': isReadonly }" />
      </div>

      <div v-if="isLabels && !isPSIModel" class="arrow-icon"
        @click="handleTransfer('labels', labels.length)">
        <img v-if="labels.length" src="@/assets/images/task/left-arrow.png" class="normal-arrow" />
        <img v-else src="@/assets/images/task/right-arrow.png" class="normal-arrow" />
      </div>
      <div v-if="!isPSIModel" class="arrow-icon-auto" @click="handleTransfer('features')">
        <img src="@/assets/images/task/right-arrow.png" class="normal-arrow" />
      </div>
      <div v-if="!isPSIModel" class="arrow-icon-auto" @click="handleTransfer('features', 1)">
        <img src="@/assets/images/task/left-arrow.png" class="normal-arrow" />
      </div>
    </div>
    <div class="result">
      <p class="text-12px text-color-[#999999] leading-17px">{{ t('task.idColumn') }}</p>
      <div class="ids mt-5px w-160px h-40px">
        <div class="item text-12px p-4px" :class="{ 'view-model': isReadonly }">{{
            ids.length ?
              ids[0].columnName : ''
        }}</div>
      </div>
      <div v-if="isLabels && !isPSIModel" class="result-label">
        <p class="text-12px text-color-[#999999] leading-17px mt-10px mb-5px"
          v-if="!algorithm.inputModel">{{ t('expert.labelRequired') }}</p>
        <p class="text-12px text-color-[#999999] leading-17px mt-10px mb-5px" v-else>{{
            t('expert.labelOptionals')
        }}</p>
        <div class="label-item item text-12px p-4px" :class="{ 'view-model': isReadonly }">{{
            labels.length ?
              labels[0].columnName : ''
        }}</div>
      </div>
      <div v-if="!isPSIModel" class="feature">
        <p class="text-12px text-color-[#999999] leading-17px mt-10px mb-5px">{{ t('task.feature')
        }}
        </p>
        <div class="features" :class="{ 'features-auto': !isLabels, 'view-model': isReadonly }">
          <div v-for="(item, index) in features" :key="index" class="text-12px"
            :class="['features-item', featureIndex === index ? 'features-item-active' : '']"
            @click="handleFeature(index)">{{ item.columnName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useExpertMode } from '@/stores'
const { t } = useI18n()

const ids = ref([] as any[])
const list = ref([] as any[])
const labels = ref([] as any[])
const features = ref([] as any[])
let columnIndex = ref(0)
let featureIndex = ref(0)

// columnData, transferIndex, algorithm, viewModel
const showTransfer = computed(() => ids.value.length || labels.value.length || features.value.length || list.value.length)
const isLabels = computed(() => props.transferIndex === 0 && !props.algorithm.inputModel)
const isPSIModel = computed(() => useExpertMode().getIsPSIModel)
const emit = defineEmits(['saveToStore'])
const props: any = defineProps({
  columnData: {
    type: Array,
    default: () => []
  },
  transferIndex: {
    type: Number,
    default: 0
  },
  algorithm: {
    type: Object,
    default: () => { }
  },
  isReadonly: {
    type: Boolean,
    default: false
  },
  inputValue: {
    type: Array,
    default: () => []
  }
})

watch(() => props.columnData, (newV, oldV) => {
  setList(newV)
})

watch(() => props.inputValue, (newV, oldV) => {
  if (newV === null) {
    resetTransfer()
  }
}, { deep: true })


const resetTransfer = () => {
  ids.value = []
  list.value = []
  labels.value = []
  features.value = []
}

const setList = (arr: Array<any>) => {
  arr.map((item: any, index: number) => {
    item.index = index
  })
  list.value = JSON.parse(JSON.stringify(arr))
  initData()
}

const getList = (): any => {
  const handleString = (arr: any) => {
    const columnName = arr.map((item: any) => item.columnIdx)
    return columnName.join(',')
  }
  return {
    keyColumn: handleString(ids.value),
    dependentVariable: handleString(labels.value),
    dataColumnIds: handleString(features.value)
  }
}



const initData = () => {
  columnIndex.value = 0
  ids.value = []
  labels.value = []
  features.value = []
  featureIndex.value = 0
}
const handleEcho = (params: any) => {
  const { keyColumn, dependentVariable, dataColumnIds } = params
  nextTick(() => {
    if (keyColumn) {
      const item = removeList(keyColumn)
      ids.value = item
    }
    if (isLabels) {
      if (dependentVariable) {
        const item = removeList(dependentVariable)
        labels.value = item
      }
    }
    if (dataColumnIds) {
      const columnIds = dataColumnIds.split(',')
      columnIds.map((item: any) => {
        const columnItem = removeList(Number(item))
        features.value.push(...columnItem)
      })
    }
  })
}

const removeList = (id: any) => {
  // 查询对应的元素
  const item = list.value.filter(item => item.columnIdx === id)
  list.value.splice(list.value.findIndex(item => item.columnIdx === id), 1)
  return item
}

const handleColumn = (index: number) => {
  columnIndex.value = index
}
const handleFeature = (index: number) => {
  featureIndex.value = index
}

const types = reactive({
  ids, labels, features
})

const handleTransfer = (type: any, methods?: any) => {
  if (props.isReadonly) return
  if (props.viewModel === 'view') return
  if (!list.value[columnIndex.value]) {
    columnIndex.value = 0
  }
  const item = list.value[columnIndex.value]
  const labelList = types[type]

  // 增加逻辑
  if (!methods) {
    if (!list.value.length) return
    labelList.push(item)
    list.value.splice(columnIndex.value, 1)
  }
  // 删除逻辑
  if (methods === 1) {
    // 删除id列和因变量
    if (type !== 'features') {
      const currentItem = labelList[0]
      list.value.splice(currentItem.index, 0, currentItem)
      labelList.splice(0, 1)
    } else {
      // 删除自变量
      if (!labelList.length) return
      if (!labelList[featureIndex.value]) {
        featureIndex.value = 0
      }
      const currentItem = labelList[featureIndex.value]
      list.value.splice(currentItem.index, 0, currentItem)
      labelList.splice(featureIndex.value, 1)
    }
  }

  emit('saveToStore', props.transferIndex)
}

defineExpose({
  getList, handleEcho
});

</script>

<style scoped lang='scss'>
.transfer {
  display: flex;

  .columns-box {
    .columns {
      border: 1px solid #eeeeee;
      width: 140px;
      height: 295px;
      height: 295px;
      // background: #eeeeee;
      border-radius: 4px;
      overflow-y: auto;

      .columns-item {
        padding: 4px;
        cursor: pointer;
        font-size: 12px;
        line-height: 17px;

        &.columns-item-active {
          background: #dcdfe6;
        }


      }

      .columns-item:hover {
        background: #dcdfe6;
        overflow: visible;
      }
    }
  }

  .arrow {
    height: 100%;
    width: 40px;
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    .arrow-icon {
      padding-top: 14px;
      margin-bottom: 32px;
      height: 40px;
      cursor: pointer;
    }

    .arrow-icon-auto {
      margin-top: 10px;
      cursor: pointer;
    }
  }

  .result {
    .ids {
      border: 1px solid #eeeeee;
      width: 140px;
      height: 40px;
      border-radius: 4px;
      display: flex;
      align-items: center;
    }

    .result-label {
      .label-item {
        border-radius: 4px;
        display: flex;
        align-items: center;
        width: 140px;
        border: 1px solid #eeeeee;
        height: 40px;
        border-radius: 4px;
        line-height: 17px;
      }
    }

    .feature {

      .features,
      .features-auto {
        width: 140px;
        border-radius: 4px;
        border: 1px solid #eeeeee;
      }

      .features {
        height: 150px;
        overflow-y: auto;

        .features-item {
          padding: 4px;
          cursor: pointer;
          line-height: 17px;

          &:hover {
            background: #dcdfe6;
          }

          &.features-item-active {
            background: #dcdfe6;
          }
        }
      }

      .features-auto {
        height: 222px;
      }
    }
  }

  .view-model {
    cursor: not-allowed !important;
    color: #c0c4cc !important;
  }
}
</style>