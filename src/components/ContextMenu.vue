<template>
  <div v-if="visible" ref="menu" class="menu">
    <ul class="menu-box">
      <!-- <li class="menu-box-option" @click="renameNode()">{{ $t('common.rename') }}</li> -->
      <li v-if="viewModel === 'edit'" class="menu-box-option" @click="deleteNode()">{{ $t('common.delete') }}</li>
      <li :class="{ 'menu-box-option': true, _disabled: status !== 2 }" @click="viewResult()">
        {{ $t('projects.viewResult') }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  components: {},
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    position: {
      type: Object,
      default: () => {}
    },
    status: {
      type: Number,
      default: 0
    },
    taskId: {
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
      showMenu: true
    }
  },
  computed: {},
  watch: {
    visible: {
      handler: function (val) {
        if (val) {
          document.addEventListener('click', this.onBodyClick)
        } else {
          document.removeEventListener('click', this.onBodyClick)
        }
      }
    },
    position: {
      deep: true,
      handler: function (val) {
        this.$nextTick(() => {
          this.$refs.menu.style.left = val.x + 'px'
          this.$refs.menu.style.top = val.y + 'px'
        })
      }
    }
  },
  methods: {
    renameNode () {
      this.$emit('renameNode')
    },
    deleteNode () {
      this.$emit('deleteNode')
    },
    viewResult () {
      if (this.status !== 2) return
      this.$emit('viewResult', this.taskId)
    },
    // 判断是否在外部点击
    onBodyClick (evt) {
      if (!evt.target) return
      const menuRef = this.$refs.menu
      const notOutside = menuRef && menuRef.contains(evt.target)
      if (!notOutside) {
        this.$emit('update:visible', false)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.menu {
  width: 120px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  box-shadow: 2px 2px 8px 0 hsl(0deg 0% 59% / 20%);
  position: fixed;
  border-radius: 4px;
  white-space: nowrap;
  z-index: 1200;
  font-size: 12px;
  padding: 5px 0;
  -webkit-tap-highlight-color: transparent;
  .menu-box {
    list-style: none;
    text-align: left;
    .menu-box-option {
      width: 100%;
      padding: 5px 14px;
      line-height: 1;
      color: #333;
      cursor: pointer;
      &:hover {
        background: #672cdf;
        color: #fff;
      }
    }
    ._disabled {
      opacity: 0.6;
      cursor: not-allowed; //pointer-events: none; 这两个属性不能同时使用，暂时放弃样式，保证不可点击的特性
    }
  }
}
</style>