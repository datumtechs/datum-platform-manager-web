<template>
  <div class="tree-box">
    <div v-for="item in algorithmTreeList" :key="item.algorithmId">
      <div class="tree-main-node">
        <div class="normal-node pointer" @click="open(item)">
          <img v-if="item.isOpen" class="file-icon" src="@/assets/images/projects/8.icon2.svg" alt="" />
          <img v-else class="tree-file-icon" src="@/assets/images/projects/8.icon1.svg" alt="" />
          <div class="tree-label">{{ item.algorithmName }}</div>
          <div v-if="item.child.length > 0" class="arrow-box">
            <img v-if="item.isOpen" src="@/assets/images/projects/8.icon3.svg" alt="" class="arrow arrow-up" />
            <img v-else src="@/assets/images/projects/8.icon3.svg" alt="" class="arrow arrow-down" />
          </div>
        </div>
        <div class="sub-tree-box" :class="{ isActive: item.isOpen, noActive: !item.isOpen }">
          <div
            v-for="child in item.child"
            :key="child.algorithmId"
            class="normal-node pointer"
            :draggable="viewModel === 'edit'"
            @dragstart="dragstart($event, child)"
            @dragend="dragend($event, child)"
          >
            {{ child.algorithmName }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {},
  props: {
    algorithmTreeList: {
      type: Array,
      default: () => []
    },
    workflowId: {
      type: String,
      default: ''
    },
    viewModel: {
      type: String,
      default: 'edit'
    }
  },
  data () {
    return {
      MAX_NODES: 2
    }
  },

  computed: {
    ...mapGetters('workflow', [ 'nodeList' ])
  },

  created () {},
  mounted () {},
  methods: {
    ...mapMutations('workflow', [ 'ADD_TO_NODELIST', 'SET_DRAG_STATUS' ]),
    clearCache () {},
    isBoxIn (event) {
      const box = document.getElementById('mainStage')
      const x = event.clientX
      const y = event.clientY
      const x1 = box.getBoundingClientRect().left
      const y1 = box.getBoundingClientRect().top
      const x2 = box.getBoundingClientRect().right
      const y2 = box.getBoundingClientRect().bottom
      if (x < x1 || x > x2 || y < y1 || y > y2) {
        return false
      } else {
        return true
      }
    },
    isInPipe (item) {
      return this.nodeList.includes(item)
    },
    dragend (e, item) {
      if (this.viewModel === 'view') return
      this.SET_DRAG_STATUS(false)
      const isInSide = this.isBoxIn(e)
      // 是否已存在相同的节点
      // 无 则添加
      const ids = this.nodeList.map(item => item.algorithmId)
      if (!isInSide) return
      // vuex 构造并添加 新的节点
      if (ids.includes(item.algorithmId)) {
        this.$message.warning(this.$t('projects.sameNodeTip'))
      } else {
        if (this.nodeList.length < this.MAX_NODES) {
          const param = {
            algorithmId: item.algorithmId,
            nodeName: item.algorithmName,
            nodeAlgorithmVo: item.algDetailsVo,
            workflowId: this.workflowId
          }
          this.ADD_TO_NODELIST(param)
          // this.SET_DATA()  回显
          return
        }
        this.$message.warning(this.$t('projects.maxNodeTip'))
      }
    },
    dragstart (e, item) {
      if (this.viewModel === 'view') return
      this.SET_DRAG_STATUS(true)
    },
    open (item) {
      if (item.child.length > 0) {
        this.algorithmTreeList.forEach(m => {
          if (m.algorithmId === item.algorithmId) {
            m.isOpen = !m.isOpen
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-box {
  .tree-main-node {
  }
  .normal-node {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 16px;
    line-height: 18px;
    background: #fbfcfd;
    margin-bottom: 4px;
    position: relative;
    .tree-file-icon {
      width: 18px;
      height: 18px;
    }
    .tree-label {
      line-height: 18px;
      padding-left: 10px;
    }

    &:hover {
      background: #f1effd;
      &:before {
        content: '';
        position: absolute;
        left: 0;
        height: 40px;
        width: 4px;
        background: #672cdf;
      }
    }
    .arrow-box {
      position: absolute;
      right: 10px;
      .arrow-down {
        transform: rotate(180deg);
      }
    }
  }

  .sub-tree-box {
    display: flex;
    flex-direction: column;
    transition: all 0.3s;
    overflow: hidden;
    .normal-node {
      height: 40px;
      padding-left: 43px;
      margin-bottom: 0;
      font-size: 12px;
      color: #333333;
    }
    &.isActive {
      max-height: 1000px;
    }
    &.noActive {
      max-height: 0px;
    }
  }
}
</style>