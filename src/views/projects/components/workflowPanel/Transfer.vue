<template>
  <div v-if="isShow" class="transfer">
    <div class="columns">
      <div
        v-for="(item, index) in list"
        :key="index"
        class="columns-item"
        :class="{ 'columns-item-active': columnIndex === index, 'view-model': viewModel === 'view' }"
        @click="handleColumn(index)"
      >
        {{ item.columnName }}
      </div>
    </div>
    <div class="arrow">
      <div class="arrow-icon" @click="handleTransfer(0, ids.length)">
        <img v-if="ids.length" src="@/assets/images/projects/left-arrow.svg" alt="" class="normal-arrow" />
        <img v-else src="@/assets/images/projects/right-arrow.svg" alt="" class="normal-arrow" />
      </div>
      <div v-if="isLabels" class="arrow-icon" @click="handleTransfer(1, labels.length)">
        <img v-if="labels.length" src="@/assets/images/projects/left-arrow.svg" alt="" class="normal-arrow" />
        <img v-else src="@/assets/images/projects/right-arrow.svg" alt="" class="normal-arrow" />
      </div>
      <div class="arrow-icon" :class="isLabels ? '' : 'arrow-icon-auto1'" @click="handleTransfer(2)">
        <img src="@/assets/images/projects/right-arrow.svg" alt="" class="normal-arrow" />
      </div>
      <div class="arrow-icon" :class="isLabels ? '' : 'arrow-icon-auto2'" @click="handleTransfer(3, 1)">
        <img src="@/assets/images/projects/left-arrow.svg" alt="" class="normal-arrow" />
      </div>
    </div>
    <div class="result">
      <div class="ids">
        <div>ID{{ $t('projects.columns') }}</div>
        <div class="item" :class="{ 'view-model': viewModel === 'view' }">
          {{ ids.length ? ids[0].columnName : '' }}
        </div>
      </div>
      <div v-if="isLabels" class="result-label">
        <div v-if="!algorithms.inputModel">{{ $t('projects.labelRequired') }}</div>
        <div v-else>{{ $t('projects.labelOptionals') }}</div>
        <div class="item" :class="{ 'view-model': viewModel === 'view' }">
          {{ labels.length ? labels[0].columnName : '' }}
        </div>
      </div>
      <div class="feature">
        <div>{{ $t('projects.features') }}</div>
        <div class="features" :class="{ 'features-auto': !isLabels, 'view-model': viewModel === 'view' }">
          <div
            v-for="(item, index) in features"
            :key="index"
            :class="['features-item', featureIndex === index ? 'features-item-active' : '']"
            @click="handleFeature(index)"
          >
            {{ item.columnName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
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
  },
  data () {
    return {
      list: [],
      columnIndex: 0,
      // id列
      ids: [],
      // 因变量
      labels: [],
      // 自变量
      features: [],
      featureIndex: 0
    }
  },
  computed: {
    isLabels: function () {
      return this.transferIndex === 0 && !this.algorithms.inputModel
      // return this.transferIndex === 0
    },
    isShow: function () {
      return this.ids.length || this.labels.length || this.features.length || this.list.length
    }
  },
  watch: {
    columnData: {
      handler: function (val) {
        this.setList(val)
      },
      deep: true
    }
  },
  methods: {
    setList (list) {
      list.map((item, index) => {
        item.index = index
      })
      this.list = JSON.parse(JSON.stringify(list))
      this.initDatas()
    },
    initDatas () {
      this.columnIndex = 0
      this.ids = []
      this.labels = []
      this.features = []
      this.featureIndex = 0
    },
    getList () {
      const { ids, labels, features } = this
      const handleString = arr => {
        const columnName = arr.map(item => item.id)
        return columnName.join(',')
      }
      return {
        keyColumn: handleString(ids),
        dependentVariable: handleString(labels),
        dataColumnIds: handleString(features)
      }
    },
    handleColumn (index) {
      this.columnIndex = index
    },
    handleFeature (index) {
      this.featureIndex = index
    },
    // 数据回显
    handleEcho (params) {
      const { keyColumn, dependentVariable, dataColumnIds } = params
      this.$nextTick(() => {
        if (keyColumn) {
          const item = this.removeList(keyColumn)
          this.ids = item
        }
        if (this.isLabels) {
          if (dependentVariable) {
            const item = this.removeList(dependentVariable)
            this.labels = item
          }
        }
        if (dataColumnIds) {
          const columnIds = dataColumnIds.split(',')
          columnIds.map(item => {
            const columnItem = this.removeList(Number(item))
            this.features.push(...columnItem)
          })
        }
      })
    },
    removeList (id) {
      // 查询对应的元素
      const item = this.list.filter(item => item.id === id)
      const ids = this.list.map(item => item.id)
      // 查询对象的下标
      const index = ids.indexOf(id)
      this.list.splice(index, 1)
      return item
    },
    handleTransfer (type, methods) {
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
      if (this.viewModel === 'view') return
      const types = [ 'ids', 'labels', 'features', 'features' ]
      const label = types[type]
      if (!this.list[this.columnIndex]) {
        this.columnIndex = 0
      }
      const item = this.list[this.columnIndex]
      const list = this[label]
      if (!methods) {
        if (!this.list.length) return
        list.push(item)
        this.list.splice(this.columnIndex, 1)
      }
      if (methods === 1) {
        // 删除id列和因变量
        if (type !== 3) {
          const currentItem = list[0]
          this.list.splice(currentItem.index, 0, currentItem)
          list.splice(0, 1)
        } else {
          // 删除自变量
          if (!list.length) return
          if (!list[this.featureIndex]) {
            this.featureIndex = 0
          }
          const currentItem = list[this.featureIndex]
          this.list.splice(currentItem.index, 0, currentItem)
          list.splice(this.featureIndex, 1)
        }
      }
      this.$emit('saveToStore', this.transferIndex)
    }
  }
}
</script>

