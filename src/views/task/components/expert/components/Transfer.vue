<template>
  <div v-if="true" class="transfer mt-10px">
    <div class="columns-box">
      <p class="text-12px text-color-[#999999] leading-17px">{{ t('task.field') }}</p>
      <div class="columns mt-5px">
        <div
          v-for="(item, index) in list"
          :key="index"
          class="columns-item"
          :class="{ 'columns-item-active': columnIndex === index, 'view-model': viewModel === 'view' }"
          @click="handleColumn(index)"
        >{{ item.columnName }}</div>
      </div>
    </div>
    <div class="arrow">
      <div class="arrow-icon" @click="handleTransfer(0, ids.length)">
        <img v-if="ids.length" src="@/assets/images/task/left-arrow.png" class="normal-arrow" />
        <img v-else src="@/assets/images/task/right-arrow.png" class="normal-arrow" />
      </div>
      <div v-if="isLabels" class="arrow-icon" @click="handleTransfer(1, labels.length)">
        <img v-if="labels.length" src="@/assets/images/task/left-arrow.png" class="normal-arrow" />
        <img v-else src="@/assets/images/task/right-arrow.png" class="normal-arrow" />
      </div>
      <div class="arrow-icon-auto" @click="handleTransfer(2)">
        <img src="@/assets/images/task/right-arrow.png" class="normal-arrow" />
      </div>
      <div class="arrow-icon-auto" @click="handleTransfer(3, 1)">
        <img src="@/assets/images/task/left-arrow.png" class="normal-arrow" />
      </div>
    </div>
    <div class="result">
      <p class="text-12px text-color-[#999999] leading-17px">{{ t('task.idColumn') }}</p>
      <div class="ids mt-5px w-160px h-40px">
        <div
          class="item"
          :class="{ 'view-model': viewModel === 'view' }"
        >{{ ids.length ? ids[0].columnName : '' }}</div>
      </div>
      <div v-if="isLabels" class="result-label">
        <p
          class="text-12px text-color-[#999999] leading-17px mt-10px mb-5px"
          v-if="!algorithms.inputModel"
        >{{ t('expert.labelRequired') }}</p>
        <p
          class="text-12px text-color-[#999999] leading-17px mt-10px mb-5px"
          v-else
        >{{ t('expert.labelOptionals') }}</p>
        <div
          class="label-item"
          :class="{ 'view-model': viewModel === 'view' }"
        >{{ labels.length ? labels[0].columnName : '' }}</div>
      </div>
      <div class="feature">
        <p class="text-12px text-color-[#999999] leading-17px mt-10px mb-5px">{{t('task.feature')}}</p>
        <div
          class="features"
          :class="{ 'features-auto': !isLabels, 'view-model': viewModel === 'view' }"
        >
          <div
            v-for="(item, index) in features"
            :key="index"
            :class="['features-item', featureIndex === index ? 'features-item-active' : '']"
            @click="handleFeature(index)"
          >{{ item.columnName }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
interface Features { columnData: String }
const { t } = useI18n()

const ids = reactive([] as any[])
const list = reactive([] as any[])
const labels = reactive([] as any[])
const features = reactive([] as any[])
let columnIndex = ref(0)
let featureIndex = ref(0)


const showTransfer = computed(() => ids.length || labels.length || features.length || list.length)
const isLabels = true; // computed(() => transferIndex === 0 && !algorithms.inputModel)
const emit = defineEmits(['saveToStore'])
const { columnData, transferIndex, algorithms, viewModel } = defineProps({
  columnData: {
    type: Array,
    default: () => []
  },
  transferIndex: {
    type: Number,
    default: 0
  },
  algorithms: {
    type: Object,
    default: () => {
      return {}
    }
  },
  viewModel: {
    type: String,
    default: 'edit'
  }
})

const handleColumn = (index: number) => {
  columnIndex.value = index
}
const handleFeature = (index: number) => { }

const handleTransfer = (type: any, methods?: any) => {
  /*
     type：number
     0: 增加 删除 id列
     1: 增加 删除 因变量
     2: 增加 自变量
     3: 删除 自变量
     methods: ?: number
     0: push
     1: delete
   */
  if (viewModel === 'view') return
  const types = [{ 'ids': ids }, { 'labels': labels }, { 'features': features }, { 'features': features }]
  if (!list[columnIndex.value]) {
    columnIndex.value = 0
  }
  const item = list[columnIndex.value]
  const labelList = Object.values(types[type])
  if (!methods) {
    if (!list.length) return
    labelList.push(item)
    list.splice(columnIndex.value, 1)
  }
  if (methods === 1) {
    // 删除id列和因变量
    if (type !== 3) {
      const currentItem = labelList[0]
      list.splice(currentItem.index, 0, currentItem)
      labelList.splice(0, 1)
    } else {
      // 删除自变量
      if (!list.length) return
      if (!list[featureIndex.value]) {
        featureIndex.value = 0
      }
      const currentItem = labelList[featureIndex.value]
      list.splice(currentItem.index, 0, currentItem)
      labelList.splice(featureIndex.value, 1)
    }
  }
  emit('saveToStore', transferIndex)
}


</script>

<style scoped lang='scss'>
.transfer {
  display: flex;
  .columns-box {
    .columns {
      width: 105px;
      height: 295px;
      height: 295px;
      background: #eeeeee;
      border-radius: 4px;
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
      width: 160px;
      height: 40px;
      background: #eeeeee;
      border-radius: 4px;
    }
    .result-label {
      .label-item {
        width: 160px;
        height: 40px;
        background: #eeeeee;
        border-radius: 4px;
      }
    }

    .feature {
      .features,
      .features-auto {
        width: 160px;

        background: #eeeeee;
        border-radius: 4px;
      }
      .features {
        height: 150px;
      }
      .features-auto {
        height: 222px;
      }
    }
  }
}
</style>