<style scoped lang="scss">
.transfer {
  height: 280px;
  margin: 10px 0;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  .columns {
    height: 100%;
    width: 110px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    overflow-y: auto;

    .columns-item {
      cursor: pointer;
      padding: 4px;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }

    .columns-item:hover {
      background: #dcdfe6;
      overflow: visible;
    }

    .columns-item-active {
      background: #dcdfe6;
    }
  }

  .arrow {
    height: 100%;
    width: 40px;
    display: flex;
    flex-direction: column;

    .arrow-icon {
      margin-top: 22px;
      cursor: pointer;
      .normal-arrow {
        color: #84878d;
        width: 40px;
        height: 28px;
      }
    }

    .arrow-icon-auto1 {
      margin-top: 40px;
    }

    .arrow-icon-auto2 {
      margin-top: 10px !important;
    }

    .arrow-icon:nth-child(3) {
      margin-top: 30px;
    }

    .arrow-icon:nth-child(4) {
      margin-top: -2px;
    }

    .arrow-icon:hover {
      >>> path {
        fill: #333;
      }
    }
  }

  .result {
    height: 100%;
    width: 120px;
    overflow: hidden;
    .item {
      margin: 4px 0;
      padding: 4px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      min-height: 28px;
      overflow-x: auto;
    }

    .features {
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      overflow-y: auto;
      margin-top: 4px;
      height: 150px; //Transfer 高度调整
    }

    .features-auto {
      height: 150px;
    }

    .features-item {
      cursor: pointer;
      padding: 4px;
      // overflow: hidden;
      // text-overflow: ellipsis;
      // white-space: nowrap;
    }

    .features-item:hover {
      background: #dcdfe6;
      // overflow: visible;
    }

    .features-item-active {
      background: #dcdfe6;
    }
  }
}

.view-model {
  background-color: #f5f7fa;
  color: #c0c4cc;
}

::-webkit-scrollbar-track {
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.1);
  background-color: transparent;
  cursor: pointer;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: transparent;
  border: 4px solid #ccc;
}
</style>
